import ootduck from "../assets/OOTDUCK.COM.png";

function Footer() {
  const headerLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/#features" },
    { name: "FAQs", href: "/#faqs" },
    { name: "Privacy Policy", href: "/privacy-policy" },
  ];

  return (
    <div className="relative h-[50vh]">
      <div className="flex items-center justify-between p-8">
        <p className="text-white">&copy; 2025 OOTDUCK.</p>
        <ul className="flex items-center justify-end gap-8">
          {headerLinks.map((link, index) => (
            <li key={index}>
              <a
                className="text-lg font-medium text-white hover:underline lg:text-xl xl:text-2xl"
                href={link.href}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute bottom-0 left-0 w-full p-8 text-center">
        <img src={ootduck} loading="lazy" />
      </div>
    </div>
  );
}

export default Footer;
