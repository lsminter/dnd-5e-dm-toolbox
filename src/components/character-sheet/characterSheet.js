const CharacterSheet = ({ character }) => {
  return (
    <div className="bg-white p-4 mt-4 rounded-md shadow-md">
      {/* Character Information */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="font-bold">Character Name</p>
          <p>{character.name}</p>
        </div>
        <div>
          <p className="font-bold">Class & Level</p>
          <p>{character.class} {character.level}</p>
        </div>
        <div>
          <p className="font-bold">Background</p>
          <p>{character.background}</p>
        </div>
        <div>
          <p className="font-bold">Race</p>
          <p>{character.race}</p>
        </div>
        <div>
          <p className="font-bold">Alignment</p>
          <p>{character.alignment}</p>
        </div>
        <div>
          <p className="font-bold">Player Name</p>
          <p>{character.playerName}</p>
        </div>
      </div>
      <hr />

      Ability Scores
      <div className="grid grid-cols-2 gap-2 my-4 sm:flex sm:gap-4">
        {Object.keys(character.abilities) === undefined ? (
          <div>
            No ability scores found
          </div>
          ) : (
            Object.entries(character.abilities).map(([key, value]) => {
            return (
              <div key={key}>
                <p className="font-bold">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                <p>{value}</p>
              </div>
            )})
          )}
        </div>
      <hr />

      Skills
      <div className="grid grid-cols-2 gap-4 my-4">
      {character.skills === undefined ? (
        <div className="col-span-6">
          No Skills found
        </div>
        ) : (
        character.skills.map((skill) => {
          return (
            <div key={skill.name}>
              <p className="font-bold">{skill.name}</p>
              <p>{skill.value}</p>
            </div>
          )}
        ))}
      </div>
      <hr />

      Combat
      <div className="grid grid-cols-3 gap-4 my-4">
      {character.combat === undefined ? (
        <div className="col-span-6">
          No Combat found
        </div>
        ) : (
        Object.entries(character.combat).map(([key, value]) => {
          return (
            <div key={value}>
              <p className="flex font-bold">{key.charAt(0).toUpperCase() + key.slice(1)} - <p className="font-normal ml-1">{value}</p></p>
            </div>
          )}
        ))}
      </div>
      <hr />

      Equipment and Features
      <div className="grid grid-cols-2 gap-4 my-4">
      {character.equipment === undefined ? (
        <div className="col-span-6">
          No Equipment or Features found
        </div>
        ) : (
        character.equipment.map((equipment) => {
          return (
            <div key={equipment.name}>
              <p className="font-bold">{equipment.name}</p>
              <p>{equipment.value}</p>
            </div>
          )}
        ))}
      </div>
    </div>
  );
};

export default CharacterSheet;