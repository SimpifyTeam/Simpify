import React, { useState, useEffect, useCallback } from 'react';
import { 
  Sparkles, 
  Coffee,
  Play,
  Calendar,
  Rocket,
  Mail,
  Check,
  Lock,
  Zap,
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import axios from 'axios';

// Types and Interfaces
interface Message {
  text: string;
  isAI: boolean;
}

interface ChatExample {
  scenario: string;
  icon: React.ReactNode;
  messages: Message[];
}

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Constants
const EXAMPLE_ROTATION_INTERVAL = 6000;
const FEATURE_ROTATION_INTERVAL = 6500;
const TYPING_ANIMATION_DURATION = 1000;

const App: React.FC = () => {
  // State management
  const [formState, setFormState] = useState({
    email: '',
    submitted: false,
    loading: false,
  });
  const [chatState, setChatState] = useState({
    activeExample: 0,
    isTyping: false,
  });
  const [activeFeature, setActiveFeature] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Features data
  const features: Feature[] = [
    {
      title: "AI-Powered Pickup Lines",
      description: "Generate clever and unique pickup lines tailored to your personality.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Interactive Chat Games",
      description: "Engage in fun conversation games that help build connection.",
      icon: <Play className="w-6 h-6" />
    },
    {
      title: "Smart Conversation Boosters",
      description: "Get contextual suggestions to keep discussions flowing naturally.",
      icon: <MessageCircle className="w-6 h-6" />
    },
    {
      title: "Privacy Focused",
      description: "End-to-end encryption ensures your conversations stay private.",
      icon: <Lock className="w-6 h-6" />
    }
  ];

  // Chat examples data
  const examples: ChatExample[] = [
    {
      scenario: "Casual Chat",
      icon: <Coffee className="w-6 h-6" />,
      messages: [
        { text: "What's your favorite way to spend a weekend?", isAI: false },
        { text: "I love exploring new coffee shops and reading! How about you?", isAI: true },
        { text: "That sounds perfect! Any good spots you'd recommend?", isAI: false },
        { text: "There's this hidden gem called 'The Daily Grind' - amazing atmosphere!", isAI: true }
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
        { text: "The cherry blossoms in spring are breathtaking there.", isAI: true },
        { text: "That's definitely on my bucket list!", isAI: false }
      ]
    }
  ];

  // Form submission handler
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState((prev) => ({ ...prev, loading: true }));
    setError(null);
  
    try {
      // Replace simulated API call with an actual Axios request
      const response = await axios.post('/api/request-access', {
        email: formState.email, // Pass the email from your form state
      });
  
      // Handle the successful response
      console.log(response.data); // Optional: Debugging the response
      setFormState((prev) => ({ ...prev, submitted: true }));
    } catch (err) {
      console.error(err); // Optional: Debugging the error
      setError('Failed to submit. Please try again.');
    } finally {
      setFormState((prev) => ({ ...prev, loading: false }));
    }
  }, [formState.email]);
  

  // Example rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setChatState(prev => ({
        activeExample: (prev.activeExample + 1) % examples.length,
        isTyping: true
      }));

      const typingTimeout = setTimeout(
        () => setChatState(prev => ({ ...prev, isTyping: false })),
        TYPING_ANIMATION_DURATION
      );

      return () => clearTimeout(typingTimeout);
    }, EXAMPLE_ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, [examples.length]);

  // Feature rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, FEATURE_ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, [features.length]);

  // Custom Button Component
  const Button: React.FC<{
    type?: "button" | "submit";
    disabled?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
  }> = ({ type = "button", disabled, onClick, children, className = "" }) => (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );

  // Custom Message Bubble Component
  const MessageBubble: React.FC<{ message: Message; isTyping: boolean }> = ({ message, isTyping }) => (
    <div
      className={`flex ${message.isAI ? "justify-start" : "justify-end"}`}
      role="log"
      aria-live="polite"
    >
      <div
        className={`max-w-[80%] p-3 rounded-lg transition-all duration-300 ${
          message.isAI 
            ? "bg-gray-100 text-gray-900 border-l-4 border-purple-400" 
            : "bg-purple-500 text-white"
        }`}
      >
        {isTyping ? (
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-75"></div>
            <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-150"></div>
          </div>
        ) : (
          message.text
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-purple-900 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h1 className="text-5xl font-bold" aria-label="Simpify">
              SIMPIFY
            </h1>
            <Sparkles className="w-8 h-8 text-yellow-300" aria-hidden="true" />
          </div>
          
          {/* Error Message */}
          {error && (
            <div role="alert" className="mt-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center gap-2 mx-auto max-w-md">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Form Section */}
          {!formState.submitted ? (
            <form
              onSubmit={handleSubmit}
              className="mt-8 max-w-md mx-auto space-y-4"
              aria-label="Sign up form"
            >
              <div className="relative group">
                <Mail 
                  className="absolute left-3 top-3 w-6 h-6 text-purple-300 transition-transform group-hover:scale-105" 
                  aria-hidden="true"
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 pl-12 rounded-lg bg-white/90 backdrop-blur-sm text-purple-900 border-2 border-transparent transition-all hover:border-purple-300 focus:border-purple-400 focus:ring focus:ring-purple-200 outline-none"
                  value={formState.email}
                  onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                  required
                  aria-label="Email address"
                />
              </div>
              <Button
                type="submit"
                disabled={formState.loading}
                className="group w-full bg-purple-500 hover:bg-purple-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formState.loading ? (
                  <div className="animate-spin w-6 h-6 border-4 border-white border-t-transparent rounded-full mx-auto" />
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    Request Access
                    <Rocket className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </Button>
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
      <section className="container mx-auto px-4 py-16" aria-labelledby="features-heading">
        <h2 id="features-heading" className="text-3xl font-bold text-gray-900 text-center mb-12">
          Why Choose Simpify
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`p-6 rounded-lg bg-white shadow-lg transition-all duration-500 ${
                index === activeFeature ? 'scale-105 border-2 border-purple-400' : ''
              }`}
              role="article"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-purple-600" aria-hidden="true">{feature.icon}</div>
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Chat Examples Section */}
      <section className="container mx-auto px-4 py-16 bg-gray-50" aria-labelledby="examples-heading">
        <h2 id="examples-heading" className="text-3xl font-bold text-gray-900 text-center mb-8">
          See Simpify in Action
        </h2>
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              {examples[chatState.activeExample].icon}
              <h3 className="text-lg font-medium text-gray-900">
                {examples[chatState.activeExample].scenario}
              </h3>
            </div>
            <MessageCircle className="w-5 h-5 text-purple-600" aria-hidden="true" />
          </div>
          <div className="space-y-4">
            {examples[chatState.activeExample].messages.map((msg, idx) => (
              <MessageBubble
                key={idx}
                message={msg}
                isTyping={chatState.isTyping && idx === examples[chatState.activeExample].messages.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-700 to-purple-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Simpify. All rights reserved.</p>
          <p className="mt-2">Made with ❤️ for better conversations.</p>
          <nav className="mt-4 space-x-4">
            <a href="#" className="hover:text-purple-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-purple-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-purple-300 transition-colors">Contact Us</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default App;