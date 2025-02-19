import { UI_TEXT } from "../../const/homeConstant";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p>{UI_TEXT.FOOTER.COPYRIGHT}</p>
      </div>
    </footer>
  );
};

export default Footer;