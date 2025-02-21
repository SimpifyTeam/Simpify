import { Loader2 } from "lucide-react";

interface LoaderProps {
  message?: string;
  variant?: "default" | "fun";
}

const AnimatedLoader = ({
  message = "Loading",
  variant = "fun",
}: LoaderProps) => {
  // If not fun variant, show simple spinner
  if (variant === "default") {
    return (
      <div className="fixed inset-0 grid place-items-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
          <p className="text-sm tracking-wide text-gray-500">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 grid place-items-center bg-gradient-to-br from-white to-gray-50">
      <div className="w-72 h-72 sm:w-96 sm:h-96">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 400 300"
          className="w-full h-full"
        >
          <defs>
            <linearGradient
              id="heartGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                className="text-rose-400"
                stopColor="currentColor"
              />
              <stop
                offset="100%"
                className="text-rose-500"
                stopColor="currentColor"
              />
            </linearGradient>

            <filter id="bubble-shadow">
              <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.1" />
            </filter>

            <style>
              {`
                @keyframes moveAndFadeLeft {
                  0% { transform: translate(-40px, 0); opacity: 0; }
                  20% { transform: translate(-40px, 0); opacity: 1; }
                  70% { transform: translate(0, 0); opacity: 1; }
                  90% { transform: translate(8px, 0) scale(0.8); opacity: 0.5; }
                  100% { transform: translate(8px, 0) scale(0); opacity: 0; }
                }

                @keyframes moveAndFadeRight {
                  0% { transform: translate(40px, 0); opacity: 0; }
                  20% { transform: translate(40px, 0); opacity: 1; }
                  70% { transform: translate(0, 0); opacity: 1; }
                  90% { transform: translate(-8px, 0) scale(0.8); opacity: 0.5; }
                  100% { transform: translate(-8px, 0) scale(0); opacity: 0; }
                }

                @keyframes heartAppear {
                  0% { transform: scale(0) rotate(180deg); opacity: 0; }
                  50% { transform: scale(1.2) rotate(0deg); opacity: 1; }
                  100% { transform: scale(1) rotate(0deg); opacity: 1; }
                }

                @keyframes heartBeat {
                  0%, 100% { transform: scale(1); }
                  50% { transform: scale(1.1); }
                }

                @keyframes sparkle {
                  0%, 100% { opacity: 0; transform: scale(0); }
                  50% { opacity: 1; transform: scale(1); }
                }

                @keyframes progressFill {
                  from { width: 0; }
                  to { width: 160px; }
                }

                @keyframes glow {
                  0%, 100% { filter: drop-shadow(0 0 2px rgba(244, 63, 94, 0.4)); }
                  50% { filter: drop-shadow(0 0 4px rgba(244, 63, 94, 0.6)); }
                }

                .left-bubble { animation: moveAndFadeLeft 2.5s forwards infinite; }
                .right-bubble { animation: moveAndFadeRight 2.5s forwards infinite; }
                .heart { 
                  animation: heartAppear 0.8s ease-out forwards 0.3s,
                           heartBeat 1s ease-in-out infinite 1.1s,
                           glow 1.5s ease-in-out infinite 1.1s;
                  opacity: 0;
                }
                .sparkle { 
                  animation: sparkle 1s ease-in-out infinite;
                  animation-delay: var(--delay);
                }
                .progress-fill { 
                  animation: progressFill 2s linear infinite;
                }
              `}
            </style>
          </defs>

          <g transform="translate(200, 150)">
            <g className="left-bubble">
              <path
                d="M-60 -15 h40 a8 8 0 0 1 8 8 v14 a8 8 0 0 1 -8 8 h-34 l-6 10 l-3 -10 h-3 a8 8 0 0 1 -8 -8 v-14 a8 8 0 0 1 8 -8 z"
                className="fill-gray-100"
                filter="url(#bubble-shadow)"
              />
            </g>

            <g className="right-bubble">
              <path
                d="M15 -15 h40 a8 8 0 0 1 8 8 v14 a8 8 0 0 1 -8 8 h-3 l-3 10 l-6 -10 h-34 a8 8 0 0 1 -8 -8 v-14 a8 8 0 0 1 8 -8 z"
                className="fill-gray-100"
                filter="url(#bubble-shadow)"
              />
            </g>

            <g className="heart">
              <path
                d="M0 15 C0 7.5 -7.5 -11.25 -22.5 -11.25 C-45 -11.25 -30 18.75 0 30 C30 18.75 45 -11.25 22.5 -11.25 C7.5 -11.25 0 7.5 0 15Z"
                fill="url(#heartGradient)"
              />
              <g className="sparkles">
                <circle
                  className="sparkle fill-rose-200"
                  cx="-15"
                  cy="-15"
                  r="1.5"
                  style={{ "--delay": "0s" }}
                />
                <circle
                  className="sparkle fill-rose-200"
                  cx="15"
                  cy="-15"
                  r="1.5"
                  style={{ "--delay": "0.3s" }}
                />
                <circle
                  className="sparkle fill-rose-200"
                  cx="0"
                  cy="22"
                  r="1.5"
                  style={{ "--delay": "0.6s" }}
                />
              </g>
            </g>
          </g>

          <g transform="translate(120, 220)">
            <rect width="160" height="2" className="fill-gray-200" />
            <rect
              className="progress-fill"
              height="2"
              fill="url(#heartGradient)"
            />
          </g>

          <text
            x="200"
            y="260"
            textAnchor="middle"
            className="text-sm tracking-widest fill-gray-400"
          >
            {message}
          </text>
        </svg>
      </div>
    </div>
  );
};

export default AnimatedLoader;
