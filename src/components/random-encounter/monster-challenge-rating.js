import {useState, useEffect} from 'react'
import axios from 'axios'
import {useQuery} from "react-query";

export default function ChallengeRating({selectedEncounter}) {

  const [number, setNumber] = useState();
  const [monsterData, setMonsterData] = useState(null);

  function fetchMonstersByChallengeRating(challengeRating, apiUrl = null) {
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
  }
  
  function useMonstersByChallengeRating(challengeRating) {
    return useQuery(['monsters', number, challengeRating], () => fetchMonstersByChallengeRating(challengeRating));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedNumber = document?.getElementById("number")?.value;
    setNumber(selectedNumber);
  };

  const { status, data, error, isFetching } = useMonstersByChallengeRating(number);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter a challenge rating:
          <input className='border-2 border-black rounded-md p-2 m-2 bg-gray-100' type="text" id='number' />
        </label>         
        <button className='border-2 border-black rounded-md p-2 m-2' type="submit">Fetch Monsters</button>
      </form>

      {status === "loading" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
    (data.count === 0 
    ? (
      <div>
        No monsters at that challenge rating.
      </div>
    ) : (
      <div>
        <select
          className="px-4 py-2 border border-gray-400 bg-gray-400 rounded-lg"
          id="types"
        >
          {data.map((monster) => {
            return(
              <option 
                key={monster.name}
              >
                {monster.type}
              </option>
            )
          })}
        </select>
        <ul>
          {data.map((monster) => (
            <li key={monster.name}>{monster.name}</li>
          ))}
        </ul>
      </div>
      ))
      
      )}
    </div>
  )
}
