import Link from 'next/link';
import { useUser } from '@supabase/auth-helpers-react'
import NavDropdown from './NavDropdown.js'
import Image from 'next/image'

const NavBar = () => {
  const user = useUser();
  return (
    <header className="bg-[#120002] w-full h-[144px] sm:h-[72px]">
      <div className="flex justify-between">
        <div className="block sm:flex align-middle">
          <div className="relative ml-4 mt-1 h-[70px] w-[70px] hover:cursor-pointer place-self-center">
            <Link href="/">
              <Image 
                alt="dmt logo" 
                src="/images/logos/white-logo.svg"
                layout="fill"
                objectFit="contain"
              />
            </Link>
          </div>
          <h3 className="place-self-center w-[144px] ml-4 text-lg text-white font-[dmt]">Dungeon Master Toolbox</h3>
        </div>
        <div className="flex flex-col-reverse place-self-center mr-4 sm:flex-row sm:space-x-4">
          <NavDropdown />
          <Link href={user ? "/logout" : "/login"}>
            <p className="text-center font-bold text-xl mb-4 sm:mb-0 text-white hover:text-[#00554B] sm:place-self-center">{user ? "Logout" : "Login"}</p>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavBar;