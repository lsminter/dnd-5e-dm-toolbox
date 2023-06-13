import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { InfinitySpin } from 'react-loader-spinner'

export default function EncounterPage(props) {
  const [challengeRating, setChallengeRating] = useState('');
  const [allMonsters, setAllMonsters] = useState([]); 
  const [monsters, setMonsters] = useState([]);
  const [selectedMonsters, setSelectedMonsters] = useState([]);
  const [showMonsterData, setShowMonsterData] = useState(false);
  const [monsterStats, setMonsterStats] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllMonsters = async (url, fetchedMonsters = new Set()) => {
    try {
      const response = await axios.get(url);
      const { results, next } = response.data; 

      results.forEach((monster) => {
        fetchedMonsters.add(monster);
      });

      if (next) {
        setLoading(true);
        return fetchAllMonsters(next, fetchedMonsters);
      } else {
        setLoading(false);
        return Array.from(fetchedMonsters);
      }  
    } catch (error) {
      console.error('Error fetching monsters:', error.message);
    }
  };

  const fetchMonsters = async () => {
    const url = `https://api.open5e.com/monsters?cr=${challengeRating}`;
    console.log(url)
    const newFetchedMonsters = await fetchAllMonsters(url);

    const updatedAllMonsters = [
      ...allMonsters,
      ...newFetchedMonsters
    ];
    setAllMonsters(updatedAllMonsters);

    const uniqueMonsterNames = newFetchedMonsters
    setMonsters(uniqueMonsterNames);
  };
  
  const handleMonsterStats = () => {
    const stats = selectedMonsters.reduce((acc, name) => {
      const monster = allMonsters.find((monster) => {
        return monster.name === name;
      });
      if(monster) {
        acc.push(monster);
      }
      return acc;
    }, []);
    setMonsterStats(stats);
  };

  const addMonster = (monsterName) => {
    setSelectedMonsters([...selectedMonsters, monsterName]);
  };
  
  const removeMonster = (indexToRemove) => {
    setSelectedMonsters(selectedMonsters.filter((_, index) => index !== indexToRemove));
  };

  const toggleMonsterData = (index) => {
    setShowMonsterData(!showMonsterData);
    handleMonsterStats();
  };

  const handleResetSelectedMonsters = () => {
    setSelectedMonsters([]);
    setMonsters([]);
    setAllMonsters([]);
  };

  return (
    <div className="min-h-screen">
      <div className="grid justify-items-center md:grid-cols-2 my-4 md:mt-10 md:space-x-4">
        <div className="space-y-4 p-4 max-w-[572px]">
          <h1 className="md:text-3xl text-4xl leading-none tracking-normal text-center sm:text-left font-[dmt]">
            Quick Build an Encounter
          </h1>
          <p>
            This tool allows you to quickly build an encounter by selecting the monster&apos;s challenge rating and then selecting monsters from the list. After you&apos;ve selected your monsters, you can view their stats and then reset the list to start over.
          </p>
          <div className="hidden md:grid grid-col-2 space-x-8 space-y-8">
            <div className='flex space-x-8'>
              <div className="flex">
                <p>
                  Combat Rating 
                </p>
                <input
                  type="number"
                  value={challengeRating}
                  onChange={(e) => setChallengeRating(e.target.value)}
                  placeholder="CR"
                  className="w-10 pl-1 mx-3 bg-white text-black rounded-md"
                />
              </div>
              <button className="px-2 w-1/2 h-8 border bg-defaultButton rounded-md hover:bg-gray-500" onClick={fetchMonsters}>Fetch Monsters</button>
            </div>
            <div className="flex justify-between">
              <button className="px-2 border bg-defaultButton rounded-md hover:bg-gray-500" onClick={toggleMonsterData}>{
                showMonsterData ? 'Hide Monster Stats' : 'Show Monster Stats'}
              </button>
              <button className="px-2 border bg-defaultButton rounded-md hover:bg-gray-500" onClick={handleResetSelectedMonsters}>Reset Selected Monsters</button>
            </div>
          </div>
        </div>
        <div className="flex max-w-[572px] justify-items-center p-2">
          <Image 
            src="/images/tool-page-images/encounter.png" 
            alt="home page image" 
            width={722}
            height={432}
            className="rounded-md"
          />
        </div>
      </div>

      <div className="md:hidden grid grid-col-1 space-x-4 space-y-4 mb-8">
        <div className='flex space-x-4 p-4'>
          <div className="flex">
            <p>
              Combat Rating 
            </p>
            <input
              type="number"
              value={challengeRating}
              onChange={(e) => setChallengeRating(e.target.value)}
              placeholder="CR"
              className="w-10 pl-1 mx-3 bg-white text-black rounded-md"
            />
          </div>
          <button className="px-2 w-1/2 h-8 border bg-defaultButton rounded-md hover:bg-gray-500" onClick={fetchMonsters}>Fetch Monsters</button>
        </div>
        <div className="flex justify-between pr-4">
          <button className="px-2 border bg-defaultButton rounded-md hover:bg-gray-500" onClick={toggleMonsterData}>{
            showMonsterData ? 'Hide Monster Stats' : 'Show Monster Stats'}
          </button>
          <button className="px-2 border bg-defaultButton rounded-md hover:bg-gray-500" onClick={handleResetSelectedMonsters}>Reset Selected Monsters</button>
        </div>
      </div>

      

      {!showMonsterData && (
        <>
          <div className="grid grid-cols-3">
            <div className='col-span-2'>
              <h3 className="text-center text-2xl font-bold">Monsters</h3>
              {loading ? (
                <div className="grid justify-items-center">
                  <InfinitySpin 
                    width='200'
                    color="#00008B"
                  />
                </div>
              ) : (
                <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {monsters.map((monsterName, index) => (
                  <li key={index} className="hover:bg-gray-500 bg-defaultButton rounded-md h-[64px] m-2 p-2 text-center" onClick={() => addMonster(monsterName.name)}>
                    {monsterName.name}
                  </li>
                ))}
              </ul>
              )}             
            </div>
            <div className='col-start-3'>
              <h3 className="text-center text-2xl font-bold">Selected Monsters</h3>
              <ul className="space-y-2">
                {selectedMonsters.map((monsterName, index) => (
                  <li key={index} className='text-sm text-center bg-defaultButton rounded-md mt-2 hover:bg-gray-500' onClick={() => removeMonster(index)}>{monsterName}</li>
                ))}
              </ul>
            </div>
          </div> 
        </>
      )}

      {showMonsterData && (
        <div className="p-2 space-y-2">
          <h3 className="text-center text-4xl font-bold">Monster Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 p-2 gap-2">
          {monsterStats.map((monster, index) => (
            <div key={index} className="grid grid-cols-2 p-2 bg-defaultButton rounded-md">
              <div className="pb-2 space-y-2">
                <div>
                  <p className="text-2xl">{monster.name}</p>
                    <h2 className="flex space-x-2">
                      <div>
                        <p className="text-sm">Total HP:</p>
                        <p>{monster.hit_points}</p>
                      </div>
                      <div>
                        <p className="text-sm">Damage Taken:</p> 
                        <input placeholder={monster.hit_points} className="w-16 mx-2 p-1 bg-[#FF8793] text-black rounded-md text-sm" type="number" />
                      </div>
                    </h2>
                  </div>
                  <p>
                    Type: {monster.type}
                  </p>
                  <p>
                    Alignment: {monster.alignment}
                  </p>
                  <p>
                    Languages: {monster.languages}
                  </p>
                  <p>
                    Armor Class: {monster.armor_class}
                  </p>
                  <div className="grid grid-cols-2">
                    <p>
                    Str: {monster.strength}
                    </p>
                    <p>
                    Dex: {monster.dexterity}
                    </p>
                    <p>
                    Con: {monster.constitution}
                    </p>
                    <p>
                    Int: {monster.intelligence}
                    </p>
                    <p>
                    Wis: {monster.wisdom}
                    </p>
                    <p>
                    Char: {monster.charisma}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="mr-1">Speed:</p>
                    <p className="flex space-x-1">
                      {Object.entries(monster.speed).map(([key, val]) => {
                        return <p key={key}>{key}:{val}</p>
                      })}
                    </p> 
                  </div>
                  <div className="grid grid-cols-2">
                    <p>
                    Str Save: {monster.strength_save}
                    </p>
                    <p>
                    Dex Save: {monster.dexterity_save}
                    </p>
                    <p>
                    Con Save: {monster.constitution_save}
                    </p>
                    <p>
                    Int Save: {monster.intelligence_save}
                    </p>
                    <p>
                    Wis Save: {monster.wisdom_save}
                    </p>
                    <p>
                    Char Save: {monster.charisma_save}
                    </p>
                  </div>
                  <p>
                    Damage Vulnerabilities: {monster.damage_vulnerabilities ? monster.damage_vulnerabilities : "None"}
                  </p>
                  <p>
                    Damage Resistances: {monster.damage_resistances ? monster.damage_resistances : "None"}
                  </p>
                  <p>
                    Damage Immunities: {monster.damage_immunities ? monster.damage_immunities : "None"}
                  </p>
                  <p>
                    Condition Immunities: {monster.condition_immunities ? monster.condition_immunities : "None"}
                  </p>
                  <p>
                    Senses: {monster.senses ? monster.senses : "None"}
                  </p>
                </div>
              

                <div>
                  <h2 className="space-y-2">
                    <p className="text-2xl">Actions</p> 
                    {monster.actions === "" ? (
                      <p>No actions</p>
                    ) : (
                      <div>
                        {monster.actions.map((actions) => {
                          return (
                            <h3 key={actions.name}><p className="text-lg italic">{actions.name}:</p> <p className="text-sm">{actions.desc}</p></h3>
                          )
                        })}
                      </div>
                    )}
                  </h2>

                  <h2>
                    <p className="text-xl">Legendary Actions</p> 
                    {monster.legendary_actions === "" ? (
                      <p>No Legendary Actions</p>
                    ) : (
                      <div>
                        {monster.legendary_actions.map((actions) => {
                          return (
                            <h3 key={actions.name}><p className="text-lg italic">{actions.name}:</p> <p className="text-sm">{actions.desc}</p></h3>
                          )
                        })}
                      </div>
                    )}
                  </h2>
                </div>
            </div>
          ))}
          </div>
        </div>
      )}
    </div>
  )
}



