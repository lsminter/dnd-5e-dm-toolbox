import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SelectedMonsterStats = () => {
  const [challengeRating, setChallengeRating] = useState('');
  const [allMonsters, setAllMonsters] = useState([]); 
  const [monsters, setMonsters] = useState([]);
  const [selectedMonsters, setSelectedMonsters] = useState([]);
  const [showMonsterData, setShowMonsterData] = useState(false);
  const [monsterStats, setMonsterStats] = useState([]);

  const fetchAllMonsters = async (url, fetchedMonsters = new Set()) => {
    try {
      const response = await axios.get(url);
      const { results, next } = response.data; 

      results.forEach((monster) => {
        fetchedMonsters.add(monster);
      });

      if (next) {
        return fetchAllMonsters(next, fetchedMonsters);
      } else {
        return Array.from(fetchedMonsters);
      }  
    } catch (error) {
      console.error('Error fetching monsters:', error.message);
    }  
  };

  const fetchMonsters = async () => {
    const url = `https://api.open5e.com/monsters?challenge_rating=${challengeRating}`;
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
    <div>
      <div className="grid sm:flex sm:w-full sm:space-y-0 space-y-2 space-x-3 mb-4">
        <div className='flex justify-between'>
          <input
            type="number"
            value={challengeRating}
            onChange={(e) => setChallengeRating(e.target.value)}
            placeholder="CR"
            className="w-10 pl-1 mx-3 bg-white text-black rounded-md"
          />
          <button className="px-2 w-full border border-gray-400 hover:bg-gray-500 bg-gray-400 rounded-md" onClick={fetchMonsters}>Fetch Monsters</button>
        </div>
        <button className="px-2 border border-gray-400 hover:bg-gray-500 bg-gray-400 rounded-md" onClick={toggleMonsterData}>{
          showMonsterData ? 'Hide Monster Stats' : 'Show Monster Stats'}
        </button>
        <button className="px-2 border border-gray-400 hover:bg-gray-500 bg-gray-400 rounded-md" onClick={handleResetSelectedMonsters}>Reset Selected Monsters</button>
      </div>
      {!showMonsterData && (
        <>
          <div className="grid grid-cols-3 text-white">
            <div className='col-span-2'>
              <h3 className="text-center text-2xl font-bold">Monsters</h3>
              <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {monsters.map((monsterName, index) => (
                  <li key={index} className="text-white border-gray-400 hover:bg-gray-500 bg-gray-400 rounded-md m-2 p-2 text-center align-middle" onClick={() => addMonster(monsterName.name)}>
                    {monsterName.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className='col-start-3'>
              <h3 className="text-center text-2xl font-bold">Selected Monsters</h3>
              <ul>
                {selectedMonsters.map((monsterName, index) => (
                  <li key={index} className='text-white text-center' onClick={() => removeMonster(index)}>{monsterName}</li>
                ))}
              </ul>
            </div>
          </div> 
        </>
      )}

      {showMonsterData && (
        <div className="text-white space-y-2">
          <h3 className="text-center text-4xl font-bold">Monster Data</h3>
          {monsterStats.map((monster, index) => (
            <div key={index} className="grid sm:grid-cols-1 md:grid-cols-2 border-2 p-2">
              <h2 className="pb-2 space-y-2">
                <p className="text-2xl">{monster.name}</p>
                <h2 className="flex items-center">
                  <p className="text-sm mr-2">Total HP:</p>{monster.hit_points} Current HP: <input placeholder={monster.hit_points} className="w-16 mx-2 p-1 h-8 bg-gray-100 text-black" type="number" ></input>
                </h2>
                <h3 className="lg:flex sm:grid sm:grid-cols-1 md:grid-cols-2 pr-4">
                  <div className="text-md">Type: {monster.type}, {monster.alignment === "" ? (
                    <p className="text-sm">Alignment: No Alignment</p>
                  ) : (
                    <div className="text-sm">
                      Alignment: {monster.alignment}
                    </div>
                  )}
                  </div>
                  <div className="text-md">
                    {monster.languages === "" || monster.languages == "-" ? (
                      <p className="text-sm">Languages: None Listed</p>
                    ) : (
                      <div className="text-sm">
                        Languages: {monster.languages}
                      </div>
                    )}
                  </div>
                  <h2>
                    Armor Class:
                    <p className="text-sm">{monster.armor_class}</p>
                  </h2>
                  <h2>
                    Type:
                    <p className="text-sm">{monster.type}</p>
                  </h2>
                </h3>
                <h2>
                  Constitution:
                  <p className="text-sm">{monster.constitution}</p>
                </h2>
                <h2>
                  Conditional Immunities:
                  <h3 className="text-sm">
                    {monster.conditional_immunities === "" || monster.conditional_immunities == "-" || monster.conditional_immunities == undefined ? (
                      <p className="text-sm">None Listed</p>
                    ) : (
                      <div className="text-sm">
                        {monster.conditional_immunities}
                      </div>
                    )}
                  </h3>
                </h2>
              </h2>
              

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
      )}
    </div>
  );
};

export default SelectedMonsterStats;


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