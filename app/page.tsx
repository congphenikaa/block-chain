"use client";

import { useState } from "react";
import { ConnectButton, useCurrentAccount } from "@iota/dapp-kit";
import { useContract } from "@/hooks/useContract";

export default function Home() {
  const account = useCurrentAccount();
  const { submitGuess, checkGuess, loading } = useContract();
  
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [num3, setNum3] = useState("");
  const [num4, setNum4] = useState("");
  const [guessBoxId, setGuessBoxId] = useState("");

  const handleSubmitGuess = async () => {
    if (!num1 || !num2 || !num3 || !num4) {
      alert("Please enter all 4 numbers");
      return;
    }

    const result = await submitGuess(
      parseInt(num1),
      parseInt(num2),
      parseInt(num3),
      parseInt(num4)
    );

    if (result) {
      alert(`Guess submitted! GuessBox created: ${result}`);
      setGuessBoxId(result);
    }
  };

  const handleCheckGuess = async () => {
    if (!guessBoxId) {
      alert("Please enter GuessBox ID");
      return;
    }

    const result = await checkGuess(guessBoxId);
    if (result) {
      alert("🎉 Congratulations! You got the flag!");
    } else {
      alert("❌ Incorrect guess. Try again!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-blue-600 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">🎮 Game Guess</h1>
          <ConnectButton />
        </div>

        {/* Main Content */}
        {account ? (
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Guess the 4 Numbers!
              </h2>
              <p className="text-gray-600 mb-6">
                Can you guess the correct 4 numbers? Each number is between 0-255.
              </p>

              {/* Input Grid */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={num1}
                  onChange={(e) => setNum1(e.target.value)}
                  placeholder="Number 1"
                  className="p-4 border-2 border-gray-300 rounded-lg text-center text-2xl font-bold focus:border-purple-500 focus:outline-none text-gray-800"
                />
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={num2}
                  onChange={(e) => setNum2(e.target.value)}
                  placeholder="Number 2"
                  className="p-4 border-2 border-gray-300 rounded-lg text-center text-2xl font-bold focus:border-purple-500 focus:outline-none text-gray-800"
                />
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={num3}
                  onChange={(e) => setNum3(e.target.value)}
                  placeholder="Number 3"
                  className="p-4 border-2 border-gray-300 rounded-lg text-center text-2xl font-bold focus:border-purple-500 focus:outline-none text-gray-800"
                />
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={num4}
                  onChange={(e) => setNum4(e.target.value)}
                  placeholder="Number 4"
                  className="p-4 border-2 border-gray-300 rounded-lg text-center text-2xl font-bold focus:border-purple-500 focus:outline-none text-gray-800"
                />
              </div>

              <button
                onClick={handleSubmitGuess}
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit Guess"}
              </button>
            </div>

            {/* Check Guess Section */}
            <div className="border-t pt-8">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Check Your Guess
              </h3>
              <p className="text-gray-600 mb-4">
                Enter your GuessBox ID to check if your guess is correct:
              </p>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={guessBoxId}
                  onChange={(e) => setGuessBoxId(e.target.value)}
                  placeholder="GuessBox Object ID"
                  className="flex-1 p-4 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-gray-800"
                />
                <button
                  onClick={handleCheckGuess}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Checking..." : "Check"}
                </button>
              </div>
            </div>

            {/* Hint */}
            <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-sm text-yellow-800">
                💡 <strong>Hint:</strong> The numbers are special... Think about lucky numbers, 
                the meaning of life, and some magic numbers in computer science!
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Welcome to Game Guess!
            </h2>
            <p className="text-gray-600 mb-8">
              Connect your IOTA wallet to start playing
            </p>
            <div className="inline-block">
              <ConnectButton />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-white text-sm">
          <p>Built with IOTA, Move, and Next.js</p>
        </div>
      </div>
    </div>
  );
}
