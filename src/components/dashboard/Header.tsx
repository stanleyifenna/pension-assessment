import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import storage from "../../constants/storage";
import { AlignLeft, X, User, Bell } from "lucide-react";


const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  //const firstName = JSON.parse(storage.fetch("userDetails")).firstName;

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    storage.clear();
    navigate("/login");
  };

  return (
    <>
      <div className="z-20 border-b top-0 border-[#D9D9D9] sticky w-full bg-[#F6F7F9] py-2">
        <div className="flex justify-between md:px-7 px-4">
          <div className="flex items-center">
            <p className="font-semibold xl:text-[32px] text-[24px] text-black pl-0 capitalize">
              DECA
            </p>
          </div>

          <div className="flex">
            <span className="flex items-center">
              <Bell size={20} />
              <div className="mx-1"></div>
            </span>

            {/* Profile Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center"
                aria-haspopup="true"
                aria-expanded={isOpen}
              >
                <span className="relative cursor-pointer flex items-center ml-1 py-[15px] px-[0px] text-black text-[12px] font-medium">
                  <User size={20} />
                  <p className="text-[16px] text-[#000000] ml-1">SEYI</p>
                </span>
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-4 w-56 bg-white divide-y divide-gray-100 rounded-lg shadow-sm md:w-64">
                  <div className="px-4 py-4 text-sm text-gray-900">
                    <div className="font-medium">michaelonyedika32@gmail.com</div>
                  </div>

                  <div className="py-0 cursor-pointer" onClick={handleLogout}>
                    <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Sign out
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

     
    </>
  );
};

export default Header;
