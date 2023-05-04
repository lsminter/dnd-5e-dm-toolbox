import {useState, useEffect, useCallback} from 'react'
import axios from 'axios'
import { InfinitySpin } from 'react-loader-spinner'

export default function ChallengeRating() {

  const [number, setNumber] = useState();
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const [uniqueNames, setUniqueNames] = useState([]);
  const [monsters, setMonsters] = useState([]);
  const [loading, setLoading] = useState(false)
  const [encounter, setEncounter] = useState(false);
  const [monsterStats, setMonsterStats] = useState([])
  const [monsterNumber, setMonsterNumber] = useState(1)

  const fetchMonstersByChallengeRating = useCallback((challengeRating, apiUrl = null) => {
    apiUrl = apiUrl || `https://api.open5e.com/monsters?challenge_rating=${number}`;
  
    return axios.get(apiUrl).then((response) => {
      const responseData = response.data;
      const monsters = responseData.results;
  
      if (responseData.next) {
        return fetchMonstersByChallengeRating(challengeRating, responseData.next).then((nextMonsters) => {
          return monsters.concat(nextMonsters);
        });
      } else {
        return monsters;
      }
    });
  }, [number])

  useEffect(() => {
    fetchMonstersByChallengeRating(number).then((monsters) => {

      const monsterNames = monsters.map((monster) => {
        return monster.name;
      });      

      const uniqueNames = [...new Set(monsterNames)];

      setUniqueNames(uniqueNames);
    });
  }, [fetchMonstersByChallengeRating, number]);

  useEffect(() => {
    async function fetchData() {
      const result = await fetchMonstersByChallengeRating(number);
      setMonsters(result);
    }
    fetchData();
  }, [fetchMonstersByChallengeRating, number]);

  useEffect(() => {
    const types = selectedNames.reduce((acc, name) => {
      const monster = monsters.find((monster) => {
        return monster.name === name;
      });
      if (monster && monster.type) {
        return [...acc, monster.type];
      }
      return acc;
    }, []);
    setSelectedTypes([...new Set(types)]);
  }, [selectedNames, monsters]);
  
  useEffect(() => {
    const stats = selectedNames.reduce((acc, name, index) => {
      const monster = monsters.find((monster) => {
        return monster.name === name;
      });
      if (monster) {
        const monsterStatNumber = monsterNumber[index] ?? 1;
        for (let i = 0; i < monsterStatNumber; i++) {
          acc.push(monster)
        }
      }
      return acc;
    }, []);
    setMonsterStats(stats);
  }, [selectedNames, monsters, monsterNumber]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    fetchMonstersByChallengeRating().then(() => {
      setLoading(false)
    })
    setNumber(null);
    const selectedNumber = document?.getElementById("number")?.value
    setNumber(selectedNumber)
  };

  const handleClearingMonsters = () => {
    setSelectedNames([])
    setMonsterNumber(1)
  }

  const handleEncounterSubmit = (e) => {
    setEncounter(!encounter);    
  };

  function handleNameSelection(event) {
    const name = event.target.name;

    if (selectedNames.includes(name)) {
      setSelectedNames(selectedNames.filter((n) => n !== name));
    } else {
      setSelectedNames([...selectedNames, name]);
    }
  }

  const handleIncrement = (index) => {
    setMonsterNumber((prevCounters) => ({
      ...prevCounters,
      [index]: Math.max(1, (prevCounters[index] || 1) + 1),
    }));

    setMonsterStats((prevStats) => {
      const monster = monsters.find((monster) => monster.name === prevStats[index].name);
      if (!monster) {
        return prevStats;
      }
      const newStats = [...prevStats];
      for (let i = 0; i < monsterNumber[index]; i++) {
        newStats.push(monster);
      }
      return newStats;
    });
  };
  
  const handleDecrement = (index) => {
    setMonsterNumber((prevCounters) => ({
      ...prevCounters,
      [index]: Math.max(1, (prevCounters[index] || 1) - 1),
    }));
  };

  return (
    <div>
      <div className="sm:flex grid grid-col-1">
        <form onSubmit={handleSubmit}>
          <label>
            Enter a challenge rating:
            <input placeholder="1" className='border-2 border-black rounded-md p-2 m-2 bg-gray-400' type="number" id='number' />
          </label>         
          <button className='border-2 border-black rounded-md md:w-auto w-full bg-gray-400 p-2 m-2' type="submit">Fetch Monsters</button>
        </form>
        <div className="sm:flex space-x-2 grid grid-cols-2">
          <button 
            onClick={handleEncounterSubmit} 
            className='border-2 border-black rounded-md md:w-auto bg-gray-400 p-2 m-2' 
          > 
            {encounter ? "Monster Selection" : "Selected Monster Stats"}
          </button>
          <button 
            className='border-2 border-black rounded-md md:w-auto bg-gray-400 p-2 m-2' 
            onClick={handleClearingMonsters}
          >Clear Monsters</button>
        </div>
      </div>
      {encounter === false ? (
        <div>
        {loading === true ? (
          <InfinitySpin 
            width='200'
            color="#00008B"
          />
          ) :  
          <div className="grid w-full grid-cols-2 text-white">
            <div>
              <h2>Select Monsters:</h2>
              <li className="grid lg:grid-cols-3 md:grid-cols-2 gap-1 mr-2 break-words">
                {uniqueNames.map((name) => {
                  return (
                    <ul key={name} className="bg-gray-400 text-black p-4 rounded">
                      <input
                        type="checkbox"
                        name={name}
                        checked={selectedNames.includes(name)}
                        onChange={handleNameSelection}
                        className="text-gray-300"
                      />
                      {name}
                    </ul>
                  );
                })}
              </li>
            </div>
            <div>
              <div className="grid grid-cols-1 ml-4">
                <div>
                  <h2 className="text-2xl text-center">Selected Monsters:</h2>
                  <ul>
                    {selectedNames.map((name, index) => {
                      return (
                        <div className="flex w-full justify-between" key={index}>
                          <li>
                            {name}
                          </li>
                          <div className="justify-end">
                          {monsterNumber[index] ?? 1}
                            <button className="border-2 border-black rounded-md mx-1 w-6" onClick={() => handleIncrement(index)}> + </button>
                            <button className="border-2 border-black rounded-md w-6" onClick={() => handleDecrement(index)}> - </button>
                          </div>
                        </div>
                      );
                    })}
                  </ul>
                </div>
                <div>
                  <h2 className="text-2xl mt-6 text-center">Selected Types:</h2>
                  <ul className="text-center grid grid-cols-2">
                    {selectedTypes.map((type) => {
                      return (
                        <li key={type}>
                          {type}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
      ) : (
        <div>
          <p className="text-2xl">Enemies</p>
           <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-white'>
            {monsterStats.map((stats, i) => {
              return (
                <div
                  key={i++} 
                  className="grid border-solid border border-black m-4 p-6 text-left no-underline rounded-xl space-y-2"
                >
                  <h2 className="pb-2">
                    <p className="text-2xl">{stats.name}</p>
                  </h2>
                  <h3 className="flex">
                    <div>Type: {stats.type}, {stats.alignment === "" ? (
                        <p>Alignment: No Alignment</p>
                      ) : (
                        <div>
                        Alignment: {stats.alignment}
                        </div>
                      )}
                      <div>{stats.languages === "" || stats.languages == "-" ? (
                        <p>Languages: None Listed</p>
                      ) : (
                        <div>
                        Languages: {stats.languages}
                        </div>
                      )}</div>
                    </div>
                  </h3>
                  <div className="flex space-x-4">
                    <h2>
                      <p className="text-xl">HP:</p>{stats.hit_points}<input placeholder={stats.hit_points} className="w-12 p-1 bg-gray-100 text-black" type="number" ></input>
                    </h2>
                    <h2>
                      <p className="text-2xl">Armor Class:</p>{stats.armor_class}
                    </h2>
                    <h2>
                      <p className="text-2xl">Type:</p>{stats.type}
                    </h2>
                  </div>
                  <h2>
                    <p className="text-2xl">Conditional Immunities:</p>{stats.conditional_immunities}
                  </h2>
                  <h2>
                    <p className="text-2xl">Constitution:</p>{stats.constitution}
                  </h2>
                  <h2 className="space-y-2">
                    <p className="text-2xl">Actions</p> 
                    {stats.actions === "" ? (
                      <p>No actions</p>
                    ) : (
                      <div>
                        {stats.actions.map((actions) => {
                          return (
                            <h3 key={actions.name}><p className="text-lg italic">{actions.name}:</p> <p className="text-sm">{actions.desc}</p></h3>
                          )
                        })}
                      </div>
                    )}
                  </h2>
                  <h2>
                    <p className="text-xl">Legendary Actions</p> 
                    {stats.legendary_actions === "" ? (
                      <p>No Legendary Actions</p>
                    ) : (
                      <div>
                        {stats.legendary_actions.map((actions) => {
                          return (
                            <h3 key={actions.name}><p className="text-lg italic">{actions.name}:</p> <p className="text-sm">{actions.desc}</p></h3>
                          )
                        })}
                      </div>
                    )}
                  </h2>
                </div>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

// Name, type, alignment, AC, HP, Speed, Stats, Skills, Senses, Languages, Challenge Rating, Proficiency Bonus, Special Abilities, Actions, Description, Spell List, 


// actions: (4) [{…}, {…}, {…}, {…}]
// alignment: "lawful evil"
// armor_class: 17
// armor_desc: "natural armor"
// challenge_rating: "10"
// charisma: 18
// charisma_save: null
// condition_immunities: ""
// constitution: 15
// constitution_save: 6
// cr: 10
// damage_immunities: ""
// damage_resistances: ""
// damage_vulnerabilities: ""
// dexterity: 9
// dexterity_save: null
// document__license_url: "http://open5e.com/legal"
// document__slug: "wotc-srd"
// document__title: "Systems Reference Document"
// group: null
// hit_dice: "18d10+36"
// hit_points: 135
// img_main: "http://api.open5e.com/static/img/monsters/aboleth.png"
// intelligence: 18
// intelligence_save: 8
// languages: "Deep Speech, telepathy 120 ft."
// legendary_actions: (3) [{…}, {…}, {…}]
// legendary_desc: "The aboleth can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The aboleth regains spent legendary actions at the start of its turn."
// name: "Aboleth"
// page_no: 261
// perception: 10
// reactions: ""
// senses: "darkvision 120 ft., passive Perception 20"
// size: "Large"
// skills: {history: 12, perception: 10}
// slug: "aboleth"
// special_abilities: (3) [{…}, {…}, {…}]
// speed: {walk: 10, swim: 40}
// spell_list: []
// strength: 21
// strength_save: null
// subtype: ""
// type: "aberration"
// wisdom: 15
// wisdom_save: 6