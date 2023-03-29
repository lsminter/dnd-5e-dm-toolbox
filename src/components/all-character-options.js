import CharacterAlignment from './character-alignment.js'
import CharacterClass from './character-class.js'
import CharacterRace from './character-race.js'
import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';

import { InfinitySpin } from 'react-loader-spinner'



import {
  useQuery,
  useQueryClient
} from "react-query";


export default function AllCharacterOptions() {
  const [race, setRace] = useState("")
  const [characterClass, setCharacterClass] = useState("")
  const [alignment, setAlignment] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [spinner, setSpinner] = useState(false)

  const queryClient = useQueryClient()

  const handleSelectedRace = () => {
    const selectedRace = document?.getElementById("race")?.value;
    setRace(selectedRace)
  }
  
  const handleAlignment = () => {
    const selectedAlignment = document?.getElementById("alignment")?.value;
    setAlignment(selectedAlignment)
  }
  
  const handleCharacterClass = () => {
    const selectedClass = document?.getElementById("class")?.value;
    setCharacterClass(selectedClass)
  }

  const allOptions = `The race is ${race}, the class of the character is ${characterClass}, and the alignment is ${alignment}.`

  const fetchAIResponse = async () => {
    const configuration = new Configuration({
      apiKey: process.env.NEXT_PUBLIC_AI_TOKEN,
    });

    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: `I need a first and last name, character description, and a short background for a 5E DND character based on the following information. ${allOptions}`}],
    });
    setAiResponse(() => {
      return completion.data.choices[0].message.content;
    })
  }
  
  const handleAllOptions = (e) => {
    e.preventDefault();
    setSpinner(true);
    fetchAIResponse()
    .then((data) => {
      setSpinner(false);
     });
  }
  
  return (
    <div>
      <form 
        id="allValues" 
        onSubmit={handleAllOptions}
      >
        <CharacterRace className="m-2" selectedRace={() => handleSelectedRace()}/>
        <CharacterAlignment className="m-2" selectedAlignment={() => handleAlignment()}/>
        <CharacterClass className="m-2" selectedCharacterClass={() => handleCharacterClass()}/>
        <button className="px-2 py-2 mx-2 border border-gray-400 bg-gray-400 rounded-lg" type="submit">Get Character!</button>
      </form>
      {spinner === true ? (
        <InfinitySpin 
          width='200'
          color="#00008B"
        />
        ) : <p>{aiResponse}</p>
      }
    </div>
  )
}