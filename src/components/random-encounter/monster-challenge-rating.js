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
  const [encounteredMonsters, setEncounteredMonsters] = useState([])

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
          <button className='border-2 border-black rounded-md p-2 m-2' type="submit">Fetch Monster Types</button>
        </form>
        <button onClick={handleEncounterSubmit} className='border-2 border-black rounded-md p-2 m-2' type="submit"> {encounter ? "End Encounter" : "Start Encounter"}</button>
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
          <p>Code goes here</p>
        </div>
      )}
    </div>
  )
}