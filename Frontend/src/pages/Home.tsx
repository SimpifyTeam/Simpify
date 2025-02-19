import { useState, useEffect } from "react";
import Header from '.././components/Home/Header'
import Form from ".././components/Home/Form";
import SuccessMessage from "../components/Home/SuccessMessage";
import ChatScenario from "../components/Home/ChatScenario";
import FeatureCard from ".././components/Home/FeaturesCard";
import ReferralBanner from ".././components/Home/ReferralBanner";
import Footer from ".././components/Home/Footer";
import { UI_TEXT } from "../const/homeConstant";

const Home = () => {
  const [referralInfo, setReferralInfo] = useState<any>(null);
  const [showCopied, setShowCopied] = useState(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <main className="container mx-auto px-4 py-16 max-w-6xl">
        <Header />
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 animate-slide-in-left">
            {!referralInfo ? (
              <Form
                setReferralInfo={setReferralInfo}
                setIsSubmitting={setIsSubmitting}
                setEmailError={setEmailError}
                setSubmissionError={setSubmissionError}
                isSubmitting={isSubmitting}
                emailError={emailError}
                submissionError={submissionError}
              />
            ) : (
              <SuccessMessage
                referralInfo={referralInfo}
                setShowCopied={setShowCopied}
                showCopied={showCopied}
              />
            )}
          </div>
          <ChatScenario />
        </div>

        {referralInfo && (
          <ReferralBanner
            referralInfo={referralInfo}
            setShowCopied={setShowCopied}
          />
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {UI_TEXT.FEATURES.map((feature, index) => (
            <FeatureCard key={feature.TITLE} feature={feature} index={index} />
          ))}
        </div>

        <div className="text-center bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {UI_TEXT.CALLOUT.READY_TO_TRANSFORM}
          </h2>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            {UI_TEXT.FORM.SUBMIT_BUTTON}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;