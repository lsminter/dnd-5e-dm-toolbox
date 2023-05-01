import Link from 'next/link';

export default function Home() {

  return (
    <div className="text-center">
      <h1 className="text-3xl text-center font-bold underline mb-6">
        Welcome to 5e DM ToolBox!
      </h1>
      <h2>
        Listed below are the current tools I have. 
      </h2>
      <Link href="/character-generator">
        <p
          className="block px-4 py-2 text-xs rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
        >
          Character Generator
        </p>
      </Link>
      <Link href="/npc-generator">
        <p
          className="block px-4 py-2 text-xs rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
        >
          NPC Generator
        </p>
      </Link>
      <Link href="/loot-generator">
        <p
          className="block px-4 py-2 text-xs rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
        >
          Loot Generator
        </p>
      </Link>
      <Link href="/random-encounter">
        <p
          className="block px-4 py-2 text-xs rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
        >
          Random Encounter
        </p>
      </Link>
    </div>
  )
}
