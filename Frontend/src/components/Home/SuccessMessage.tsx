import React from "react";
import { Check, Sparkles, Link, Share2, Copy } from "lucide-react";
import { UI_TEXT, DISCORD_LINK_URL } from "../../const/homeConstant";
import handleShare from "../../utils/handleShareReferralLink";
import handleCopyReferralLink from "../../utils/handleCopyReferralLink";

interface SuccessMessageProps {
  referralInfo: {
    referralId: string;
    referralCount: number;
  };
  setShowCopied: React.Dispatch<React.SetStateAction<boolean>>;
  showCopied: boolean;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ referralInfo, setShowCopied, showCopied}) => {
  const URL = window.location.origin;

  return (
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
        {UI_TEXT.SUCCESS.TITLE}
      </h2>
      <p className="text-gray-600">{UI_TEXT.SUCCESS.MESSAGE}</p>

      <div className="mt-8 space-y-6">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Link className="w-5 h-5 text-purple-600" />
            {UI_TEXT.SUCCESS.REFERRAL_LABEL}
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
                onClick={() =>
                  handleCopyReferralLink(referralInfo, setShowCopied)
                }
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                {showCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    {UI_TEXT.SUCCESS.COPIED}
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    {UI_TEXT.SUCCESS.COPY_BUTTON}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="text-gray-500 text-sm">
            {UI_TEXT.SUCCESS.SHARE_VIA}
          </span>
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
            onClick={() =>
              handleShare({
                referralId: referralInfo.referralId,
                setShowCopied,
              })
            }
            className="flex items-center justify-center gap-2 p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            Share
          </button>
        </div>
        <p className="text-gray-600 mt-6">
          {UI_TEXT.SUCCESS.DISCORD_INVITE}{" "}
          <a
            href={DISCORD_LINK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 font-semibold hover:underline"
          >
            {UI_TEXT.SUCCESS.DISCORD_LINK}
          </a>
        </p>
      </div>
    </div>
  );
};

export default SuccessMessage;
