import { useState, useRef } from "react";

export default function Home() {
  const pergunta = "100 BURPEE??🥹";

  const [scale, setScale] = useState(1);
  const [started, setStarted] = useState(false);
  const [venceu, setVenceu] = useState(false);

  const [simPos, setSimPos] = useState({ top: 0, left: 0 });
  const [naoPos, setNaoPos] = useState({ top: 0, left: 0 });

  const audioRef = useRef(null);

  function randomPosition() {
    return {
      top: Math.random() * 70 + 15,
      left: Math.random() * 70 + 15,
    };
  }

  function handleNao(e) {
    e.preventDefault();
    if (!started) setStarted(true);

    setScale((prev) => prev * 1.8);
    setSimPos(randomPosition());
    setNaoPos(randomPosition());
  }

  function handleSim(e) {
    e.preventDefault();

    // 🔊 tocar áudio (AGORA FUNCIONA)
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    setVenceu(true);
  }

  return (
    <div className="container">
      {/* 🔊 ÁUDIO PRECISA EXISTIR ANTES DO CLIQUE */}
      <audio ref={audioRef} src="/sim-venceu.mp3" preload="auto" />

      {venceu && (
        <div className="sim-venceu">
          <div className="confetti"></div>
          <h1>🎉 bora de BURPEE 🎉</h1>
        </div>
      )}

      {!venceu && (
        <>
          <h1>{pergunta}</h1>

          {!started && (
            <div className="initial-buttons">
              <button type="button" className="btn-sim" onClick={handleSim}>
                Sim
              </button>

              <button type="button" className="btn-nao" onClick={handleNao}>
                Não
              </button>
            </div>
          )}

          {started && (
            <>
              <button
                type="button"
                className={`btn-sim ${
                  scale >= 12 ? "sim-fullscreen" : "absolute"
                }`}
                onClick={handleSim}
                style={
                  scale < 12
                    ? {
                        top: `${simPos.top}%`,
                        left: `${simPos.left}%`,
                        transform: `translate(-50%, -50%) scale(${scale})`,
                      }
                    : {}
                }
              >
                Sim
              </button>

              {scale < 12 && (
                <button
                  type="button"
                  className="btn-nao absolute"
                  onClick={handleNao}
                  style={{
                    top: `${naoPos.top}%`,
                    left: `${naoPos.left}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  Não
                </button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
