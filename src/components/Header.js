import Link from 'next/link';
import HeaderDropdown from './random-components/HeaderDropdown.js'

const Header = () => {
  return (
    <header className="bg-gray-900 text-white py-4 px-8 flex justify-between">
      <Link href="/">
        <p className="text-l font-bold text-xl hover:text-blue-500">Home</p>
      </Link>
      <h1 className="text-2xl font-bold">5e DM ToolBox</h1>
      <HeaderDropdown />
    </header>
  );
};

export default Header;