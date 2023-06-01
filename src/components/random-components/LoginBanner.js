import Link from 'next/link';
import { useUser } from '@supabase/auth-helpers-react'
import NavDropdown from './NavDropdown.js'
import Image from 'next/image'

const LoginBanner = () => {
  const user = useUser();

  if(user){
    return null
  } else {
    return (
      <header className="max-w-sm justify-self-center">
        <Link href={user ? "/logout" : "/login"}>
          <p className="text-center font-bold text-xl mb-4 sm:mb-0 hover:text-[#00554B] sm:place-self-center">{user ? "Login or Create a free account!" : "Login or Create a free account!"}</p>
        </Link>
      </header>
    );
  }
};

export default LoginBanner;