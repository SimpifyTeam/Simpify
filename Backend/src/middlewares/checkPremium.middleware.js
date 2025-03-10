export const checkPremiumStatus = async (req, res, next) => {
  if (!req.session.user.isPremium) {
    return res
      .status(403)
      .json({ error: "You must be a premium user to access this feature" });
  }
  if (req.session.user.subscription.status !== "active") {
    return res.status(403).json({ error: "Your subscription is not active" });
  }
  next();
};
