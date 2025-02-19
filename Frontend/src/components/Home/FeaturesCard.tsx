import { ZapIcon, Heart, MessageCircle } from "lucide-react";

const ICONS = [ZapIcon, Heart, MessageCircle];

const FeatureCard = ({ feature, index }: { feature: any; index: number }) => {
  const ICON = ICONS[index];
  return (
    <div
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="text-purple-600 bg-purple-100 rounded-full p-2">
          <ICON />
        </div>
        <h3 className="font-semibold text-gray-900">{feature.TITLE}</h3>
      </div>
      <p className="text-gray-600">{feature.DESCRIPTION}</p>
    </div>
  );
};

export default FeatureCard;