import { Rocket, Mail, XCircle } from "lucide-react";
import { UI_TEXT } from "../../const/homeConstant";
import generateReferralId from "../../utils/generateReferralID";
import validateEmail from "../../utils/validateEmail";

interface FormProps {
  setReferralInfo: (info: any) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setEmailError: (error: string | null) => void;
  setSubmissionError: (error: string | null) => void;
  isSubmitting: boolean;
  emailError: string | null;
  submissionError: string | null;
}

const Form = ({
  setReferralInfo,
  setIsSubmitting,
  setEmailError,
  setSubmissionError,
  isSubmitting,
  emailError,
  submissionError,
}: FormProps) => {
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
      setEmailError(UI_TEXT.FORM.EMAIL_ERROR);
      setIsSubmitting(false);
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
      };

      const response = await fetch(
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
            location: JSON.stringify(location),
          }),
        }
      );

      if (response.ok) {
        throw new Error("Failed to submit form");
      }

      const newReferralInfo = {
        referralId: newReferralId,
        referralCount: 0,
        createdAt: new Date(),
      };
      setReferralInfo(newReferralInfo);
      localStorage.setItem("SimpifyReferral", JSON.stringify(newReferralInfo));
    } catch (error) {
      console.error("Error:", error);
      setSubmissionError(UI_TEXT.FORM.SUBMISSION_ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <div className="relative group">
        <input
          id="email"
          type="email"
          name="email"
          placeholder={UI_TEXT.FORM.EMAIL_PLACEHOLDER}
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
        placeholder={UI_TEXT.FORM.MESSAGE_PLACEHOLDER}
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
              <span>{UI_TEXT.FORM.SUBMITTING}</span>
            </>
          ) : (
            <>
              {UI_TEXT.FORM.SUBMIT_BUTTON}
              <Rocket className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </div>
        {isSubmitting && (
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
        )}
      </button>
    </form>
  );
};

export default Form;