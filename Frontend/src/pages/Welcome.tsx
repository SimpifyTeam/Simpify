import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

interface OnboardingData {
  interests: string[];
  communicationStyle: string;
  goal: string;
  gender: string;
  age: string;
  location: string; 
}

const Welcome: React.FC = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(0);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    interests: [],
    communicationStyle: "",
    goal: "",
    gender: "",
    age: "",
    location: "",
  });

  const [message, setMessage] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const BACKEND_URL = "http://localhost:5000/api/v1/users";
  const callbackUrl = `${BACKEND_URL}/callback?code=${code}`;

  const interestOptions = [
    "Improving Conversations",
    "Building Confidence",
    "Professional Networking",
    "Dating & Relationships",
    "Making Friends",
    "Creative Writing",
    "Social Media Communication",
    "Public Speaking",
    "Conflict Resolution",
  ];

  const communicationStyles = [
    "Professional",
    "Casual",
    "Friendly",
    "Direct",
    "Persuasive",
  ];

  const genderOptions = ["Male", "Female", "Non-binary", "Prefer not to say"];

  const ageRangeOptions = [
    "14-17",
    "18-24",
    "25-34",
    "35-44",
    "45-54",
    "55-64",
    "65+",
    "Prefer not to say",
  ];

  const countryOptions = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "India",
    "Japan",
    "Brazil",
    "Other",
  ];

  useEffect(() => {
    if (!code) {
      navigate("/login");
    }
  }, [code, navigate]);

  const handleInterestToggle = (interest: string) => {
    setOnboardingData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleCommunicationStyleSelect = (style: string) => {
    setOnboardingData((prev) => ({ ...prev, communicationStyle: style }));
  };

  const handleGenderSelect = (gender: string) => {
    setOnboardingData((prev) => ({ ...prev, gender }));
  };

  const handleAgeSelect = (age: string) => {
    setOnboardingData((prev) => ({ ...prev, age }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOnboardingData((prev) => ({ ...prev, location: e.target.value }));
  };

  const handleGoalChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOnboardingData((prev) => ({ ...prev, goal: e.target.value }));
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      submitOnboarding();
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const submitOnboarding = async () => {
    setSubmitting(true);
    setMessage("Personalizing your Simpify experience...");

    try {
      await axios.get(callbackUrl, {
        params: {
          age: onboardingData.age,
          gender: onboardingData.gender,
          goal: onboardingData.goal,
          location: onboardingData.location,
        }
      });

      setTimeout(() => setMessage("Almost there!"), 1500);
      setTimeout(
        () => setMessage("Preparing your personalized chat assistant..."),
        3000
      );
      setTimeout(() => navigate("/chat"), 5000);
    } catch (error) {
      console.error("Error submitting onboarding data:", error);
      setMessage("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  const isNextDisabled = () => {
    switch (step) {
      case 0:
        return onboardingData.interests.length === 0;
      case 1:
        return !onboardingData.communicationStyle;
      case 2:
        return (
          !onboardingData.gender ||
          !onboardingData.age ||
          !onboardingData.location
        );
      case 3:
        return !onboardingData.goal.trim();
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">Welcome to Simpify!</h1>
        <p className="text-xl text-purple-200">
          Let's set up your personal chat assistant to help you communicate
          better.
        </p>
      </motion.div>

      {/* Progress indicator */}
      <div className="w-full max-w-md mx-auto mb-8">
        <div className="flex justify-between">
          {[0, 1, 2, 3].map((stepNumber) => (
            <motion.div
              key={stepNumber}
              initial={{ scale: 0.8 }}
              animate={{
                scale: step === stepNumber ? 1.2 : 1,
                backgroundColor:
                  step >= stepNumber
                    ? "rgb(124, 58, 237)" // Purple-600
                    : "rgba(99, 102, 241, 0.3)", // Indigo-500 with opacity
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white"
            >
              {step > stepNumber ? "✓" : stepNumber + 1}
            </motion.div>
          ))}
        </div>
        <div className="w-full h-2 bg-purple-800 bg-opacity-30 mt-4 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${(step / 3) * 100}%` }}
            className="h-full bg-purple-600"
          ></motion.div>
        </div>
      </div>

      {/* Content area */}
      {!submitting ? (
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-purple-800 bg-opacity-20 rounded-lg p-6 backdrop-blur-sm max-w-2xl mx-auto w-full"
        >
          {/* Step 1: Interests */}
          {step === 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">
                What do you need help with?
              </h2>
              <p className="mb-4 text-purple-200">
                Select the areas where you'd like Simpify to assist you.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {interestOptions.map((interest) => (
                  <motion.div
                    key={interest}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleInterestToggle(interest)}
                    className={`cursor-pointer p-3 rounded-lg text-center ${
                      onboardingData.interests.includes(interest)
                        ? "bg-purple-600"
                        : "bg-purple-700 bg-opacity-50 hover:bg-opacity-70"
                    }`}
                  >
                    <span className="text-white">{interest}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Communication Style */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">
                How do you want to communicate?
              </h2>
              <p className="mb-4 text-purple-200">
                Choose your preferred communication style.
              </p>
              <div className="space-y-3">
                {communicationStyles.map((style) => (
                  <motion.div
                    key={style}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCommunicationStyleSelect(style)}
                    className={`cursor-pointer p-4 rounded-lg ${
                      onboardingData.communicationStyle === style
                        ? "bg-purple-600"
                        : "bg-purple-700 bg-opacity-50 hover:bg-opacity-70"
                    }`}
                  >
                    <div className="font-medium text-white">{style}</div>
                    <div className="text-sm text-purple-200">
                      {style === "Professional" &&
                        "Formal, structured, and to-the-point responses"}
                      {style === "Casual" &&
                        "Friendly, conversational, and easy-going"}
                      {style === "Friendly" &&
                        "Warm, approachable, and empathetic"}
                      {style === "Direct" &&
                        "Clear, concise, and straight to the point"}
                      {style === "Persuasive" &&
                        "Convincing, logical, and impactful"}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Demographic Information */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Tell us a bit about yourself
              </h2>
              <p className="mb-4 text-purple-200">
                This helps us tailor Simpify to your needs.
              </p>

              {/* Gender Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Gender</h3>
                <div className="grid grid-cols-2 gap-3">
                  {genderOptions.map((gender) => (
                    <motion.div
                      key={gender}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleGenderSelect(gender)}
                      className={`cursor-pointer p-3 rounded-lg text-center ${
                        onboardingData.gender === gender
                          ? "bg-purple-600"
                          : "bg-purple-700 bg-opacity-50 hover:bg-opacity-70"
                      }`}
                    >
                      <span className="text-white">{gender}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Age Range Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Age Range</h3>
                <div className="grid grid-cols-2 gap-3">
                  {ageRangeOptions.map((age) => (
                    <motion.div
                      key={age}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAgeSelect(age)}
                      className={`cursor-pointer p-3 rounded-lg text-center ${
                        onboardingData.age === age
                          ? "bg-purple-600"
                          : "bg-purple-700 bg-opacity-50 hover:bg-opacity-70"
                      }`}
                    >
                      <span className="text-white">{age}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Location Input */}
              <div>
                <h3 className="text-lg font-medium mb-2">Location</h3>
                <select
                  value={onboardingData.location}
                  onChange={handleLocationChange}
                  className="w-full p-3 rounded-lg bg-purple-700 bg-opacity-50 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="" disabled className="text-purple-300">
                    Select your country
                  </option>
                  {countryOptions.map((country) => (
                    <option
                      key={country}
                      value={country}
                      className="text-white"
                    >
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 4: Main Goal */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">
                What's your main goal with Simpify?
              </h2>
              <p className="mb-4 text-purple-200">
                Tell us what you're hoping to achieve so we can help you get
                there.
              </p>
              <textarea
                value={onboardingData.goal}
                onChange={handleGoalChange}
                placeholder="I want to use Simpify to..."
                className="w-full p-3 rounded-lg bg-purple-700 bg-opacity-50 text-white placeholder-purple-300 min-h-32 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={step === 0}
              className={`px-6 py-2 rounded-lg ${
                step === 0
                  ? "bg-purple-700 bg-opacity-50 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              Back
            </button>
            <button
              onClick={nextStep}
              disabled={isNextDisabled()}
              className={`px-6 py-2 rounded-lg ${
                isNextDisabled()
                  ? "bg-purple-700 bg-opacity-50 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {step === 3 ? "Finish" : "Next"}
            </button>
          </div>
        </motion.div>
      ) : (
        // Submitting state with animation
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center max-w-lg mx-auto bg-purple-800 bg-opacity-20 p-8 rounded-lg backdrop-blur-sm"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mx-auto w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mb-6"
          ></motion.div>

          <motion.h2
            className="text-2xl font-bold mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            {message}
          </motion.h2>

          <p className="text-lg text-purple-200">
            Your personalized assistant will be ready in just a moment...
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Welcome;
