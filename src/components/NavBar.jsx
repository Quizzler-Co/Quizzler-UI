import { Brain } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "./ui-components/Button";
import SearchBar from "./ui-components/SearchBar";

const NavBar = () => {
  //navigation links - data for routing
  const navigationLinks = [
    { href: "#quizzes", label: "Quizzes" },
    { href: "#categories", label: "Categories" },
    { href: "#leaderboard", label: "Leaderboard" },
    { href: "#about", label: "About" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-5">
        <div className=" flex h-14 items-center">
          <div className="mr-4 flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Quizzler</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-1 items-center justify-center">
          </div>
          <div className="flex items-center space-x-4">
            <SearchBar />
            <Button text="Sign In" />
            <Button text="Sign Up" />
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;
