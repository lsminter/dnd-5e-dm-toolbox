import CharacterRace from '../components/character-options/character-race.js'
import CharacterSex from '../components/character-options/character-sex.js'
import JobSelect from '../components/character-options/npc-profession.js'
import JobList from '../components/character-options/npc-job.js'
import AdditionalInfo from '../components/character-options/additional-info.js'
import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import { InfinitySpin } from 'react-loader-spinner'
import Image from 'next/image'

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
    <div className="min-h-screen mt-4 text-defaultColor">
      <div className="grid justify-items-center md:grid-cols-2 mt-4 md:mt-10 md:space-x-4">
        <div className="space-y-4 p-4 max-w-[572px]">
          <h1 className="md:text-3xl text-4xl leading-none tracking-normal text-center sm:text-left font-[dmt]">
            Quick Build an NPC
          </h1>
          <p>
            Select a few options and the AI will create a name, description, and background for your NPC.
          </p>
          <form 
            className="hidden md:grid space-y-4"
            id="allValues" 
            onSubmit={handleAllOptions}
          >
            <div className="grid grid-cols-2 content-center">
              <CharacterRace className="m-2" selectedRace={() => handleSelectedRace()}/>
              <CharacterSex className="m-2" selectedSex={() => handleCharacterSex()}/>
              <JobSelect onSelect={setSelectedJob} />
              <JobList jobName={selectedJob} />
            </div>
            <AdditionalInfo className="m-2" selectedAdditionalInfo={() => handleAdditionalInfo()}/>
            <button className="px-2 py-2 mx-2 bg-defaultButton rounded-lg" type="submit">Get Character!</button>
          </form>
        </div>
        <div className="flex max-w-[572px] justify-items-center p-2">
          <Image 
            src="/images/tool-page-images/npc.png" 
            alt="home page image" 
            width={722}
            height={432}
            className="rounded-md"
          />
        </div>
      </div>
      <form 
        className="md:hidden space-y-4"
        id="allValues" 
        onSubmit={handleAllOptions}
      >
        <div className="grid grid-cols-1 content-center">
          <CharacterRace className="m-2" selectedRace={() => handleSelectedRace()}/>
          <CharacterSex className="m-2" selectedSex={() => handleCharacterSex()}/>
          <JobSelect onSelect={setSelectedJob} />
          <JobList jobName={selectedJob} />
          <AdditionalInfo className="m-2" selectedAdditionalInfo={() => handleAdditionalInfo()}/>
        </div>
        <button className="px-2 py-2 mx-2 bg-defaultButton rounded-lg" type="submit">Get Character!</button>
      </form>
      {spinner === true ? (
        <InfinitySpin 
          width='200'
          color="#00008B"
        />
        ) : <div className="flex mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 m-2 space-y-2 md:space-y-4 gap-x-12">
            <div className="space-y-4">
              <div>
                <h1 className="font-bold text-xl">
                  {name}
                </h1>
                <p>
                  {nameValue}
                </p>
              </div>
              <div>
                <h1 className="font-bold text-xl">
                  {description}
                </h1>
                <p>
                  {descriptionValue}
                </p>
              </div>
            </div>
            <div>
              <h1 className="font-bold text-xl">
                {background}
              </h1>
              <p>
                {backgroundValue}
              </p>
            </div>
          </div>
        </div>
      }
    </div>
  )
}