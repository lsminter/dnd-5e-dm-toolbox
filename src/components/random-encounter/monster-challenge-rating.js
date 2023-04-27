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
      setMonsters([])
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
    const stats = selectedNames.reduce((acc, name) => {
      const monster = monsters.find((monster) => {
        return monster.name === name;
      });
      if (monster) {
        return [...acc, monster];
      }
      return acc;
    }, []);
    setMonsterStats([...new Set(stats)]);
  }, [selectedNames, monsters]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    fetchMonstersByChallengeRating().then(() => {
      setSelectedNames([])
      setLoading(false)
    })
    setNumber(null);
    const selectedNumber = document?.getElementById("number")?.value
    setNumber(selectedNumber)
  };

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

  return (
    <div>
      <div className="flex">
        <form onSubmit={handleSubmit}>
          <label>
            Enter a challenge rating:
            <input className='border-2 border-black rounded-md p-2 m-2 bg-gray-100' type="number" id='number' />
          </label>         
          <button className='border-2 border-black rounded-md p-2 m-2' type="submit">Fetch Monsters</button>
        </form>
        <button 
          onClick={handleEncounterSubmit} 
          className='border-2 border-black rounded-md p-2 m-2' 
          type="submit"
        > 
          {encounter ? "Monster Selection" : "Selected Monster Stats"}
        </button>
      </div>
      {encounter === false ? (
        <div>
        {loading === true ? (
          <InfinitySpin 
            width='200'
            color="#00008B"
          />
          ) :  
          <div className="grid w-full column-3">
            <div className="col-start-1">
              <h2>Select Monsters:</h2>
              <ul>
                {uniqueNames.map((name) => {
                  return (
                    <li key={name}>
                      <label>
                        <input
                          type="checkbox"
                          name={name}
                          checked={selectedNames.includes(name)}
                          onChange={handleNameSelection}
                        />
                        {name}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col-start-2">
              <h2>Selected Monsters:</h2>
              <ul>
                {selectedNames.map((name) => {
                  return (
                    <li key={name}>
                      {name}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col-start-3">
              <h2>Selected Types:</h2>
              <ul>
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
        }
      </div>
      ) : (
        <div>
          <p className="text-2xl">Enemies</p>
          {/* 
            loop through selected monsters
            display relevant stats for each monster
           */}
           <ul className='grid grid-cols-2'>
            {monsterStats.map((stats) => {
              console.log(stats)
              return (
                <div
                  key={stats.name} 
                  className="grid border-solid border border-black m-4 p-6 text-left no-underline rounded-xl"
                >
                <h2 className="pb-2">
                  <p className="text-3xl">{stats.name}</p> 
                </h2>
                <div className="flex space-x-4">
                  <h2>
                    <p className="text-2xl">Hit Points:</p> {stats.hit_points}
                  </h2>
                  <h2>
                    <p className="text-2xl">Armor Class:</p> {stats.armor_class}
                  </h2>
                  <h2>
                    <p className="text-2xl">Type:</p> {stats.type}
                  </h2>
                </div>
                  <h2>
                    <p className="text-2xl">Conditional Immunities:</p> "{stats.conditional_immunities}"
                  </h2>
                  <h2>
                    <p className="text-2xl">Constitution:</p> {stats.constitution}
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