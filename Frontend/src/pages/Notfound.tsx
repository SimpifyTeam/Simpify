import React, { useState } from "react";
import { Heart, MessageCircle, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const [gameStarted, setGameStarted] = useState(false);
  const [userGuess, setUserGuess] = useState("");
  const [message, setMessage] = useState("");
  const [targetNumber] = useState(Math.floor(Math.random() * 100) + 1);

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const guess = parseInt(userGuess, 10);
    if (isNaN(guess)) {
      setMessage("Please enter a valid number!");
    } else if (guess < targetNumber) {
      setMessage("Too low! Try a higher number.");
    } else if (guess > targetNumber) {
      setMessage("Too high! Try a lower number.");
    } else {
      setMessage(
        `Congratulations! You guessed the number ${targetNumber} correctly!`
      );
      setGameStarted(false); // End the game
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* Animated chat bubbles and heart */}
        <div className="relative h-32 w-32 mx-auto mb-8">
          <div className="absolute left-0 bottom-0 animate-bounce delay-100">
            <MessageCircle className="h-12 w-12 text-purple-300" />
          </div>
          <div className="absolute left-16 bottom-8 animate-bounce delay-200">
            <Heart className="h-10 w-10 text-purple-400 fill-purple-400" />
          </div>
          <div className="absolute right-0 bottom-4 animate-bounce delay-300">
            <MessageCircle className="h-12 w-12 text-purple-300" />
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="text-6xl font-bold text-purple-400 mb-4">404</h1>
        <h2 className="text-2xl font-medium text-gray-700 mb-6">
          Oops! Our Chat Got Lost
        </h2>
        <p className="text-gray-600 mb-8">
          Looks like our AI conversation took an unexpected turn. Don't worry,
          we can start a new chat together!
        </p>

        {/* Simple Chat-Based Game */}
        {!gameStarted ? (
          <button
            className="inline-flex items-center px-6 py-3 bg-purple-400 text-white rounded-full hover:bg-purple-500 transition-colors duration-200 mb-8"
            onClick={() => setGameStarted(true)}
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Play a Number Guessing Game
          </button>
        ) : (
          <div className="mb-8">
            <p className="text-gray-600 mb-4">
              I'm thinking of a number between 1 and 100. Can you guess it?
            </p>
            <form onSubmit={handleGuessSubmit} className="flex justify-center">
              <input
                type="text"
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)}
                className="border border-purple-300 rounded-l-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Enter your guess"
              />
              <button
                type="submit"
                className="bg-purple-400 text-white rounded-r-full px-4 py-2 hover:bg-purple-500 transition-colors duration-200"
              >
                Guess
              </button>
            </form>
            {message && <p className="text-purple-600 mt-4">{message}</p>}
          </div>
        )}

        {/* Home Button */}
        <button
          className="inline-flex items-center px-6 py-3 bg-purple-400 text-white rounded-full hover:bg-purple-500 transition-colors duration-200"
          onClick={handleHomeClick}
        >
          <Home className="h-5 w-5 mr-2" />
          Return Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
