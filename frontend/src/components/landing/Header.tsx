import logo from "../../assets/192x192.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
function Header() {
  const { session } = useAuth();
  const headerLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/#features" },
    { name: "FAQs", href: "/#faqs" },
  ];

  return (
    <header className="relative flex h-[80px] items-center justify-between p-4">
      <div className="flex shrink-0 items-center space-x-4">
        <img src={logo} alt="Logo" width={56} height={56} />
        <span className="text-xl font-medium">OOTDuck</span>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2">
        <ul className="m-0 flex list-none p-0">
          {headerLinks.map((link) => (
            <li key={link.name} className="mx-4 inline-block">
              <a href={link.href} className="text-gray-700 hover:text-gray-900">
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {session ? (
        <HeaderButton link="/home" text="Dashboard" />
      ) : (
        <HeaderButton link="/login" text="Sign in" />
      )}
    </header>
  );
}

function HeaderButton({ link, text }: { link: string; text: string }) {
  return (
    <Link to={link}>
      <Button
        className="cursor-pointer border-0 bg-amber-500 text-white hover:bg-amber-700 hover:text-white"
        variant="outline"
      >
        {text}
      </Button>
    </Link>
  );
}

export default Header;
