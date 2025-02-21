import { useEffect } from "react";

const LoginRedirect: React.FC = () => {
  useEffect(() => {
    window.location.href =
      "https://unforgettable-genius-14-staging.authkit.app/";
  }, []);

  return null;
};

export default LoginRedirect;
