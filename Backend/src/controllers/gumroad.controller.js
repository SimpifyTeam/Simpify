import User from "../models/user.model.js";
import crypto from "crypto";

const webhookHandler = async (req, res) => {
  const signature = req.get("X-Gumroad-Signature");
  const computedSignature = crypto
    .createHmac("sha256", process.env.GUMROAD_WEBHOOK_SECRET)
    .update(req.rawBody)
    .digest("hex");

  if (signature !== computedSignature) {
    return res.status(401).json({ message: "Invalid signature" });
  }

  const event = req.body;
  const userId = event.custom_fields.user_id;

  try {
    switch (event.event) {
      case "sale":
        await handleNewSubscription(event, userId);
        break;

      case "subscription_cancelled":
        await handleSubscriptionCancellation(event, userId);
        break;

      case "subscription_failed":
        await handleSubscriptionFailure(event, userId);
        break;
    }
    res.status(200).json({ message: "webhook received" });
  } catch (error) {
    console.error("webhook error", error);
    res.status(500).json({ error: "webhook error" });
  }
};

const handleNewSubscription = async (event, userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  user.isPremium = true;

  user.subscription = {
    planType: getPlanType(event.product_id),
    status: "active",
    startDate: new Date(event.sale_timestamp),
    endDate: calculateEndDate(event.product_id),
    gumroadSubscriptionId: event.subscription_id,
    gumroadProductId: event.product_id,
  };

  user.purchaseHistory.push({
    date: new Date(),
    amount: event.price,
    planType: getPlanType(event.product_id),
    gumroadSaleId: event.sale_id,
  });

  await user.save();
};

const getPlanType = (gumroadProductId) => {
  const planMap = {
    MONTHLY_PRO_ID: "monthly",
    ANNUAL_PRO_ID: "annual",
  };

  return planMap[gumroadProductId] || "unknown";
};

const calculateEndDate = (gumroadProductId) => {
  const planType = getPlanType(gumroadProductId);
  const date = new Date();

  if (planType === "monthly") {
    date.setMonth(date.getMonth() + 1);
  } else if (planType === "annual") {
    date.setFullYear(date.getFullYear() + 1);
  }

  return date;
};

const handleSubscriptionCancellation = async (event, userId) => {
  await User.findByIdAndUpdate(userId, {
    isPremium: false,
    subscription: {
      status: "cancelled",
      endDate: new Date(event.cancellation_date),
    },
  });
};

const handleSubscriptionFailure = async (event, userId) => {
  await User.findByIdAndUpdate(userId, {
    isPremium: false,
    subscription: {
      status: "failed",
      endDate: new Date(event.cancellation_date),
    },
  });
  //TODO: send notification to user
};

export { webhookHandler };
