'use client';

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import logo from "@/assets/images/logo-white.png";
import profileDefault from "@/assets/images/profile.png";
import NotificationCount from "./notificationCount";

const Navbar = () => {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setMobileMenu] = useState(false);
  const [profileButton, setProfileOpen] = useState(false);
  const [providers, setProviders] = useState(null);
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('All');
  
  const profileImage = session?.user?.image;
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setAuthProviders();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (location === '' && propertyType === 'All') {
      router.push('/properties');
    } else {
      const query = `?location=${encodeURIComponent(location)}&propertyType=${encodeURIComponent(propertyType)}`;
      router.push(`/properties/search-results${query}`);
    }
  };

  return (
    <nav className="bg-blue-700 border-b border-blue-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button
              type="button"
              id="mobile-dropdown-button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setMobileMenu((prev) => !prev)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <Link className="flex flex-shrink-0 items-center" href="/">
              <Image className="h-10 w-auto" src={logo} alt="PropertyPulse" />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                LeaseLink
              </span>
            </Link>
            <div className="hidden md:ml-6 md:block">
              <div className="flex space-x-2">
                <Link
                  href="/"
                  className={`${
                    pathname === "/" ? "bg-black" : ""
                  } text-white hover:bg-blue-800 hover:text-white rounded-md text-md font-semibold px-5 py-2 transition duration-200`}
                >
                  Home
                </Link>
                <Link
                  href="/properties"
                  className={`${
                    pathname === "/properties" ? "bg-black" : ""
                  } text-white hover:bg-blue-800 hover:text-white rounded-md text-md font-semibold px-5 py-2 transition duration-200`}
                >
                  Properties
                </Link>
                {session && (
                  <Link
                    href="/properties/add"
                    className={`${
                      pathname === "/properties/add" ? "bg-black" : ""
                    } text-white hover:bg-blue-800 hover:text-white rounded-md text-md font-semibold px-5 py-2 transition duration-200`}
                  >
                    Add Property
                  </Link>
                )}
              </div>
            </div>
          </div>

          {pathname !== "/" && pathname !== "/profile" && pathname !== "/properties/add" && (
            <div className="hidden md:flex md:items-center md:ml-6">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center space-x-2 w-full max-w-md"
              >
                <div className="flex-1">
                  <label htmlFor="location" className="sr-only">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    placeholder="Enter Keywords"
                    className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-md transition duration-200 transform hover:scale-[1.02]"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="w-32">
                  <label htmlFor="property-type" className="sr-only">
                    Property Type
                  </label>
                  <select
                    id="property-type"
                    className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-md transition duration-200 transform hover:scale-[1.02]"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Studio">Studio</option>
                    <option value="Condo">Condo</option>
                    <option value="House">House</option>
                    <option value="Cabin Or Cottage">Cabin or Cottage</option>
                    <option value="Loft">Loft</option>
                    <option value="Room">Room</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-md transition duration-200 transform hover:scale-[1.02]"
                >
                  Search
                </button>
              </form>
            </div>
          )}

          {!session && (
            <div className="hidden md:flex md:items-center md:ml-4">
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-lg px-4 py-2 text-sm font-medium transition duration-200"
                  >
                    <FaGoogle className="text-white mr-2" />
                    <span>Login or Register</span>
                  </button>
                ))}
            </div>
          )}

          {session && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-4 md:pr-0">
              <Link href="/messages" className="relative group">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-200"
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">View notifications</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                </button>
             <NotificationCount />
              </Link>

              <div className="relative ml-3">
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-200"
                  id="user-menu-button"
                  aria-expanded={profileButton}
                  aria-haspopup="true"
                  onClick={() => setProfileOpen((prev) => !prev)}
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <Image
                    className="h-8 w-8 rounded-full"
                    src={profileImage || profileDefault}
                    width={40}
                    height={40}
                    alt=""
                  />
                </button>

                {profileButton && (
                  <div
                    id="user-menu"
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <Link
                      href="/profile"
                      className={`${
                        pathname === "/profile" ? "bg-gray-100" : ""
                      } block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-200`}
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-0"
                      onClick={() => setProfileOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="/properties/saved"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-200"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-1"
                      onClick={() => setProfileOpen(false)}
                    >
                      Saved Properties
                    </Link>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        signOut();
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-200"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-blue-700">
          <div className="space-y-2 px-2 pb-3 pt-2">
            {pathname !== "/" && pathname !== "/profile" && pathname !== "/properties/add" && (
              <form
                onSubmit={handleSearchSubmit}
                className="flex flex-col space-y-3 px-3 py-3 bg-blue-800 rounded-lg"
              >
                <div>
                  <label htmlFor="mobile-location" className="sr-only">
                    Location
                  </label>
                  <input
                    type="text"
                    id="mobile-location"
                    placeholder="Enter Keywords"
                    className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-md transition duration-200"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="mobile-property-type" className="sr-only">
                    Property Type
                  </label>
                  <select
                    id="mobile-property-type"
                    className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-md transition duration-200"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Studio">Studio</option>
                    <option value="Condo">Condo</option>
                    <option value="House">House</option>
                    <option value="Cabin Or Cottage">Cabin or Cottage</option>
                    <option value="Loft">Loft</option>
                    <option value="Room">Room</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                >
                  Search
                </button>
              </form>
            )}
            <Link
              href="/"
              className={`${
                pathname === "/" ? "bg-blue-800" : ""
              } text-white block rounded-lg px-4 py-2 text-base font-medium hover:bg-blue-800 transition duration-200`}
            >
              Home
            </Link>
            <Link
              href="/properties"
              className={`${
                pathname === "/properties" ? "bg-blue-800" : ""
              } text-white block rounded-lg px-4 py-2 text-base font-medium hover:bg-blue-800 transition duration-200`}
            >
              Properties
            </Link>
            {session && (
              <Link
                href="/properties/add"
                className={`${
                  pathname === "/properties/add" ? "bg-blue-800" : ""
                } text-white block rounded-lg px-4 py-2 text-base font-medium hover:bg-blue-800 transition duration-200`}
              >
                Add Property
              </Link>
            )}
            {!session && (
              <div className="px-3 py-2">
                {providers &&
                  Object.values(providers).map((provider) => (
                    <button
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                      className="flex items-center text-white bg-gray-700 hover:bg-gray-900 rounded-lg px-4 py-2 text-sm font-medium w-full transition duration-200"
                    >
                      <FaGoogle className="mr-2 text-white" />
                      <span>Login or Register</span>
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;