import CharacterAlignment from './character-alignment.js'
import CharacterClass from './character-class.js'
import CharacterRace from './character-race.js'
import { useState } from 'react';
import Image from 'next/image'
import { Configuration, OpenAIApi } from 'openai';
import { InfinitySpin } from 'react-loader-spinner'

import {
  useQueryClient
} from "react-query";


export default function AllCharacterOptions() {
  const [race, setRace] = useState("Dragonborn")
  const [characterClass, setCharacterClass] = useState("Barbarian")
  const [alignment, setAlignment] = useState("Chaotic Evil")
  const [aiResponse, setAiResponse] = useState("")
  const [spinner, setSpinner] = useState(false)
  const [imageSpinner, setImageSpinner] = useState(false)
  const [image, setImage] = useState(undefined);

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

  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_AI_TOKEN,
  });

  const openai = new OpenAIApi(configuration);

  const fetchAIResponse = async () => {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: `I need a first and last name, character description that is less than 400 characters, and a short background for a 5E DND character based on the following information. ${allOptions}`}],
    });
    setAiResponse(() => {
      return completion.data.choices[0].message.content;
    })
  }

  console.log(aiResponse)

  const inputString = aiResponse;

  const outputArray = inputString.split('\n').filter(Boolean); // split the input string at each "\n" character, and remove any empty strings

  const outputObject = {};

  for (let item of outputArray) {
    const [key, value] = item.split(':').map((item) => item.trim()); // split each item at the ":" character, and trim any whitespace around the key and value
    outputObject[key] = value; // add the key-value pair to the output object
  }

  const name = Object.keys(outputObject)[0]
  const description = Object.keys(outputObject)[1]
  const background = Object.keys(outputObject)[2]

  const nameValue = outputObject[name];
  const descriptionValue = outputObject[description];
  const backgroundValue = outputObject[background];

  const fetchImageResponse = async () => {
    const reply = await openai.createImage({
      prompt: `Create a dnd character image based on this description: ${descriptionValue} Make sure I can see the full character in the image.`,
      n: 1,
      size: "256x256",
    })
    setImage(() => {
      return reply.data.data[0].url
    })
  }
  
  const handleAllOptions = (e) => {
    e.preventDefault();
    setSpinner(true);
    fetchAIResponse()
    .then((data) => {
      setSpinner(false);
     })
    .then(() => {
      setImageSpinner(true)
    })
    .then(() => {
      fetchImageResponse();
    })
    .then(() => {
      setImageSpinner(false)
    })
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
        ) : <div>
          <div>
            <h1 className="font-bold">
              {name}
            </h1>
            <p>
              {nameValue}
            </p>
            <h1 className="font-bold">
              {description}
            </h1>
            <p>
              {descriptionValue}
            </p>
            <h1 className="font-bold">
              {background}
            </h1>
            <p>
              {backgroundValue}
            </p>
          </div>
          {image === undefined ? (
            <div />
          ) :
            imageSpinner === true ? (
              <p>Loading...</p>
            ):(
            <Image 
            src={image}
            alt="DALL-E image of dnd character"
            width={250}
            height={250}
          >{console.log(image)}
          </Image>
          )}
        </div>
      }
    </div>
  )
}