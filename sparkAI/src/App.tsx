import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  Coffee,
  Play,
  Calendar,
  Rocket,
  Mail,
  Check,
  Lock,
  Zap,
  MessageCircle
} from 'lucide-react';


interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const App: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeExample, setActiveExample] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  const features: Feature[] = [
    {
      title: "AI-Powered Pickup Lines",
      description: "Generate clever and unique pickup lines to break the ice.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Interactive Chat Games",
      description: "Play fun games with friends to keep the conversation exciting.",
      icon: <Play className="w-6 h-6" />
    },
    {
      title: "Conversation Boosters",
      description: "Never run out of things to say with our smart suggestions.",
      icon: <MessageCircle className="w-6 h-6" />
    },
    {
      title: "Privacy Focused",
      description: "Your chats are secured with advanced encryption.",
      icon: <Lock className="w-6 h-6" />
    }
  ];

  const examples = [
    {
      scenario: "Casual Chat",
      icon: <Coffee className="w-6 h-6" />,
      messages: [
        { text: "What's your favorite movie genre?", isAI: false },
        { text: "I love comedies! What's yours?", isAI: true },
        { text: "I'm into thrillers. Got any recommendations?", isAI: false },
        { text: "Definitely! 'Knives Out' is a must-watch.", isAI: true }
      ]
    },
    {
      scenario: "Flirting",
      icon: <Sparkles className="w-6 h-6" />,
      messages: [
        { text: "You're so captivating, it's like magic.", isAI: true },
        { text: "Haha, smooth. Got more of those?", isAI: false },
        { text: "Are you a keyboard? Because you're just my type.", isAI: true },
        { text: "Wow, that one's a winner!", isAI: false }
      ]
    },
    {
      scenario: "Keeping the Conversation Alive",
      icon: <Calendar className="w-6 h-6" />,
      messages: [
        { text: "What's a place you've always wanted to visit?", isAI: true },
        { text: "Japan. I've heard it's amazing!", isAI: false },
        { text: "Absolutely. The cherry blossoms are breathtaking.", isAI: true },
        { text: "That's on my bucket list for sure.", isAI: false }
      ]
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitted(true);
    setLoading(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveExample((prev) => (prev + 1) % examples.length);
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 1000);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 6500);
    return () => clearInterval(featureInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-purple-900 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h1 className="text-5xl font-bold">Spark AI</h1>
            <Sparkles className="w-8 h-8 text-yellow-300" />
          </div>
          <p className="text-xl mt-4 flex items-center justify-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Elevate Your Conversations, Anytime, Anywhere
          </p>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="mt-8 max-w-md mx-auto space-y-4"
            >
              <div className="relative group">
                <Mail className="absolute left-3 top-3 w-6 h-6 text-purple-300 transition-transform group-hover:scale-105" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 pl-12 rounded-lg bg-white/90 backdrop-blur-sm text-purple-900 border-2 border-transparent transition-all hover:border-purple-300 focus:border-purple-400 focus:ring focus:ring-purple-200 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="group w-full p-3 rounded-lg text-white bg-purple-500 hover:bg-purple-600 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="animate-spin w-6 h-6 border-4 border-white border-t-transparent rounded-full" />
                ) : (
                  <>
                    Request Access
                    <Rocket className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="mt-8 p-6 max-w-md mx-auto bg-white/90 backdrop-blur-sm text-purple-900 rounded-lg">
              <div className="flex items-center justify-center gap-2">
                <Check className="w-6 h-6 text-green-500" />
                <h3 className="text-lg font-bold">Access Requested</h3>
              </div>
              <p>We'll notify you when your account is ready.</p>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Why Choose Spark AI
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg bg-white shadow-lg transition-all duration-500 ${
                index === activeFeature ? 'scale-105 border-2 border-purple-400' : ''
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-purple-600">{feature.icon}</div>
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Example Section */}
      <div className="container mx-auto px-4 py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          See Spark AI in Action
        </h2>
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              {examples[activeExample].icon}
              <h3 className="text-lg font-medium text-gray-900">
                {examples[activeExample].scenario}
              </h3>
            </div>
            <MessageCircle className="w-5 h-5 text-purple-600" />
          </div>
          <div className="space-y-4">
            {examples[activeExample].messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.isAI ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.isAI 
                      ? "bg-gray-100 text-gray-900 border-l-4 border-purple-400" 
                      : "bg-purple-500 text-white"
                  }`}
                >
                  {isTyping && idx === examples[activeExample].messages.length - 1 && msg.isAI ? (
                    <div className="animate-pulse">...</div>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gradient-to-r from-blue-700 to-purple-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Spark AI. All rights reserved.</p>
          <p className="mt-2">Made with ❤️ for better conversations.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
