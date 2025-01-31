import { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import {
  Rocket,
  Mail,
  Check,
  MessageCircle,
  Heart,
  Zap,
  Sparkles,
  Copy
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

interface ReferralInfo {
  referralId: string;
  referralCount: number;
}

const Home = () => {
  const [state, handleSubmit] = useForm("xzzddpbo");
  const [isHovered, setIsHovered] = useState(false);
  const [referralInfo, setReferralInfo] = useState<ReferralInfo | null>(null);
  const [showCopied, setShowCopied] = useState(false);
  const activeScenarioIndex = 0
  
  const features = [
    {
      title: "Natural Flow",
      description: "Keep conversations engaging without overthinking",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Your Voice, Enhanced",
      description: "Suggestions that feel authentically you",
      icon: <Heart className="w-6 h-6" />
    },
    {
      title: "Always Ready",
      description: "The perfect response when you need it most",
      icon: <MessageCircle className="w-6 h-6" />
    }
  ];

  const chatScenarios: ChatScenario[] = [
    {
      title: "Keep the Conversation Flowing",
      description: "Never run out of things to say",
      messages: [
        { text: "How do I keep this chat going? They seem interesting!", isAI: false },
        { text: "Try asking about their recent festival photo - 'That looks like such a vibe! What was your favorite performance?'", isAI: true },
        { text: "Perfect! They're typing...", isAI: false },
        { text: "Great! Now let's keep that energy going", isAI: true }
      ]
    },
    {
      title: "Smooth Recovery",
      description: "Turn awkward moments into connections",
      messages: [
        { text: "Help! My joke totally flopped 😅", isAI: false },
        { text: "No worries! Try: 'Okay clearly I need to work on my comedy game. What's the best joke you've heard lately?'", isAI: true },
        { text: "That's actually perfect!", isAI: false },
        { text: "You've got this! Keep it light and genuine", isAI: true }
      ]
    }
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const referredBy = urlParams.get('ref');
    if (referredBy) {
      localStorage.setItem('referredBy', referredBy);
    }
  }, []);

  const generateReferralId = () => {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${randomStr}`;
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newReferralId = generateReferralId();
    const referredBy = localStorage.getItem('referredBy');

    // Create a submission object instead of FormData
    const submission = {
      email: (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value,
      message: (e.currentTarget.elements.namedItem('message') as HTMLTextAreaElement).value,
      referralId: newReferralId,
      referredBy: referredBy || ''
    };

    try {
      await handleSubmit(submission);
      console.log(referralInfo)
      setReferralInfo({
        referralId: newReferralId,
        referralCount: 0
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const copyReferralLink = () => {
    if (referralInfo) {
      const referralLink = `${window.location.origin}?ref=${referralInfo.referralId}`;
      navigator.clipboard.writeText(referralLink);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  const SuccessMessage = () => (
    <div className="text-center space-y-4">
      <div className="flex justify-center mb-4">
        <Check className="w-16 h-16 text-green-500 bg-green-100 rounded-full p-4" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800">You're on the List!</h2>
      <p className="text-gray-600">
        We'll send you an exclusive invite when Simpify launches.
      </p>

      {referralInfo && (
        <div className="mt-6 space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Share with Friends</h3>
          <p className="text-gray-600">
            Get priority access by inviting others!
          </p>

          <div className="relative">
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <input
                type="text"
                readOnly
                value={`${window.location.origin}?ref=${referralInfo.referralId}`}
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm"
              />
              <button
                onClick={copyReferralLink}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                {showCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Referrals: {referralInfo.referralCount}
            </p>
          </div>
        </div>
      )}

      <p className="text-gray-600 mt-6">
        While you wait, why not <a href="https://discord.gg/aBfj2ByU"
          className="text-blue-500 font-semibold hover:underline">join our Discord server</a> to connect with the community?
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <main className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Simpify
            </span>
          </h1>
          <p className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-6">
            Talk smarter. Connect better.
          </p>
          <div className="flex items-center justify-center gap-2 text-xl text-gray-600">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <span>Your AI Conversation Coach</span>
            <Sparkles className="w-5 h-5 text-blue-500" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 animate-slide-in-left">
            {!state.succeeded ? (
              <form onSubmit={handleFormSubmit} className="space-y-6" method="POST">
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

                <input
                  type="hidden"
                  name="referredBy"
                  value={localStorage.getItem('referredBy') || ''}
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
                          className={`w-5 h-5 transition-transform ${isHovered ? 'translate-x-1' : ''}`}
                        />
                      </>
                    )}
                  </div>
                </button>
              </form>
            ) : (
              <SuccessMessage/>
            )}
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 animate-slide-in-right">
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
                  className={`flex ${message.isAI ? 'justify-start' : 'justify-end'} animate-fade-in-up`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${message.isAI
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                      }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
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

        <div className="text-center bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Transform Your Conversations?</h2>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Join the Waitlist
          </button>
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