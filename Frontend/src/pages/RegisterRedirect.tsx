import { useEffect } from "react";

const SignupRedirect: React.FC = () => {
  useEffect(() => {
    // Redirect to the AuthKit sign-up page
    window.location.href =
      "https://unforgettable-genius-14-staging.authkit.app/sign-up";
  }, []);

  return null;
};

export default SignupRedirect;
