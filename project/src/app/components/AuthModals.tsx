import { useState } from "react";
import { Modal } from "./Modal";
import { Input } from "./Input";
import { Button } from "./Button";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

interface AuthModalsProps {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  onCloseLogin: () => void;
  onCloseRegister: () => void;
  onSwitchToRegister: () => void;
  onSwitchToLogin: () => void;
  onLogin: (email: string, password: string) => void;
  onRegister: (name: string, email: string, password: string) => void;
}

export function AuthModals({
  isLoginOpen,
  isRegisterOpen,
  onCloseLogin,
  onCloseRegister,
  onSwitchToRegister,
  onSwitchToLogin,
  onLogin,
  onRegister,
}: AuthModalsProps) {
  return (
    <>
      <LoginModal
        isOpen={isLoginOpen}
        onClose={onCloseLogin}
        onSwitchToRegister={onSwitchToRegister}
        onLogin={onLogin}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={onCloseRegister}
        onSwitchToLogin={onSwitchToLogin}
        onRegister={onRegister}
      />
    </>
  );
}

function LoginModal({
  isOpen,
  onClose,
  onSwitchToRegister,
  onLogin,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
  onLogin: (email: string, password: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Welcome Back">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm">Email</label>
          <Input
            type="email"
            icon={<Mail className="w-5 h-5" />}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm">Password</label>
            <button
              type="button"
              className="text-sm text-[var(--primary)] hover:underline"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              icon={<Lock className="w-5 h-5" />}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]"
          />
          <label htmlFor="remember" className="text-sm cursor-pointer">
            Remember me
          </label>
        </div>

        <Button type="submit" fullWidth>
          Sign In
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--border)]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-[var(--card)] text-[var(--muted)]">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-[var(--border)] rounded-[var(--radius-button)] hover:border-[var(--primary)] transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-[var(--border)] rounded-[var(--radius-button)] hover:border-[var(--primary)] transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            Apple
          </button>
        </div>

        <p className="text-center text-sm text-[var(--muted)]">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => {
              onClose();
              onSwitchToRegister();
            }}
            className="text-[var(--primary)] hover:underline font-medium"
          >
            Sign up
          </button>
        </p>
      </form>
    </Modal>
  );
}

function RegisterModal({
  isOpen,
  onClose,
  onSwitchToLogin,
  onRegister,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  onRegister: (name: string, email: string, password: string) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const getPasswordStrength = () => {
    if (password.length === 0) return { label: "", color: "" };
    if (password.length < 6) return { label: "Weak", color: "bg-red-500" };
    if (password.length < 10) return { label: "Medium", color: "bg-yellow-500" };
    return { label: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }
    onRegister(name, email, password);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Account">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-2 text-sm">Full Name</label>
          <Input
            type="text"
            icon={<User className="w-5 h-5" />}
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm">Email</label>
          <Input
            type="email"
            icon={<Mail className="w-5 h-5" />}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm">Password</label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              icon={<Lock className="w-5 h-5" />}
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {password && (
            <div className="mt-2">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${passwordStrength.color}`}
                    style={{
                      width: password.length < 6 ? "33%" : password.length < 10 ? "66%" : "100%",
                    }}
                  />
                </div>
                <span className="text-xs text-[var(--muted)]">{passwordStrength.label}</span>
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm">Confirm Password</label>
          <Input
            type="password"
            icon={<Lock className="w-5 h-5" />}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {confirmPassword && password !== confirmPassword && (
            <p className="text-sm text-red-500 mt-1">Passwords don't match</p>
          )}
        </div>

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="terms"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            className="w-4 h-4 mt-1 rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]"
          />
          <label htmlFor="terms" className="text-sm cursor-pointer">
            I agree to the{" "}
            <a href="#" className="text-[var(--primary)] hover:underline">
              Terms and Conditions
            </a>{" "}
            and{" "}
            <a href="#" className="text-[var(--primary)] hover:underline">
              Privacy Policy
            </a>
          </label>
        </div>

        <Button type="submit" fullWidth>
          Create Account
        </Button>

        <p className="text-center text-sm text-[var(--muted)]">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => {
              onClose();
              onSwitchToLogin();
            }}
            className="text-[var(--primary)] hover:underline font-medium"
          >
            Sign in
          </button>
        </p>
      </form>
    </Modal>
  );
}
