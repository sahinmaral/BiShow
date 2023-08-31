import { FC } from "react";
import NavbarProfileSection from "./NavbarProfileSection";
import NavbarMenuLinks from "./NavbarMenuLinks";

const Navbar: FC = () => {
  return (
    <nav className="flex justify-between sm:items-center p-4 border-b border-gray-200">
      <div className="flex gap-3">
        <img src="/vite.svg" className="h-10" alt="Brand" />
        <span className="text-2xl font-bold whitespace-nowrap group">
          <span className="text-cornflower-blue-700 group-hover:pointer-events-none">
            Bi
          </span>
          <span className="group-hover:pointer-events-none">Show</span>
        </span>
      </div>

      <div className="flex sm:flex-row flex-row-reverse sm:gap-10 gap-5 items-center">
        <NavbarMenuLinks />
        <NavbarProfileSection />
      </div>
    </nav>
  );
};

export default Navbar;
