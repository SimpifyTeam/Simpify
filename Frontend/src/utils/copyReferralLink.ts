const copyReferralLink = async (referralId: string): Promise<boolean> => {
  try {
    const link = `${window.location.origin}?ref=${referralId}`;
    await navigator.clipboard.writeText(link);
    return true;
  } catch {
    return false;
  }
};

export default copyReferralLink;
