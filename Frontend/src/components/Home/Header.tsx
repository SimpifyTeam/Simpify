import { Sparkles } from "lucide-react";
import { UI_TEXT } from "../../const/homeConstant";

const Header = () => {
  return (
    <div className="text-center mb-16 animate-fade-in">
      <h1 className="text-6xl font-bold text-gray-900 mb-6">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          {UI_TEXT.HEADER.TITLE}
        </span>
      </h1>
      <p className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-6">
        {UI_TEXT.HEADER.SUBTITLE}
      </p>
      <div className="flex items-center justify-center gap-2 text-xl text-gray-600">
        <Sparkles className="w-5 h-5 text-purple-500" />
        <span>{UI_TEXT.HEADER.TAGLINE}</span>
        <Sparkles className="w-5 h-5 text-blue-500" />
      </div>
    </div>
  );
};

export default Header;