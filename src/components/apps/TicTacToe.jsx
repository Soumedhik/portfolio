import React, { useState, useEffect } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameStatus, setGameStatus] = useState("Your turn! You are 😊");
  const [score, setScore] = useState({ player: 0, ai: 0, draws: 0 });
  const [difficulty, setDifficulty] = useState("expert"); // easy, medium, expert, impossible

  const playerEmoji = "😊";
  const aiEmoji = "🤖";

  // Advanced AI with minimax algorithm
  const minimax = (board, depth, isMaximizing, alpha = -Infinity, beta = Infinity) => {
    const winner = checkWinner(board);
    
    if (winner === aiEmoji) return 10 - depth;
    if (winner === playerEmoji) return depth - 10;
    if (board.every(cell => cell !== null)) return 0;

    if (isMaximizing) {
      let maxScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = aiEmoji;
          const score = minimax(board, depth + 1, false, alpha, beta);
          board[i] = null;
          maxScore = Math.max(score, maxScore);
          alpha = Math.max(alpha, score);
          if (beta <= alpha) break; // Alpha-beta pruning
        }
      }
      return maxScore;
    } else {
      let minScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = playerEmoji;
          const score = minimax(board, depth + 1, true, alpha, beta);
          board[i] = null;
          minScore = Math.min(score, minScore);
          beta = Math.min(beta, score);
          if (beta <= alpha) break; // Alpha-beta pruning
        }
      }
      return minScore;
    }
  };

  const getBestMove = (board) => {
    // Difficulty adjustments
    if (difficulty === "easy") {
      // 70% chance of random move
      if (Math.random() < 0.7) {
        const availableMoves = board.map((cell, index) => cell === null ? index : null).filter(val => val !== null);
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
      }
    } else if (difficulty === "medium") {
      // 40% chance of random move
      if (Math.random() < 0.4) {
        const availableMoves = board.map((cell, index) => cell === null ? index : null).filter(val => val !== null);
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
      }
    }

    let bestMove = -1;
    let bestScore = -Infinity;

    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = aiEmoji;
        const score = minimax(board, 0, false);
        board[i] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    return bestMove;
  };

  const checkWinner = (board) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const makeMove = (index) => {
    if (board[index] !== null || !isPlayerTurn) return;

    const newBoard = [...board];
    newBoard[index] = playerEmoji;
    setBoard(newBoard);
    setIsPlayerTurn(false);

    const winner = checkWinner(newBoard);
    if (winner) {
      setGameStatus(`${winner === playerEmoji ? "You win! 🎉" : "AI wins! 🤖"}`);
      updateScore(winner);
      return;
    }

    if (newBoard.every(cell => cell !== null)) {
      setGameStatus("It's a draw! 🤝");
      updateScore("draw");
      return;
    }

    setGameStatus("AI is thinking... 🤔");
  };

  const updateScore = (winner) => {
    setScore(prev => ({
      ...prev,
      player: winner === playerEmoji ? prev.player + 1 : prev.player,
      ai: winner === aiEmoji ? prev.ai + 1 : prev.ai,
      draws: winner === "draw" ? prev.draws + 1 : prev.draws
    }));
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setGameStatus("Your turn! You are 😊");
  };

  const resetScore = () => {
    setScore({ player: 0, ai: 0, draws: 0 });
  };

  // AI move effect
  useEffect(() => {
    if (!isPlayerTurn && !checkWinner(board) && board.some(cell => cell === null)) {
      const timeout = setTimeout(() => {
        const aiMove = getBestMove([...board]);
        const newBoard = [...board];
        newBoard[aiMove] = aiEmoji;
        setBoard(newBoard);

        const winner = checkWinner(newBoard);
        if (winner) {
          setGameStatus(`${winner === playerEmoji ? "You win! 🎉" : "AI wins! 🤖"}`);
          updateScore(winner);
        } else if (newBoard.every(cell => cell !== null)) {
          setGameStatus("It's a draw! 🤝");
          updateScore("draw");
        } else {
          setGameStatus("Your turn! You are 😊");
          setIsPlayerTurn(true);
        }
      }, 1000); // AI thinks for 1 second

      return () => clearTimeout(timeout);
    }
  }, [isPlayerTurn, board, difficulty]);

  const getDifficultyColor = () => {
    switch (difficulty) {
      case "easy": return "text-green-400";
      case "medium": return "text-yellow-400";
      case "expert": return "text-red-400";
      case "impossible": return "text-purple-400";
      default: return "text-white";
    }
  };

  const getDifficultyDescription = () => {
    switch (difficulty) {
      case "easy": return "AI makes mistakes";
      case "medium": return "AI is decent";
      case "expert": return "AI is very smart";
      case "impossible": return "AI never loses";
      default: return "";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-neutral-900 text-white p-6">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold mb-2">🎮 Advanced Tic Tac Toe</h1>
        <p className="text-lg mb-4">{gameStatus}</p>
        
        {/* Difficulty Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Difficulty Level:</label>
          <select 
            value={difficulty} 
            onChange={(e) => setDifficulty(e.target.value)}
            className="bg-neutral-800 border border-neutral-600 rounded px-3 py-1 text-white"
            disabled={!board.every(cell => cell === null)}
          >
            <option value="easy">🟢 Easy</option>
            <option value="medium">🟡 Medium</option>
            <option value="expert">🔴 Expert</option>
            <option value="impossible">🟣 Impossible</option>
          </select>
          <p className={`text-sm mt-1 ${getDifficultyColor()}`}>
            {getDifficultyDescription()}
          </p>
        </div>

        {/* Score Display */}
        <div className="bg-neutral-800 rounded-lg p-3 mb-4">
          <div className="flex justify-around text-sm">
            <div>You: <span className="text-green-400 font-bold">{score.player}</span></div>
            <div>AI: <span className="text-red-400 font-bold">{score.ai}</span></div>
            <div>Draws: <span className="text-yellow-400 font-bold">{score.draws}</span></div>
          </div>
        </div>
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-3 gap-2 mb-6 bg-neutral-800 p-4 rounded-xl">
        {board.map((cell, index) => (
          <button
            key={index}
            className="w-20 h-20 bg-neutral-700 hover:bg-neutral-600 rounded-lg flex items-center justify-center text-3xl transition-colors duration-200 border-2 border-neutral-600 hover:border-neutral-500"
            onClick={() => makeMove(index)}
            disabled={cell !== null || !isPlayerTurn}
          >
            {cell}
          </button>
        ))}
      </div>

      {/* Control Buttons */}
      <div className="flex gap-4">
        <button
          onClick={resetGame}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
        >
          🔄 New Game
        </button>
        <button
          onClick={resetScore}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
        >
          🗑️ Reset Score
        </button>
      </div>

      {/* Game Tips */}
      <div className="mt-4 text-xs text-neutral-400 text-center max-w-md">
        <p>💡 Tips: The AI gets harder as you increase difficulty. On "Impossible" mode, the AI uses perfect strategy and will never lose!</p>
      </div>
    </div>
  );
};

export default TicTacToe;