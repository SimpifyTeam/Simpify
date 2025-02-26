import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Upload,
  X,
  Moon,
  Sun,
  Menu,
  MessageSquare,
  Send,
  Plus,
  User,
  Sparkles,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Copy,
  MoreHorizontal,
  ChevronDown,
  Zap,
  Settings,
  LogOut,
} from "lucide-react";

// Types
interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  createdAt: Date;
  messages: Message[];
}

interface FilePreviewProps {
  file: File;
  onRemove: (file: File) => void;
}

// File Preview Component
const FilePreview: React.FC<FilePreviewProps> = ({ file, onRemove }) => {
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, [file]);

  return (
    <div className="relative group flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-md p-2 max-w-[120px]">
      <div className="w-8 h-8 flex items-center justify-center overflow-hidden rounded">
        {file.type.startsWith("image/") ? (
          <img
            src={preview}
            alt={file.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-purple-500" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium truncate max-w-[60px]">{file.name}</p>
      </div>
      <button
        onClick={() => onRemove(file)}
        className="absolute -top-1 -right-1 bg-gray-100 dark:bg-gray-700 rounded-full p-[2px] shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      >
        <X className="w-3 h-3 text-gray-500" />
      </button>
    </div>
  );
};

// Message Component
const MessageItem: React.FC<{ message: Message }> = ({ message }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className={`py-6 px-4 md:px-8 lg:px-12 ${
        message.role === "assistant"
          ? "bg-white dark:bg-gray-800"
          : "bg-gray-50 dark:bg-gray-900"
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="max-w-3xl mx-auto flex gap-4">
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full overflow-hidden flex items-center justify-center ${
            message.role === "assistant"
              ? "bg-purple-600"
              : "bg-gray-300 dark:bg-gray-700"
          }`}
        >
          {message.role === "assistant" ? (
            <Sparkles className="w-4 h-4 text-white" />
          ) : (
            <User className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          )}
        </div>
        <div className="flex-1">
          <div className="prose dark:prose-invert max-w-none">
            {message.content}
          </div>

          {showActions && (
            <div className="flex mt-4 space-x-2 items-center text-gray-500 animate-fadeIn">
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                <Copy className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                <ThumbsUp className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                <ThumbsDown className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Models dropdown component
const ModelsDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("Conversation Expert");

  const models = [
    "Conversation Expert",
    "Rizz Master",
    "Small Talk Pro",
    "Dating Coach",
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <span className="text-sm font-medium">{selectedModel}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-fadeIn">
          {models.map((model) => (
            <button
              key={model}
              onClick={() => {
                setSelectedModel(model);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                selectedModel === model ? "bg-gray-100 dark:bg-gray-700" : ""
              }`}
            >
              {model}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Main Component
const ChatPage: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: "1",
      title: "How to start conversations",
      createdAt: new Date(),
      messages: [
        {
          id: "1",
          role: "user",
          content:
            "How do I start a conversation with someone I'm interested in?",
          timestamp: new Date(),
        },
        {
          id: "2",
          role: "assistant",
          content:
            "Starting a conversation with someone you're interested in can feel intimidating, but it doesn't have to be! The key is to be genuine and find common ground. Try noticing something about them or the environment you're both in and comment on it naturally. For example, if you're at a coffee shop, you might say something like, \"That drink looks interesting, what is it?\" or \"I love the atmosphere here, do you come often?\" Questions that invite more than a yes/no answer tend to work best.",
          timestamp: new Date(),
        },
      ],
    },
    {
      id: "2",
      title: "Conversation flow tips",
      createdAt: new Date(),
      messages: [],
    },
  ]);
  const [currentChatId, setCurrentChatId] = useState<string>("1");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentChat =
    chatSessions.find((chat) => chat.id === currentChatId) || chatSessions[0];

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat?.messages]);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const newFiles = Array.from(e.target.files);
        setFiles((prev) => [...prev, ...newFiles]);
      }
    },
    []
  );

  const removeFile = useCallback((fileToRemove: File) => {
    setFiles((prev) => prev.filter((file) => file !== fileToRemove));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!message.trim() && files.length === 0) return;

      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        content: message,
        role: "user",
        timestamp: new Date(),
      };

      // Simulate assistant response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "As a conversation enhancement AI, I've analyzed your message and have some suggestions for improving engagement. Try asking open-ended questions that invite the other person to share more about themselves. This creates a balanced dialogue and shows genuine interest in their perspective.",
        role: "assistant",
        timestamp: new Date(),
      };

      // Update chat session
      setChatSessions((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: [...chat.messages, userMessage, assistantMessage],
              }
            : chat
        )
      );

      // Clear input
      setMessage("");
      setFiles([]);
    },
    [message, files, currentChatId]
  );

  const createNewChat = () => {
    const newChat: ChatSession = {
      id: (chatSessions.length + 1).toString(),
      title: "New conversation",
      createdAt: new Date(),
      messages: [],
    };

    setChatSessions((prev) => [...prev, newChat]);
    setCurrentChatId(newChat.id);
  };

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Sidebar */}
        <aside
          className={`fixed md:relative inset-y-0 left-0 z-20 flex flex-col bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${
            sidebarOpen ? "w-64" : "w-0 md:w-16 overflow-hidden"
          }`}
        >
          {/* New Chat Button */}
          <button
            onClick={createNewChat}
            className="mx-3 mt-3 mb-1 flex items-center gap-3 rounded-md border border-gray-200 dark:border-gray-600 py-2 px-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            {sidebarOpen && <span>New conversation</span>}
          </button>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto py-2 px-3">
            <div className="space-y-1">
              {chatSessions.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setCurrentChatId(chat.id)}
                  className={`w-full flex items-center gap-3 rounded-md py-2 px-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    currentChatId === chat.id
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }`}
                >
                  <MessageSquare className="w-4 h-4 flex-shrink-0" />
                  {sidebarOpen && (
                    <span className="truncate">{chat.title}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* User Section */}
          <div className="flex flex-col p-3 border-t border-gray-200 dark:border-gray-700">
            {sidebarOpen && (
              <>
                <div className="mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">
                  <button className="w-full flex items-center gap-3 rounded-md py-2 px-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                </div>
              </>
            )}

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <User className="w-4 h-4 text-purple-600 dark:text-purple-300" />
              </div>
              {sidebarOpen && (
                <div className="flex-1">
                  <p className="text-sm font-medium">User Account</p>
                  <button className="text-xs text-gray-500 flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-300">
                    <LogOut className="w-3 h-3" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
          {/* Top navbar */}
          <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between py-2 px-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Mobile logo - visible on small screens */}
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent md:hidden">
                ConvoAI
              </h1>

              {/* Model selector - desktop */}
              <div className="hidden md:block">
                <ModelsDropdown />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>
            </div>
          </header>

          {/* Model selector - mobile */}
          <div className="md:hidden border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <ModelsDropdown />
          </div>

          {/* Welcome Screen */}
          {currentChat.messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
              <div className="max-w-md text-center">
                <div className="inline-flex mb-6 p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  Elevate Your Conversations
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Get personalized feedback, suggestions, and practice to
                  improve your communication skills.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors">
                    <MessageSquare className="w-6 h-6 text-purple-600 mb-2" />
                    <span className="text-sm font-medium">
                      Practice Conversations
                    </span>
                  </button>
                  <button className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors">
                    <Zap className="w-6 h-6 text-purple-600 mb-2" />
                    <span className="text-sm font-medium">Get Rizz Tips</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto" id="chat-messages">
              {currentChat.messages.map((msg) => (
                <MessageItem key={msg.id} message={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
              {/* File Preview */}
              {files.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-2">
                  {files.map((file, index) => (
                    <FilePreview
                      key={index}
                      file={file}
                      onRemove={removeFile}
                    />
                  ))}
                </div>
              )}

              <div className="flex relative">
                <div className="flex-1 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500">
                  <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                    rows={1}
                    placeholder="Ask how to improve your conversation skills..."
                    className="w-full resize-none border-0 bg-transparent py-3 px-3 outline-none focus:ring-0 dark:text-white text-sm md:text-base"
                  />

                  <div className="flex items-center border-t border-gray-200 dark:border-gray-600 px-3 py-2">
                    <label className="cursor-pointer text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                      <Upload className="w-5 h-5" />
                      <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        accept="image/*,video/*,application/pdf"
                      />
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!message.trim() && files.length === 0}
                  className="ml-2 flex-shrink-0 p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed self-end"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-center text-gray-500 mt-2">
                ConvoAI may produce inaccurate information about people, places,
                or facts.
              </p>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatPage;

// Add these to your global CSS file
/*
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}
*/
