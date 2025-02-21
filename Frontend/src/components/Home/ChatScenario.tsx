import { useEffect, useState } from "react";
import { UI_TEXT } from "../../const/homeConstant";

const ChatScenario = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEntering, setIsEntering] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsEntering(false); // Trigger exit animation
      setTimeout(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % UI_TEXT.CHAT_SCENARIOS.length
        );
        setIsEntering(true); // Trigger enter animation
      }, 500); // Wait for exit animation to complete
    }, 12000); // Change scenario every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const currentScenario = UI_TEXT.CHAT_SCENARIOS[currentIndex];

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
      {/* Embedded CSS */}
      <style>
        {`
          @keyframes slide-in-left {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slide-in-right {
            from {
              opacity: 0;
              transform: translateX(20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .slide-in-left {
            animation: slide-in-left 0.5s ease-out;
          }

          .slide-in-right {
            animation: slide-in-right 0.5s ease-out;
          }
        `}
      </style>

      <div className="mb-6">
        <h3
          className={`text-2xl font-bold text-gray-800 mb-2 transition-opacity duration-500 ${
            isEntering ? "opacity-100" : "opacity-0"
          }`}
        >
          {currentScenario.TITLE}
        </h3>
        <p
          className={`text-gray-600 transition-opacity duration-500 ${
            isEntering ? "opacity-100" : "opacity-0"
          }`}
        >
          {currentScenario.DESCRIPTION}
        </p>
      </div>
      <div className="space-y-4">
        {currentScenario.MESSAGES.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              index % 2 === 0 ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg transition-all duration-500 transform ${
                index % 2 === 0
                  ? "bg-gray-100 text-gray-900 slide-in-right"
                  : "bg-gradient-to-r from-purple-500 to-blue-500 text-white slide-in-left"
              } ${
                isEntering
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatScenario;
