import React, { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { 
  Rocket,
  Mail,
  Check,
  MessageCircle,
  Heart,
  Zap
} from 'lucide-react';

interface Message {
  text: string;
  isAI: boolean;
}

interface ChatScenario {
  title: string;
  description: string;
  messages: Message[];
}

const Home: React.FC = () => {
  const [state, handleSubmit] = useForm("xzzddpbo");
  const [isHovered, setIsHovered] = useState(false);
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);

  const chatScenarios: ChatScenario[] = [
    {
      title: "First Date Magic",
      description: "Crush those first date nerves",
      messages: [
        { text: "So, what do you like to do for fun?", isAI: false },
        { text: "I'm all about urban photography – catching those random city moments that tell a story.", isAI: true },
        { text: "That's cool! Got a favorite shot?", isAI: false },
        { text: "There's this sunrise pic from the farmers market. Wanna see?", isAI: true }
      ]
    },
    {
      title: "Pro Networking",
      description: "Make connections that count",
      messages: [
        { text: "I want to grow my tech network.", isAI: false },
        { text: "Let's make you stand out. How about: 'Creative problem-solver turning challenges into opportunities'?", isAI: true },
        { text: "Will that sound too intense?", isAI: false },
        { text: "Nah, it's confident without being cocky. Trust me.", isAI: true }
      ]
    },
    {
      title: "Dating App Win",
      description: "Spark conversations that click",
      messages: [
        { text: "You're a hiker? Any crazy trail stories?", isAI: false },
        { text: "Got chased by a mountain goat once. Turned a scary moment into a hilarious story!", isAI: true },
        { text: "That's epic! Most people would've freaked.", isAI: false },
        { text: "Want to hear how I escaped?", isAI: true }
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScenarioIndex((prev) => (prev + 1) % chatScenarios.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "Never Awkward",
      description: "Turn small talk into big connections",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Your Vibe, Your Style",
      description: "Real advice that sounds like you",
      icon: <Heart className="w-6 h-6" />
    },
    {
      title: "Confidence On Demand",
      description: "Smooth replies at your fingertips",
      icon: <MessageCircle className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col overflow-x-hidden">
      <main className="flex-grow container mx-auto px-4 py-16 max-w-6xl flex flex-col justify-center">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-4 animate-pulse-slow">
            Simpify
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Talk smarter. Connect better.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-100 animate-slide-in-left">
            {!state.succeeded ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative group">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 pl-10 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300"
                    required
                    aria-label="Email address"
                  />
                  <Mail 
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" 
                    aria-hidden="true"
                  />
                  <ValidationError 
                    prefix="Email" 
                    field="email"
                    errors={state.errors}
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <textarea
                  id="message"
                  name="message"
                  placeholder="Why are you excited about Simpify? (Optional)"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300"
                  rows={3}
                />

                <button
                  type="submit"
                  disabled={state.submitting}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 rounded-xl transition-all duration-300 group"
                >
                  <div className="flex items-center justify-center gap-2">
                    {state.submitting ? (
                      <div className="animate-spin w-6 h-6 border-4 border-white border-t-transparent rounded-full" />
                    ) : (
                      <>
                        Join the Waitlist
                        <Rocket 
                          className={`w-5 h-5 transition-transform ${
                            isHovered ? 'translate-x-1' : ''
                          }`} 
                        />
                      </>
                    )}
                  </div>
                </button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="flex justify-center mb-4">
                  <Check className="w-16 h-16 text-green-500 bg-green-100 rounded-full p-4" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">You're on the List!</h2>
                <p className="text-gray-600">
                  We'll send you an exclusive invite when Simpify launches.
                </p>
              </div>
            )}
          </div>

          <div className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-100 animate-slide-in-right">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {chatScenarios[activeScenarioIndex].title}
              </h3>
              <p className="text-gray-600">
                {chatScenarios[activeScenarioIndex].description}
              </p>
            </div>
            <div className="space-y-4">
              {chatScenarios[activeScenarioIndex].messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.isAI ? 'justify-start' : 'justify-end'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isAI 
                        ? 'bg-gray-100 text-gray-900' 
                        : 'bg-purple-500 text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 animate-fade-in-up">
          {features.map((feature) => (
            <div 
              key={feature.title} 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-purple-600 bg-purple-100 rounded-full p-2">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Simpify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;