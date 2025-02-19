import React from "react";
import copyReferralLink from "./copyReferralLink";

const handleCopyReferralLink = async (
  referralInfo: { referralId: string },
  setShowCopied: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (referralInfo) {
    const success = await copyReferralLink(referralInfo.referralId);
    if (success) {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  }
};

export default handleCopyReferralLink;
