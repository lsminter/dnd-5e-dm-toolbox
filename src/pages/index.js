import Link from 'next/link';

export default function Home() {

  return (
    <div className="text-center">
      <h1 className="text-3xl text-center font-bold underline mb-6 mt-4">
        Welcome to 5e DM ToolBox!
      </h1>
      <h2 className="mb-10 font-bold">
        Listed below are the current tools I have. 
      </h2>
      <div className="space-y-10 grid grid-cols-1 sm:space-y-4 sm:grid-cols-2">
        <div className="items-center justify-center p-3">
          <div className="text-left font-bold">
            The character generator is a tool that allows you to quickly build your own DND character! You select the Race, Alignment, Class, and Gender and it will generate a name, character description, and character background for you. It will also generate an image of your character, all using AI.
          </div>
          <div className="sticky top-[100vh]">
            <Link href="/character-generator">
              <p
                className="block px-4 py-2 m-4 text-xs rounded-md bg-[#4b0082] text-[#f4e8c1] hover:bg-[#e86c19] hover:text-gray-900"
                role="menuitem"
              >
                Character Generator
              </p>
            </Link>
          </div>
        </div>
        <div className="text-center items-center p-3">
          <div className="text-left font-bold">
          The Loot Generator will help you to create simple loot to make dungeon rewards easy for your DM&apos;s. It currently only rolls on the Treasure Hoard table, but I plan to add more tables in the future.
          </div>
          <div className="items-end sticky top-[100vh]">
            <Link href="/npc-generator">
              <p
                className="block px-4 py-2 m-4 text-xs rounded-md bg-[#4b0082] text-[#f4e8c1] hover:bg-[#e86c19] hover:text-gray-900"
                role="menuitem"
              >
                NPC Generator
              </p>
            </Link>
          </div>
        </div>
        <div className="text-center items-center justify-center p-3">
          <div className="text-left font-bold">
          The NPC Generator will help you to create simple NPCs to enhance your story. Select from a list of Race, Gender, and Job and it will generate a name, character description, and character background for you using AI.
          </div>
          <div className="items-end sticky top-[100vh]">
            <Link href="/loot-generator">
              <p
                className="block px-4 py-2 m-4 text-xs rounded-md bg-[#4b0082] text-[#f4e8c1] hover:bg-[#e86c19] hover:text-gray-900"
                role="menuitem"
              >
            Loot Generator
            </p>
            </Link>
          </div>
        </div>
        <div className="text-center items-center justify-center p-3">
          <div className="text-left font-bold">
          The Random Encounter Generator allows you to select monsters from a list of monsters based on Combat Rating. You can then select the amount of each monster you want, click the Selected Monster Stats button, and it will display the stats for each monster you selected.
          </div>
          <div className="items-end sticky top-[100vh]">
            <Link href="/random-encounter">
              <p
                className="block px-4 py-2 m-4 text-xs rounded-md bg-[#4b0082] text-[#f4e8c1] hover:bg-[#e86c19] hover:text-gray-900"
                role="menuitem"
              >
                Random Encounter
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
