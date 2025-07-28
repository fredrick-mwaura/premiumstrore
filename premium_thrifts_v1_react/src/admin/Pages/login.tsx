import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { useToast } from "@/components/ui/use-toast";
import { Mail, Lock } from "lucide-react";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //use token based authentication

  // const [rememberMe, setRememberMe] = useState(false); 
  // const { toast } = useToast();

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warning('Please fill in all fields!')
      return;
    }
    toast.success('Login successful')
    return navigate('/admin')
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-3">
      <div className="w-full max-w-md bg-background border rounded-lg shadow-xl p-8 animate-fadeIn">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-neutral mt-2">Enter your credentials to explore</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-neutral" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10"
                autoComplete="false"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-neutral" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>          

          <Button type="submit" className="w-full bg-purple-400 hover:bg-secondary-hover">
            Sign In
          </Button>

          <div className="text-center text-sm text-neutral">
            <Link
              to="/admin/forgot-password"
              className="text-sm text-secondary hover:text-secondary-hover transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;