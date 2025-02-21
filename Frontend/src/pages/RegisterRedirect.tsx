import { useEffect } from "react";

const SignupRedirect: React.FC = () => {
  useEffect(() => {
    window.location.href =
      "https://unforgettable-genius-14-staging.authkit.app/sign-up";
  }, []);

  return null;
};

export default SignupRedirect;
