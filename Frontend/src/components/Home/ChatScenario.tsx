import { UI_TEXT } from "../../const/homeConstant";

const ChatScenario = () => {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 animate-slide-in-right">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          {UI_TEXT.CHAT_SCENARIOS[0].TITLE}
        </h3>
        <p className="text-gray-600">
          {UI_TEXT.CHAT_SCENARIOS[0].DESCRIPTION}
        </p>
      </div>
      <div className="space-y-4">
        {UI_TEXT.CHAT_SCENARIOS[0].MESSAGES.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              index % 2 === 0 ? "justify-end" : "justify-start"
            } animate-fade-in-up`}
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                index % 2 === 0
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                  : "bg-gray-100 text-gray-900"
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