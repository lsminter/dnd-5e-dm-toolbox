import {useState} from 'react';
import rollTable from '../components/loot-generator/loot-functions.js'


export default function Home() {
  const [loot, setLoot] = useState("")

  const rollingTableLoot = () => {
    const selectedLootTable = document?.getElementById("lootTable")?.value;
    setLoot(rollTable(selectedLootTable))
  }

  const handleLoot = () => {
    setLoot("");
    rollingTableLoot();
  }

  const lootArray = loot.split(', ')
  
  // 0-4, 5-10, 11-16, >17

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl text-center font-bold underline my-4">
        Loot Generator
      </h1>
      <div>
        <h2 className="text-3xl">Treasure Hoard Challenge (Individual Loot Table to come)</h2>
          <div className="relative inline-block my-4 text-lg">
            Loot Table: 
          <select 
            id="lootTable"
            className="ml-2 border border-gray-400 bg-gray-400 rounded-md">
            <option 
              id='0-4'
              key='0-4'
              value='2'
            >
              0-4
            </option>
            <option 
              id='5-10'
              key='5-10'
              value='6'
            >
              5-10
            </option>
            <option 
              id='11-16'
              key='11-16'
              value='13'
            >
              11-16
            </option>
            <option 
              id='17+'
              key='17+'
              value='17'
            >
              17+
            </option>
          </select>
        </div>
        <button
          className="mx-2 px-2 border border-gray-400 bg-gray-400 rounded-md" 
          onClick={handleLoot}
        >
          Roll Items
        </button>
      </div>
      <div className="flex flex-col">
        {lootArray.map((item, i) => {
          return(
            <p key={i} className="text-lg text-gray-200 pr-2">{item}</p>
          )
        })}
      </div>
    </div>
  )
}
