import React, { useState, useEffect } from "react";

const RomanticWordGame = () => {
  const romanticWords = [
    { kata: "cinta", clue: "Perasaan mendalam yang tulus" },
    { kata: "cahya", clue: "Yang suka gombalin Aida" },
    { kata: "sayang", clue: "Perasaan hangat kepada seseorang" },
    { kata: "rindu", clue: "Perasaan ingin bertemu" },
    { kata: "bahagia", clue: "Perasaan senang dan puas" },
    { kata: "setia", clue: "Tetap mendampingi dalam keadaan apapun" },
    { kata: "manis", clue: "Rasa seperti madu atau gula" },
    { kata: "hangat", clue: "Seperti pelukan di pagi hari" },
    { kata: "tulus", clue: "Tidak dibuat-buat atau palsu" },
    { kata: "indah", clue: "Cantik dan mempesona" }
  ];

  const [currentWord, setCurrentWord] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStatus, setGameStatus] = useState("waiting"); // waiting, playing, finished
  const [message, setMessage] = useState("");

  const startGame = () => {
    setGameStatus("playing");
    setCurrentWord(0);
    setScore(0);
    setTimeLeft(30);
    setUserInput("");
    setMessage("");
  };

  useEffect(() => {
    if (gameStatus === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameStatus("finished");
      setMessage("Waktu habis! Game selesai.");
    }
  }, [gameStatus, timeLeft]);

  const checkAnswer = () => {
    if (userInput.toLowerCase() === romanticWords[currentWord].kata) {
      setScore((prev) => prev + 10);
      setMessage("Benar! +10 poin 🎉");

      setTimeout(() => {
        if (currentWord < romanticWords.length - 1) {
          setCurrentWord((prev) => prev + 1);
          setUserInput("");
          setMessage("");
        } else {
          setGameStatus("finished");
          setMessage("Selamat! Kamu menyelesaikan semua level! 🏆");
        }
      }, 1000);
    } else {
      setMessage("Coba lagi! 💕");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gameStatus === "playing") {
      checkAnswer();
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>💕 Game Kata Romantis 💕</h1>

      {gameStatus === "waiting" && (
        <button onClick={startGame}>Mulai Game</button>
      )}

      {gameStatus === "playing" && (
        <>
          <p>⏳ Waktu: {timeLeft}s | 🎯 Skor: {score}</p>
          <p>Petunjuk: {romanticWords[currentWord].clue}</p>
          <form onSubmit={handleSubmit}>
            <input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Tulis jawabanmu..."
            />
            <button type="submit">Cek</button>
          </form>
          {message && <p>{message}</p>}
        </>
      )}

      {gameStatus === "finished" && (
        <>
          <h2>Game Selesai! 🎊</h2>
          <p>Skor Akhir: {score}</p>
          <button onClick={startGame}>Main Lagi</button>
        </>
      )}
    </div>
  );
};

export default RomanticWordGame;