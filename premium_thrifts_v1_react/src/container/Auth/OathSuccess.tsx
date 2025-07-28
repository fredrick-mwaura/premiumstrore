import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function OAuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("token", token);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      toast.success("Logged in with Google!");
      
      navigate("/pofile");
    } else {
      toast.error("Google login failed.");
      navigate("/signin");
    }
  }, []);

  return <p>Logging in...</p>;
}