import logo from "../../assets/192x192.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Hamburger from "hamburger-react";
import type { Session } from "@supabase/supabase-js";

function Header() {
  const { session } = useAuth();
  const [isOpen, setOpen] = useState<boolean>(false);
  const headerLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/#features" },
    { name: "FAQs", href: "/#faqs" },
  ];

  return (
    <header className="relative flex h-[80px] items-center justify-between p-4">
      <div className="flex shrink-0 items-center sm:space-x-2 md:space-x-4">
        <img
          src={logo}
          alt="Logo"
          className="h-[48px] w-[48px] lg:h-[56px] lg:w-[56px]"
        />
        <span className="hidden text-lg font-medium text-gray-700 sm:block lg:text-xl">
          OOTDuck
        </span>
      </div>
      <div className="relative sm:hidden">
        <Hamburger toggled={isOpen} toggle={setOpen} />
        {isOpen && <Links headerLinks={headerLinks} session={session} />}
      </div>
      <LargerHeader headerLinks={headerLinks} session={session} />
    </header>
  );
}

function LargerHeader({
  headerLinks,
  session,
}: {
  headerLinks: { name: string; href: string }[];
  session: Session | null;
}) {
  return (
    <div className="hidden items-center sm:flex">
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
    </div>
  );
}

function Links({
  headerLinks,
  session,
}: {
  headerLinks: { name: string; href: string }[];
  session: Session | null;
}) {
  return (
    <ul className="absolute right-0 z-50 m-0 flex list-none flex-col items-center gap-2 bg-white p-4 shadow-lg">
      {headerLinks.map((link) => (
        <li key={link.name} className="mx-4 inline-block">
          <a href={link.href} className="text-gray-700 hover:text-gray-900">
            {link.name}
          </a>
        </li>
      ))}
      <li className="cursor-pointer">
        {session ? <Link to="/home">Dashboard</Link> : <Link to="/login">Sign in</Link>}
      </li>
    </ul>
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
