import { SignInButton } from "@clerk/clerk-react";
import { Music } from "lucide-react";

const AuthenticateYourself = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center from-gray-900 to-blue-900">
      {/* Logo */}
      <div className="flex items-center space-x-3 mb-6">
        <Music size={40} className="text-blue-400" />
        <h1 className="text-4xl font-bold">
          Music <span className="text-blue-400">Streaming</span>
        </h1>
      </div>

      {/* Message */}
      <p className="text-lg text-gray-800 mb-8 text-center max-w-md">
        Welcome to <span className="text-blue-400 font-semibold">Music Streaming</span> 🎵 <br />
        Please authenticate yourself to continue.
      </p>

      {/* Clerk Sign In Button */}
      <SignInButton mode="modal">
        <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer rounded-xl text-lg font-semibold shadow-lg transition-all duration-300">
          Authenticate Yourself
        </button>
      </SignInButton>

      {/* Footer */}
      <p className="mt-6 text-sm text-gray-400">
        Secure login powered by <span className="text-black font-medium">Clerk</span>.
      </p>
    </div>
  );
};

export default AuthenticateYourself;
