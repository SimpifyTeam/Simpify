
// HomePage UI Constants

/**

 * Contains all text content for the homepage UI
 */





const createHeaderText = () => ({
  TITLE: "Simpify",
  SUBTITLE: "Talk smarter. Connect better.",
  TAGLINE: "Your AI Conversation Coach",
});

/**
 * Form related text content including placeholders and error messages
 */
const createFormText = () => ({
  EMAIL_PLACEHOLDER: "Enter your email",
  MESSAGE_PLACEHOLDER: "Why are you excited about Simpify? (Optional)",
  SUBMIT_BUTTON: "Join the Waitlist",
  SUBMITTING: "Submitting...",
  EMAIL_ERROR: "Please enter a valid email address",
  SUBMISSION_ERROR: "Failed to submit form. Please try again.",
});

/**
 * Success state text content including referral and social sharing options
 */
const createSuccessText = () => ({
  TITLE: "Welcome to the Squad! 🚀",
  MESSAGE: "You're now on the exclusive launch list. We'll send updates straight to your inbox!",
  REFERRAL_LABEL: "Your Personal Referral Link",
  COPY_BUTTON: "Copy",
  COPIED: "Copied!",
  SHARE_VIA: "share via",
  DISCORD_INVITE: "While you wait, why not join our Discord server to connect with the community?",
  DISCORD_LINK: "join our Discord Server",
});

/**
 * Product features list with titles and descriptions
 */
const createFeaturesList = () => ([
  {
    TITLE: "Natural Flow",
    DESCRIPTION: "Keep conversations engaging without overthinking",
  },







  {
    TITLE: "Your Voice, Enhanced",
    DESCRIPTION: "Suggestions that feel authentically you",
  },











  {
    TITLE: "Always Ready",
    DESCRIPTION: "The perfect response when you need it most",
  },




































]);

/**
 * Chat scenario examples showing product use cases
 */
const createChatScenarios = () => [
  {
    TITLE: "Keep the Conversation Flowing",
    DESCRIPTION: "Never run out of things to say",
    MESSAGES: [
      "How do I keep this chat going? They seem interesting!",
      "Try asking about their recent festival photo - 'That looks like such a vibe! What was your favorite performance?'",
      "Perfect! They're typing...",
      "Great! Now let's keep that energy going",
    ],
  },
  {
    TITLE: "Smooth Recovery",
    DESCRIPTION: "Turn awkward moments into connections",
    MESSAGES: [
      "Help! My joke totally flopped 😅",
      "No worries! Try: 'Okay clearly I need to work on my comedy game. What's the best joke you've heard lately?'",
      "That's actually perfect!",
      "You've got this! Keep it light and genuine",
    ],
  },
  {
    TITLE: "Breaking the Ice",
    DESCRIPTION: "Start conversations with confidence",
    MESSAGES: [
      "I don't know how to start a conversation with them...",
      "Try this: 'Hey! I noticed we both love hiking. Have you been on any great trails recently?'",
      "They replied! They're recommending a trail!",
      "Awesome! Now you have a topic to bond over.",
    ],
  },
  {
    TITLE: "Deepening Connections",
    DESCRIPTION: "Move beyond small talk",
    MESSAGES: [
      "We've been chatting for a while, but it's all surface-level...",
      "Ask something meaningful: 'What's something you're really passionate about right now?'",
      "They're opening up about their passion for photography!",
      "Now you're building a deeper connection!",
    ],
  },
  {
    TITLE: "Handling Tough Questions",
    DESCRIPTION: "Respond gracefully to sensitive topics",
    MESSAGES: [
      "They just asked me about my salary... What do I say?",
      "Try: 'I prefer to keep that private, but I'm happy to talk about my career journey if you're interested!'",
      "They respected that and changed the topic!",
      "Well handled! You set boundaries while staying polite.",
    ],
  },
  {
    TITLE: "Flirty and Fun",
    DESCRIPTION: "Add a playful tone to your chats",
    MESSAGES: [
      "I want to flirt but don't want to come off too strong...",
      "Try something light: 'If you were a vegetable, you'd be a cute-cumber!'",
      "They laughed and sent a flirty response back!",
      "Now you're both having fun! Keep the vibe playful.",
    ],
  },
  {
    TITLE: "Professional Networking",
    DESCRIPTION: "Make a great impression in work chats",
    MESSAGES: [
      "I need to message someone for a potential job opportunity...",
      "Start with: 'Hi [Name], I came across your profile and was really impressed by your work on [Project]. Would love to connect and learn more!'",
      "They responded positively!",
      "Great start! Now you're building a professional connection.",
    ],
  },
  {
    TITLE: "Resolving Misunderstandings",
    DESCRIPTION: "Clarify and move forward",
    MESSAGES: [
      "I think they misunderstood what I said...",
      "Clarify gently: 'I realize my last message might have come off the wrong way. What I meant was...'",
      "They appreciated the clarification!",
      "Now the conversation is back on track!",
    ],
  },
];

/**
 * Creates the main UI text configuration object
 */
const createUIText = () => ({
  HEADER: createHeaderText(),
  FORM: createFormText(),
  SUCCESS: createSuccessText(),
  FEATURES: createFeaturesList(),
  CHAT_SCENARIOS: createChatScenarios(),
  CALLOUT: {
    READY_TO_TRANSFORM: "Ready to Transform your conversations?",
  },
  FOOTER: {
    COPYRIGHT: `© ${new Date().getFullYear()} Simpify. All rights reserved.`,
  },

});

const UI_TEXT = createUIText();
const DISCORD_LINK_URL = "https://discord.gg/3DKuKJJEkf";

export { UI_TEXT, DISCORD_LINK_URL };
