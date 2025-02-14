import { useState, useEffect } from "react";
import {
  Rocket,
  Mail,
  Check,
  MessageCircle,
  Heart,
  Zap,
  Sparkles,
  Copy,
  XCircle,
  Link,
  Share2,
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  isAI: boolean;
  timestamp?: Date;
}

interface ChatScenario {
  id: string;
  title: string;
  description: string;
  messages: Message[];
}

interface ReferralInfo {
  referralId: string;
  referralCount: number;
  createdAt?: Date;
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const copyReferralLink = async (referralId: string): Promise<boolean> => {
  try {
    const link = `${window.location.origin}?ref=${referralId}`;
    await navigator.clipboard.writeText(link);
    return true;
  } catch {
    return false;
  }
};

const features = [
  {
    id: "natural-flow",
    title: "Natural Flow",
    description: "Keep conversations engaging without overthinking",
    icon: <Zap className="w-6 h-6" />,
  },
  {
    id: "voice-enhanced",
    title: "Your Voice, Enhanced",
    description: "Suggestions that feel authentically you",
    icon: <Heart className="w-6 h-6" />,
  },
  {
    id: "always-ready",
    title: "Always Ready",
    description: "The perfect response when you need it most",
    icon: <MessageCircle className="w-6 h-6" />,
  },
];

const chatScenarios: ChatScenario[] = [
  {
    id: "flow",
    title: "Keep the Conversation Flowing",
    description: "Never run out of things to say",
    messages: [
      {
        id: "1",
        text: "How do I keep this chat going? They seem interesting!",
        isAI: false,
      },
      {
        id: "2",
        text: "Try asking about their recent festival photo - 'That looks like such a vibe! What was your favorite performance?'",
        isAI: true,
      },
      { id: "3", text: "Perfect! They're typing...", isAI: false },
      { id: "4", text: "Great! Now let's keep that energy going", isAI: true },
    ],
  },
  {
    id: "recovery",
    title: "Smooth Recovery",
    description: "Turn awkward moments into connections",
    messages: [
      { id: "1", text: "Help! My joke totally flopped 😅", isAI: false },
      {
        id: "2",
        text: "No worries! Try: 'Okay clearly I need to work on my comedy game. What's the best joke you've heard lately?'",
        isAI: true,
      },
      { id: "3", text: "That's actually perfect!", isAI: false },
      {
        id: "4",
        text: "You've got this! Keep it light and genuine",
        isAI: true,
      },
    ],
  },
];

const URL = "https://simpify-six.vercel.app/";

const Home = () => {
  const [referralInfo, setReferralInfo] = useState<ReferralInfo | null>(null);
  const [showCopied, setShowCopied] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  useEffect(() => {
    const loadReferralInfo = () => {
      const savedReferral = localStorage.getItem("SimpifyReferral");
      if (savedReferral) {
        try {
          setReferralInfo(JSON.parse(savedReferral));
        } catch {
          localStorage.removeItem("SimpifyReferral");
        }
      }
    };

    const handleReferralParam = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const referredBy = urlParams.get("ref");
      if (referredBy) {
        localStorage.setItem("referredBy", referredBy);
      }
    };

    loadReferralInfo();
    handleReferralParam();
  }, []);

