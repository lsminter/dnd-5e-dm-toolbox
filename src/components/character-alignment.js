import { useState } from 'react';
import axios from 'axios'
import {
  useQuery,
} from "react-query";


const useAlignment = () => {
  return useQuery("alignment", async () => {
    const { data } = await axios.get(
      'https://www.dnd5eapi.co/api/alignments/'
    )
    return data;
  });
}

function CharacterAlignment({ selectedAlignment }) {

  const { status, data, error, isFetching } = useAlignment();

  return (
    <div className="relative inline-block text-left px-2">
      <div>
        {status === "loading" ? (
          "Loading..."
        ) : status === "error" ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
            <p className="text-center">Select Alignment</p>
            <select
              className="px-4 py-2 border border-gray-400 bg-gray-400 rounded-lg"
              id="alignment"
              onChange={selectedAlignment}
            >
              {data.results.map((option) => {
                return(
                  <option 
                    key={option.name}
                  >
                    {option.name}
                  </option>
                )
              })}
              </select>
            </div>
            <div>{isFetching ? "Background Updating..." : " "}</div>
          </>
        )}
      </div>  
    </div>
  );
}

export default CharacterAlignment;
