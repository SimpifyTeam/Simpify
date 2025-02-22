import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import dotenv from "dotenv";

// Define types for the user data
interface User {
  firstName: string;
  lastName: string;
}

const Welcome: React.FC = () => {
  dotenv.config()
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const BACKEND_URL = "http://localhost:5000/";
  const url = `${BACKEND_URL}/callback?code=`

  useEffect(() => {

    const fetchData = async () => {
      if (!code) {
        navigate("/login"); 
        return;
      }




      try {
        const res = await axios.get<{ user: User }>(`${url} ${code}`);
        setUser(res.data.user);




        setTimeout(() => setMessage("Getting ready for your first chat..."), 2000);
        setTimeout(() => navigate("/chat"), 5000); // Redirect after 5 seconds




      } catch {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [code, navigate]);
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 to-purple-800 text-white px-4 sm:px-8 md:px-16 lg:px-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
        className="text-center"
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-2 tracking-wide">
          Welcome to Simpify!
        </h1>
        <p className="text-lg sm:text-xl mb-4">
          Your ultimate chat assistant is here!
        </p>

        {loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="mt-6 w-12 h-12 border-4 border-white border-t-transparent rounded-full"
          ></motion.div>
        ) : (
          user && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="mt-4 text-center"
            >
              <p className="text-lg sm:text-xl">Hey, {user.firstName}!</p>
              <p className="mt-2 text-sm sm:text-base italic">
                Your chat experience is about to get a major upgrade...
              </p>
              <p className="mt-4 text-xl sm:text-2xl font-semibold">
                {message}
              </p>
              <p className="mt-2 text-md">
                Your first conversation is just a click away. Get ready to chat
                like never before!
              </p>
            </motion.div>
          )
        )}
      </motion.div>
    </div>
  );
};

export default Welcome;
