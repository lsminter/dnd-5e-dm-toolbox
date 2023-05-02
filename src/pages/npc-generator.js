import CharacterRace from '../components/character-options/character-race.js'
import CharacterSex from '../components/character-options/character-sex.js'
import JobSelect from '../components/character-options/npc-profession.js'
import JobList from '../components/character-options/npc-job.js'
import AdditionalInfo from '../components/character-options/additional-info.js'
import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import { InfinitySpin } from 'react-loader-spinner'

export default function AllCharacterOptions({ object }) {
  const [race, setRace] = useState("Dragonborn")
  const [sex, setSex] = useState("Male")
  const [selectedJob, setSelectedJob] = useState('');
  const [aiResponse, setAiResponse] = useState("")
  const [spinner, setSpinner] = useState(false)
  const [additionalInfo, setAdditionalInfo] = useState("")

  const handleSelectedRace = () => {
    const selectedRace = document?.getElementById("race")?.value;
    setRace(selectedRace)
  }
  
  const handleCharacterSex = () => {
    const selectedSex = document?.getElementById("sex")?.value;
    setSex(selectedSex)
  }

  const handleAdditionalInfo = () => {
    const selectedAdditionalInfo = document?.getElementById("info")?.value;
    setAdditionalInfo(selectedAdditionalInfo)
  }

  const allOptions = `The race is ${race}, they are ${sex}, their profession is ${selectedJob}, additional info ${additionalInfo}.`

  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_AI_TOKEN,
  });

  const openai = new OpenAIApi(configuration);

  const fetchAIResponse = async () => {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: `
      I need you to create three sections Name, Description, and Background based on these options: ${allOptions}. For the name, I need a first and last name. For the Description, I need a very short, 100 characters max, character description with no filler words but add scales color, eye color, and height. For the background, write a short background for a 5E DND character around 300 characters max.
      
      Output it like this:
      Name: First Last
      Description: Description
      Background: Background`}],
    });
    setAiResponse(() => {
      return completion.data.choices[0].message.content;
    })
  }

  const inputString = aiResponse;
  const outputArray = inputString.split('\n').filter(Boolean); 
  const outputObject = {};

  for (let item of outputArray) {
    const [key, value] = item.split(':').map((item) => item.trim()); 
    outputObject[key] = value; 
  }

  const name = Object.keys(outputObject)[0]
  const description = Object.keys(outputObject)[1]
  const background = Object.keys(outputObject)[2]

  const nameValue = outputObject[name];
  const descriptionValue = outputObject[description];
  const backgroundValue = outputObject[background];
  
  const handleAllOptions = (e) => {
    e.preventDefault();
    setSpinner(true);
    fetchAIResponse()
    .then((data) => {
      setSpinner(false);
     })
  }
  
  return (
    <div className="mt-4">
      <form 
        className="space-y-4"
        id="allValues" 
        onSubmit={handleAllOptions}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 content-center">
          <CharacterRace className="m-2" selectedRace={() => handleSelectedRace()}/>
          <CharacterSex className="m-2" selectedSex={() => handleCharacterSex()}/>
          <JobSelect onSelect={setSelectedJob} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 content-center">
          <JobList jobName={selectedJob} />
          <AdditionalInfo className="m-2" selectedAdditionalInfo={() => handleAdditionalInfo()}/>
        </div>
        <button className="px-2 py-2 mx-2 border border-gray-400 bg-gray-400 rounded-lg" type="submit">Get Character!</button>
      </form>
      {spinner === true ? (
        <InfinitySpin 
          width='200'
          color="#00008B"
        />
        ) : <div className="sm:flex mt-2">
          <div className="m-2 space-y-2 text-gray-200">
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
        </div>
      }
    </div>
  )
}