/*
Things needed for monster stats
Name, type, alignment, AC, HP, Speed, Stats, Skills, Senses, Languages, Challenge Rating, Proficiency Bonus, Special Abilities, Actions, Description, Spell List, 


actions: (4) [{…}, {…}, {…}, {…}]
alignment: "lawful evil"
armor_class: 17
armor_desc: "natural armor"
challenge_rating: "10"
charisma: 18
charisma_save: null
condition_immunities: ""
constitution: 15
constitution_save: 6
cr: 10
damage_immunities: ""
damage_resistances: ""
damage_vulnerabilities: ""
dexterity: 9
dexterity_save: null
document__license_url: "http://open5e.com/legal"
document__slug: "wotc-srd"
document__title: "Systems Reference Document"
group: null
hit_dice: "18d10+36"
hit_points: 135
img_main: "http://api.open5e.com/static/img/monsters/aboleth.png"
intelligence: 18
intelligence_save: 8
languages: "Deep Speech, telepathy 120 ft."
legendary_actions: (3) [{…}, {…}, {…}]
legendary_desc: "The aboleth can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The aboleth regains spent legendary actions at the start of its turn."
name: "Aboleth"
page_no: 261
perception: 10
reactions: ""
senses: "darkvision 120 ft., passive Perception 20"
size: "Large"
skills: {history: 12, perception: 10}
slug: "aboleth"
special_abilities: (3) [{…}, {…}, {…}]
speed: {walk: 10, swim: 40}
spell_list: []
strength: 21
strength_save: null
subtype: ""
type: "aberration"
wisdom: 15
wisdom_save: 6
*/