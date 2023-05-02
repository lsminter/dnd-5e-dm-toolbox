import AllCharacterOptions from '../components/character-options/all-character-options.js'


export default function Home() {

  return (
    <>
      <h1 className="text-3xl text-center font-bold underline my-4">
        Quickly build your own DND Character!
      </h1>
      <AllCharacterOptions className="pt-4 mt-6"/>
    </>
  )
}
