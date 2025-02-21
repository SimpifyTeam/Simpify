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

export default generateReferralId;