// App.jsx
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import AuthenticateYourself from "./Components/AuthenticateYourself";
import './App.css';
import HeroSection from "./Components/HeroSection";

function App() {
  return (
    <div className="bg-green-50 min-h-screen">
      {/* If logged in -> show app */}
      <SignedIn>
        <HeroSection />
      </SignedIn>

      {/* If not logged in -> redirect to sign in page */}
      <SignedOut>
        <AuthenticateYourself />
      </SignedOut>
    </div>
  );
}

export default App;
