import React from "react";
import { SIMPIFY_URL } from "../const/constants";

interface ShareProps {
  referralId: string;
  setShowCopied: React.Dispatch<React.SetStateAction<boolean>>;
}
const handleShare = async ({ referralId, setShowCopied }: ShareProps) => {
  if (!referralId) return;

  const shareUrl = `${SIMPIFY_URL}?ref=${referralId}`;
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
  } catch {
    setShowCopied(false);
  }
};
export default handleShare;
