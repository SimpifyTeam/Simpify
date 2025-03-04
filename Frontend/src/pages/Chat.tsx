import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Upload,
  X,
  Moon,
  Sun,
  MessageSquare,
  Send,
  Plus,
  User,
  Sparkles,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Zap,
  Settings,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback} from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Types
interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  files?: File[];
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
      <Button
        onClick={() => onRemove(file)}
        variant="ghost"
        size="icon"
        className="absolute -top-1 -right-1 h-5 w-5 bg-gray-100 dark:bg-gray-700 rounded-full shadow-sm"
      >
        <X className="w-3 h-3 text-gray-500" />
      </Button>
    </div>
  );
};

// Message Component
const MessageItem: React.FC<{ message: Message }> = ({ message }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className={`py-4 px-3 md:px-6 flex ${
        message.role === "assistant" ? "justify-start" : "justify-end"
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="max-w-2xl mx-auto flex gap-3">
        {message.role === "assistant" && (
          <Avatar className="w-8 h-8 bg-purple-600">
            <AvatarFallback>
              <Sparkles className="w-4 h-4 text-white" />
            </AvatarFallback>
          </Avatar>
        )}
        <div className="flex-1">
          <div
            className={`prose dark:prose-invert max-w-none text-sm md:text-base ${
              message.role === "assistant"
                ? "bg-white dark:bg-gray-800"
                : "bg-purple-100 dark:bg-purple-900"
            } p-4 rounded-lg`}
          >
            {message.content}
          </div>

          {/* Display files if present */}
          {message.files && message.files.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {message.files.map((file, index) => (
                <FilePreview
                  key={index}
                  file={file}
                  onRemove={() => {}} // Read-only in messages
                />
              ))}
            </div>
          )}

          {showActions && (
            <div className="flex mt-3 space-x-1 items-center text-gray-500 animate-fadeIn">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Copy message</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <ThumbsUp className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Helpful</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <ThumbsDown className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Not helpful</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Regenerate response</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>
        {message.role === "user" && (
          <Avatar className="w-8 h-8 bg-gray-300 dark:bg-gray-700">
            <AvatarFallback>
              <User className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
};

// Main Component
const ChatPage: React.FC = () => {
  // Use localStorage for theme persistence
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme as "light" | "dark";

    // Check system preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }

    return "light";
  });

  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(!isMobile);
  const [selectedModel, setSelectedModel] = useState("Conversation Expert");
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
  const [currentChatId, setCurrentChatId] = useState<string>("2"); // Default to second conversation
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentChat =
    chatSessions.find((chat) => chat.id === currentChatId) || chatSessions[0];

  // Toggle theme
  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  }, [theme]);

  // Set theme class on document
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Check for mobile screen size
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarOpen]);

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

      // Add user message with files
      const userMessage: Message = {
        id: Date.now().toString(),
        content: message,
        role: "user",
        timestamp: new Date(),
        files: files.length > 0 ? [...files] : undefined,
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

      // Auto-close sidebar on mobile after sending message
      if (isMobile && sidebarOpen) {
        setSidebarOpen(false);
      }
    },
    [message, files, currentChatId, isMobile, sidebarOpen]
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

    // Auto-close sidebar on mobile after creating new chat
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const models = [
    "Conversation Expert",
    "Rizz Generator",
    "AI Chat",
    "Chat Analysis",
    "Dating Coach",
  ];

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Mobile Sidebar using Sheet from shadcn */}
        {isMobile ? (
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetContent side="left" className="p-0 w-64">
              <SidebarContent
                chatSessions={chatSessions}
                currentChatId={currentChatId}
                setCurrentChatId={setCurrentChatId}
                createNewChat={createNewChat}
                toggleTheme={toggleTheme}
                theme={theme}
                setSidebarOpen={setSidebarOpen}
                isMobile={isMobile}
              />
            </SheetContent>
          </Sheet>
        ) : (
          /* Desktop Sidebar */
          <aside
            className={`relative z-20 flex flex-col bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${
              sidebarOpen ? "w-64" : "w-16"
            }`}
          >
            <SidebarContent
              chatSessions={chatSessions}
              currentChatId={currentChatId}
              setCurrentChatId={setCurrentChatId}
              createNewChat={createNewChat}
              toggleTheme={toggleTheme}
              theme={theme}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              isMobile={isMobile}
            />
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
          {/* Top navbar */}
          <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between py-2 px-4">
            <div className="flex items-center gap-3">
              {/* Mobile menu button */}
              {isMobile && (
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <MessageSquare className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
              )}

              {/* Desktop sidebar toggle button */}
              {!isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <MessageSquare className="w-5 h-5" />
                </Button>
              )}
            </div>

            {/* Centered Logo */}
            <h1 className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Simpify
            </h1>

            {/* Model dropdown and theme toggle */}
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1 text-sm"
                  >
                    <span className="hidden md:inline-flex">
                      {selectedModel}
                    </span>
                    <Badge variant="outline" className="ml-1">
                      AI
                    </Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {models.map((model) => (
                    <DropdownMenuItem
                      key={model}
                      onClick={() => setSelectedModel(model)}
                      className={
                        selectedModel === model
                          ? "bg-gray-100 dark:bg-gray-700"
                          : ""
                      }
                    >
                      {model}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </Button>
            </div>
          </header>

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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <Card className="hover:bg-white dark:hover:bg-gray-800 transition-colors cursor-pointer">
                    <CardContent className="p-4 flex flex-col items-center">
                      <MessageSquare className="w-6 h-6 text-purple-600 mb-2" />
                      <span className="text-sm font-medium">
                        Practice Conversations
                      </span>
                    </CardContent>
                  </Card>
                  <Card className="hover:bg-white dark:hover:bg-gray-800 transition-colors cursor-pointer">
                    <CardContent className="p-4 flex flex-col items-center">
                      <Zap className="w-6 h-6 text-purple-600 mb-2" />
                      <span className="text-sm font-medium">Get Rizz Tips</span>
                    </CardContent>
                  </Card>
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
            <div className="max-w-2xl mx-auto">
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

              <form onSubmit={handleSubmit} className="flex relative">
                <div className="flex-1 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500">
                  <Textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e as any);
                      }
                    }}
                    placeholder="Message Simpify..."
                    className="min-h-10 max-h-[200px] w-full resize-none border-0 bg-transparent py-3 px-3 outline-none focus:ring-0 dark:text-white text-sm"
                  />

                  <div className="flex items-center border-t border-gray-200 dark:border-gray-600 px-3 py-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      accept="image/*,video/*,application/pdf"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 h-8 w-8"
                    >
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={!message.trim() && files.length === 0}
                  className="ml-2 flex-shrink-0 p-2 bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed self-end h-10 w-10"
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>

              <p className="text-xs text-center text-gray-500 mt-2">
                Simpify is an AI assistant that helps improve your
                conversations.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Extracted Sidebar Content Component
interface SidebarContentProps {
  chatSessions: ChatSession[];
  currentChatId: string;
  setCurrentChatId: (id: string) => void;
  createNewChat: () => void;
  toggleTheme: () => void;
  theme: "light" | "dark";
  sidebarOpen?: boolean;
  setSidebarOpen: (open: boolean) => void;
  isMobile: boolean;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  chatSessions,
  currentChatId,
  setCurrentChatId,
  createNewChat,
  toggleTheme,
  theme,
  sidebarOpen = true,
  setSidebarOpen,
  isMobile,
}) => {
  return (
    <>
      {/* Header with logo for mobile */}
      {isMobile && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Simpify
          </h2>
        </div>
      )}

      {/* New Chat Button */}
      <div className="p-3">
        <Button
          onClick={createNewChat}
          variant="outline"
          className="w-full justify-start gap-2"
        >
          <Plus className="w-4 h-4" />
          {sidebarOpen && <span>New conversation</span>}
        </Button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto py-2 px-3">
        <div className="space-y-1">
          {chatSessions.map((chat) => (
            <Button
              key={chat.id}
              variant={currentChatId === chat.id ? "secondary" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => {
                setCurrentChatId(chat.id);
                if (isMobile) setSidebarOpen(false);
              }}
            >
              <MessageSquare className="w-4 h-4 flex-shrink-0" />
              {sidebarOpen && <span className="truncate">{chat.title}</span>}
            </Button>
          ))}
        </div>
      </div>

      {/* User Section */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700">
        {sidebarOpen && (
          <div className="mb-2 pb-2 border-b border-gray-200 dark:border-gray-700 space-y-1">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={toggleTheme}
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
              <span>{theme === "light" ? "Dark mode" : "Light mode"}</span>
            </Button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8 bg-purple-100 dark:bg-purple-900">
            <AvatarFallback>
              <User className="w-4 h-4 text-purple-600 dark:text-purple-300" />
            </AvatarFallback>
          </Avatar>
          {sidebarOpen && (
            <div className="flex-1">
              <p className="text-sm font-medium">User Account</p>
              <Button
                variant="link"
                className="h-auto p-0 text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1"
              >
                <LogOut className="w-3 h-3" />
                Sign out
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatPage;
