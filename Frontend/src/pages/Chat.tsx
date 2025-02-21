import React, { useState, useCallback } from "react";
import {
  Upload,
  X,
  Moon,
  Sun,
  Menu,
  MessageSquare,
  FileText,
  Image,
  Film,
} from "lucide-react";

// Define types for file preview props
interface FilePreviewProps {
  file: File;
  onRemove: (file: File) => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ file, onRemove }) => {
  const [preview, setPreview] = useState<string>("");

  React.useEffect(() => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, [file]);

  return (
    <div className="relative group">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:scale-105 hover:shadow-lg transition-transform">
        <div className="p-3">
          <div className="flex items-center gap-3">
            {file.type.startsWith("image/") ? (
              <img
                src={preview}
                alt={file.name}
                className="w-20 h-20 object-cover rounded"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                {file.type.includes("pdf") ? (
                  <FileText className="w-8 h-8 text-purple-500" />
                ) : file.type.includes("video") ? (
                  <Film className="w-8 h-8 text-purple-500" />
                ) : (
                  <Image className="w-8 h-8 text-purple-500" />
                )}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={() => onRemove(file)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <X className="w-4 h-4 text-gray-500 hover:text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatPage: React.FC<ChatPageProps> = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [activeMode, setActiveMode] = useState<string>("chat-analysis");

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
      // Handle message and files submission
      console.log("Submitting:", { message, files });
    },
    [message, files]
  );

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 text-white shadow-lg">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold">Simpify</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </nav>

        <div className="flex pt-14">
          {/* Sidebar */}
          {sidebarOpen && (
            <aside className="w-64 fixed left-0 top-14 bottom-0 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-4">Chat History</h2>
                <div className="space-y-2">
                  {[1, 2, 3].map((chat) => (
                    <button
                      key={chat}
                      className="w-full p-2 flex items-center gap-2 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 text-purple-500" />
                      <span>Chat {chat}</span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          )}

          {/* Main Content */}
          <main
            className={`flex-1 ${
              sidebarOpen ? "ml-64" : ""
            } flex flex-col min-h-screen`}
          >
            {/* Mode Switcher */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {[
                  "chat-analysis",
                  "rizz-lines",
                  "conversation-continuing",
                  "ai-chat-help",
                ].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setActiveMode(mode)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                      activeMode === mode
                        ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md"
                        : "bg-gray-100 dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    {mode.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Chat messages */}
            </div>

            {/* File Preview Area */}
            {files.length > 0 && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {files.map((file, index) => (
                    <FilePreview
                      key={index}
                      file={file}
                      onRemove={removeFile}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <form
              onSubmit={handleSubmit}
              className="p-4 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
                <label className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <Upload className="w-5 h-5 text-purple-500" />
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    accept="image/*,video/*,application/pdf"
                  />
                </label>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all"
                >
                  Humanize
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