  const generateReferralId = (): string => {
    try {
      const timestamp = Date.now().toString(36);
      const randomStr = crypto
        .getRandomValues(new Uint32Array(1))[0]
        .toString(36)
        .slice(0, 6);
      return `${timestamp}-${randomStr}`;
    } catch {
      return `${Date.now().toString(36)}-${Math.random()
        .toString(36)
        .substring(2, 8)}`;
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setEmailError(null);
    setSubmissionError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const referredBy = localStorage.getItem("referredBy") || "";
    const newReferralId = generateReferralId();

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    try {
      const location = window.location.href;
      console.log("Location: ", location);

      await fetch(
        "https://script.google.com/macros/s/AKfycbwi1E8YYebzgj_WBenxXijpKp9dOUiyneZL_dKPXwimCnZj8mCrhaMOiq69zv1sAOy7/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "no-cors",
          body: JSON.stringify({
            email,
            message,
            referralId: newReferralId,
            referredBy,
            location,
          }),
        }
      );

      const newReferralInfo: ReferralInfo = {
        referralId: newReferralId,
        referralCount: 0,
        createdAt: new Date(),
      };
      setReferralInfo(newReferralInfo);
      localStorage.setItem("SimpifyReferral", JSON.stringify(newReferralInfo));
    } catch {
      setSubmissionError("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyReferralLink = async () => {
    if (referralInfo) {
      const success = await copyReferralLink(referralInfo.referralId);
      if (success) {
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      }
    }
  };

  const handleShare = async () => {
    if (!referralInfo) return;

    const shareUrl = `${URL}?ref=${referralInfo.referralId}`;
    const shareData = {
      url: shareUrl,
      title: "Join Simpify",
      text: "Get early access to Simpify - Your AI Conversation Coach!",
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      }
    } catch {}
  };

  const SuccessMessage: React.FC = () => (
    <div className="text-center space-y-4 animate-fade-in">
      <div className="flex justify-center mb-4">
        <div className="relative">
          <Check className="w-16 h-16 text-green-500 bg-green-100 rounded-full p-4" />
          <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-lg">
            <Sparkles className="w-6 h-6 text-yellow-500" />
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-800">
        Welcome to the Squad! 🚀
      </h2>
      <p className="text-gray-600">
        You're now on the exclusive launch list. We'll send updates straight to
        your inbox!
      </p>

      <div className="mt-8 space-y-6">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Link className="w-5 h-5 text-purple-600" />
            Your Personal Referral Link
          </h3>
          <div className="relative">
            <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200">
              <input
                type="text"
                readOnly
                value={`${URL}?ref=${referralInfo?.referralId}`}
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm truncate"
              />
              <button
                onClick={handleCopyReferralLink}
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
        </div>

        <div className="flex items-center justify-center gap-4">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="text-gray-500 text-sm">share via</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `Join me on Simpify! Get early access here: ${URL}?ref=${referralInfo?.referralId}`
                )}`
              )
            }
            className="flex items-center justify-center gap-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
            Twitter
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            Share
          </button>
        </div>
        <p className="text-gray-600 mt-6">
          While you wait, why not{" "}
          <a
            href="https://discord.gg/3DKuKJJEkf"
            target="_blank"
            className="text-blue-500 font-semibold hover:underline"
          >
            join our Discord server
          </a>{" "}
          to connect with the community?
        </p>
      </div>
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
            {!referralInfo ? (
              <form onSubmit={handleFormSubmit} className="space-y-6">
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
                  {emailError && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg">
                      <XCircle className="w-5 h-5" />
                      <span>{emailError}</span>
                    </div>
                  )}
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
                  value={localStorage.getItem("referredBy") || ""}
                />

                {submissionError && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg">
                    <XCircle className="w-5 h-5" />
                    <span>{submissionError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 rounded-xl transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin w-6 h-6 border-4 border-white border-t-transparent rounded-full" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        Join the Waitlist
                        <Rocket className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </div>
                  {isSubmitting && (
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
                  )}
                </button>
              </form>
            ) : (
              <SuccessMessage />
            )}
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 animate-slide-in-right">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {chatScenarios[0].title}
              </h3>
              <p className="text-gray-600">
                {chatScenarios[0].description}
              </p>
            </div>
            <div className="space-y-4">
              {chatScenarios[0].messages.map(
                (message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.isAI ? "justify-start" : "justify-end"
                    } animate-fade-in-up`}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.isAI
                          ? "bg-gray-100 text-gray-900"
                          : "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {referralInfo && (
          <div className="fixed bottom-4 right-4 animate-slide-in-up">
            <div className="bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3">
              <button
                onClick={handleCopyReferralLink}
                className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                title="Copy referral link"
              >
                <Copy className="w-5 h-5" />
              </button>
              <div className="text-sm">
                <p className="font-medium text-gray-800">
                  Your Referrals: {referralInfo.referralCount}
                </p>
                <p className="text-gray-600 text-xs">
                  Share to unlock rewards!
                </p>
              </div>
            </div>
          </div>
        )}

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
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Transform Your Conversations?
          </h2>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Join the Waitlist
          </button>
        </div>
      </main>

      {referralInfo && (
        <div className="fixed bottom-4 right-4 animate-slide-in-up">
          <div className="bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3">
            <button
              onClick={handleShare}
              className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
              title="Share referral link"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <div className="text-sm">
              <p className="font-medium text-gray-800">Do a Referral</p>
              <p className="text-gray-600 text-xs">Share to unlock rewards!</p>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Simpify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;