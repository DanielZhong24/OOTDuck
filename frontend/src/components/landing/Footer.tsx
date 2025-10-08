import ootduck from "../../assets/OOTDUCK.COM.png";

function Footer() {
  const headerLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/#features" },
    { name: "FAQs", href: "/#faqs" },
    { name: "Privacy Policy", href: "/privacy-policy" },
  ];

  return (
    <div className="relative h-[35vh] sm:h-[50vh]">
      <div className="flex flex-col items-center justify-between px-4 py-8 sm:flex-row sm:p-8">
        <p className="mb-2 text-xs text-white sm:mb-0 sm:text-sm">&copy; 2025 OOTDUCK.</p>
        <ul className="flex justify-end gap-4 sm:items-center sm:gap-8">
          {headerLinks.map((link, index) => (
            <li key={index}>
              <a
                className="text-sm font-medium text-white hover:underline sm:text-base md:text-lg lg:text-xl xl:text-2xl"
                href={link.href}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute bottom-0 left-0 w-full p-4 text-center sm:p-8">
        <img src={ootduck} loading="lazy" />
      </div>
    </div>
  );
}

export default Footer;
