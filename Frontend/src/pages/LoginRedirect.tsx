import { useEffect } from "react";

const LoginRedirect: React.FC = () => {
  useEffect(() => {
    // Redirect to the AuthKit login page
    window.location.href =
      "https://unforgettable-genius-14-staging.authkit.app/";
  }, []);

  return null;
};

export default LoginRedirect;
