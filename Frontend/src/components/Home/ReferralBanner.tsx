import React from "react";
import { Copy, } from "lucide-react";
import handleCopyReferralLink from "../../utils/handleCopyReferralLink";

interface ReferralBannerProps {
  referralInfo: any;
  setShowCopied: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReferralBanner = ({ referralInfo, setShowCopied }: ReferralBannerProps) => {
  return (
    <div className="fixed bottom-4 right-4 animate-slide-in-up">
      <div className="bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3">
        <button
          onClick={() => handleCopyReferralLink(referralInfo, setShowCopied)}
          className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
          title="Copy referral link"
        >
          <Copy className="w-5 h-5" />
        </button>
        <div className="text-sm">
          <p className="font-medium text-gray-800">
          Referrals
          </p>
          <p className="text-gray-600 text-xs">Share to unlock rewards!</p>
        </div>
      </div>
    </div>
  );
};

export default ReferralBanner;