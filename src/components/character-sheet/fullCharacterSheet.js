import Attribute from "./characterAttribute.js";
import CharacterText from "./characterText.js";
import SavingThrows from "./characterSavingThrows.js";
import CharacterStats from "./characterStats.js";
import DeathSaves from "./deathSaves.js";
import HitDice from "./hitDice.js";
import AttAndSpells from "./attacksAndSpellcasting.js";
import CharacterEquipment from "./characterEquipment.js";
import CharacterSpells from "./characterSpells.js";
import SpellNames from "./spellNames.js";
import CharacterCantrips from "./characterCantrips.js";

export default function FullCharacterSheet({ 
  name, 
  description, 
  background, 
  characterClass,
  race,
  alignment
}) {
  return (
    <div className="container p-4 space-y-6">
    {/* Sheet One */}
      <main className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6">Character Sheet</h1>
        <div className="bg-white rounded-md shadow-md p-4 w-full">
          <div className='grid grid-cols-1 border-2'>
            <div className="grid grid-cols-3">
              <div>
                <p className="text-center">
                  Character Name
                </p>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  className="border rounded-md p-2 text-lg w-full"
                />
              </div>
              <div className="grid col-span-2 grid-cols-3">
                <div>
                <p className="text-center">
                  Class & Level
                  </p>
                  <input
                    type="text"
                    placeholder="Class & Level"
                    value={characterClass}
                    className="border rounded-md p-2 text-lg w-full"
                  />
                </div>
                <div>
                <p className="text-center">
                  Background
                  </p>
                  <input
                    type="text"
                    placeholder="Background"
                    className="border rounded-md p-2 text-lg w-full"
                  />
                </div>
                <div>
                <p className="text-center">
                  Level
                  </p>
                  <input
                    type="number"
                    placeholder="Level"
                    className="border rounded-md p-2 text-lg w-full"
                  />
                </div>
              </div>              
            </div>
            <div className="grid grid-cols-3">
              <div className="grid col-start-2 col-span-2 grid-cols-3">
                <div>
                  Race
                  <input
                    type="text"
                    placeholder="Race"
                    value={race}
                    className="border rounded-md p-2 text-lg w-full"
                  />
                </div>
                <div>
                  Alignment
                  <input
                    type="text"
                    placeholder="Alignment"
                    value={alignment}
                    className="border rounded-md p-2 text-lg w-full"
                  />
                </div>
                <div>
                  Experience
                  <input
                    type="number"
                    placeholder="Experience"
                    className="border rounded-md p-2 text-lg w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between space-x-1 mt-4">
            <div className="grid grid-cols-1 space-y-1 w-1/4">
              <div className="text-center border-2">
                Inspiration
                <input
                  type="number"
                  placeholder="0"
                  className="border rounded-md p-2 text-sm text-white text-center w-16"
                />
              </div>
              <div className="text-center border-2">
                Proficiency Bonus
                <input
                  type="number"
                  placeholder="0"
                  className="border rounded-md p-2 text-sm text-white text-center w-16"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 border-2 py-3 space-y-2">
                <CharacterStats label="Strength" value="10" modifier="1"/>
                <CharacterStats label="Dexterity" value="12" modifier="1"/>
                <CharacterStats label="Constitution" value="14" modifier="1"/>
                <CharacterStats label="Intelligence" value="16" modifier="1"/>
                <CharacterStats label="Wisdom" value="18" modifier="1"/>
                <CharacterStats label="Charisma" value="20" modifier="1"/>
              </div>
            </div>
            <div className="space-y-1">
              <div className="grid grid-cols-1 border-2 p-1">
                <SavingThrows label="Strength" value="10" />
                <SavingThrows label="Dexterity" value="12" />
                <SavingThrows label="Constitution" value="30" />
                <SavingThrows label="Intelligence" value="30" />
                <SavingThrows label="Wisdom" value="30" />
                <SavingThrows label="Charisma" value="30" />
                <p className='text-center text-sm'>Saving Throws</p>
              </div>
              <div className="grid grid-cols-1 mt-1 border-2 p-1 justify-end items-end">
                <SavingThrows label="Acrobatics" value="10" />
                <SavingThrows label="Animal Handling" value="12" />
                <SavingThrows label="Arcana" value="30" />
                <SavingThrows label="Athletics" value="30" />
                <SavingThrows label="Deception" value="30" />
                <SavingThrows label="History" value="30" />
                <SavingThrows label="Insight" value="10" />
                <SavingThrows label="Intimidation" value="12" />
                <SavingThrows label="Investigation" value="30" />
                <SavingThrows label="Medicine" value="30" />
                <SavingThrows label="Nature" value="30" />
                <SavingThrows label="Perception" value="30" />
                <SavingThrows label="Performance" value="10" />
                <SavingThrows label="Persuasion" value="12" />
                <SavingThrows label="Religion" value="30" />
                <SavingThrows label="Sleight of Hand" value="30" />
                <SavingThrows label="Stealth" value="30" />
                <SavingThrows label="Survival" value="30" />
                <p className='text-center text-sm'>Skills</p>
              </div>
              {/* removed until mobile is formatted. This destroyed the mobile page */}
              {/* <div className="text-center border-2 h-32">
                <p className="text-xs">Passive Wisdom (Perception)</p>
                <input
                  type="number"
                  placeholder="0"
                  className="border rounded-md p-2 mt-2 text-sm text-white text-center w-16"
                />
              </div> */}
            </div>
            <div className="space-y-1 w-1/2">
              <div className="grid grid-cols-3 gap-4 border-2 p-1">
                <Attribute label="Max HP" value="10" />
                <Attribute label="Current HP" value="12" />
                <Attribute label="Temp HP" value="30" />
              </div>
              <div className="mt-1 grid grid-cols-3 gap-4 border-2 p-1">
                <Attribute label="Armor Class" value="10" />
                <Attribute label="Initiative" value="12" />
                <Attribute label="Speed" value="30" />
              </div>
              <div className="flex text-center mt-1 space-x-1">
                <div className="w-1/2 border-2">
                  <HitDice label="Total" />
                  Hit Dice
                </div>
                <div className="w-1/2 border-2">
                  <div>
                    <DeathSaves label="Success"/>
                    <DeathSaves label="Failure"/>
                  </div>
                  Death Saves
                </div>
              </div>
              <div className="text-xl text-center border-2 p-1 mt-1">
                <AttAndSpells />
              </div>
              <div>
                <CharacterEquipment value="Equipment" />
              </div>
              <div>
                <CharacterText className="col-span-2" value="Other Proficiencies and Languages" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="grid grid-cols-1 border-2 p-1">
                <CharacterText label="Personality Traits" value="Traits" />
                <CharacterText label="Ideals" value="Ideals" />
                <CharacterText label="Bonds" value="Bonds" />
                <CharacterText label="Flaws" value="Flaws" />
              </div>
              <div className="grid grid-cols-1 border-2 p-1">
                <CharacterText label="Features & Traits" value="F&T" />
              </div>
            </div>
          </div>
        </div>
      </main>


      {/* Sheet Two */}
      <main className="flex flex-col items-center">
        <div className="bg-white rounded-md shadow-md p-4 w-full">
          <div className="flex">
            <div className="grid grid-cols-2">
              <div>
                Character Name
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  className="border rounded-md p-2 text-lg w-full"
                />
              </div>
              <div className="grid grid-cols-3">
                <div>
                  Age
                  <input
                    type="text"
                    placeholder="Age"
                    className="border rounded-md p-2 text-lg w-full"
                  />
                </div>
                <div>
                  Height
                  <input
                    type="text"
                    placeholder="Height"
                    className="border rounded-md p-2 text-lg w-full"
                  />
                </div>
                <div>
                  Weight
                  <input
                    type="text"
                    placeholder="Weight"
                    className="border rounded-md p-2 text-lg w-full"
                  />
                </div>
              </div>              
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="flex col-start-2">
              <div>
                Eyes
                <input
                  type="text"
                  placeholder="Eyes"
                  className="border rounded-md p-2 text-lg w-full"
                />
              </div>
              <div>
                Skin
                <input
                  type="text"
                  placeholder="Skin"
                  className="border rounded-md p-2 text-lg w-full"
                />
              </div>
              <div>
                Hair
                <input
                  type="text"
                  placeholder="Hair"
                  className="border rounded-md p-2 text-lg w-full"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <div className="grid grid-cols-3 space-x-1">
              <div className="border-2 p-1">
                <CharacterText label="Character Appearance" value={description} />
              </div>
              <div className="border-2 p-1 col-span-2">
                <CharacterText label="Allies and Organizations" />
              </div>
            </div>
            <div className="grid grid-cols-3 space-x-1">
              <div className="border-2 p-1">
                <CharacterText label="Character Backstory" value={background}/>
              </div>
              <div className="border-2 p-1 col-span-2">
                <CharacterText label="Additional Features & Traits" />
                <CharacterText label="Treasures" />
              </div>
            </div>
          </div>

        </div>
      </main>


      {/* Sheet Three */}
      <main className="flex flex-col items-center">
        <div className="bg-white rounded-md shadow-md p-4 w-full">
          <div className="flex">
            <div className="grid grid-cols-2">
              <div>
                Character Name
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  className="border rounded-md p-2 text-lg w-full"
                />
              </div>
              <div className="grid grid-cols-3">
                <div>
                  Spell Ability
                  <input
                    type="text"
                    placeholder="Spell Ability"
                    className="border rounded-md p-2 text-lg w-full"
                  />
                </div>
                <div>
                  Spell Save DC
                  <input
                    type="text"
                    placeholder="Spell Save DC"
                    className="border rounded-md p-2 text-lg w-full"
                  />
                </div>
                <div>
                  Spell Att Bonus
                  <input
                    type="text"
                    placeholder="Spell Att Bonus"
                    className="border rounded-md p-2 text-lg w-full"
                  />
                </div>
              </div>              
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <div className="grid grid-cols-3 space-x-1">
              <div className="p-1 space-y-1">
                <div className="border-2">
                  <CharacterCantrips value="0" label="Cantrips" />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                </div>
                <div className="border-2 p-1">
                  <CharacterSpells label="Spell Level" level='1' value='0' />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                </div>
                <div className="border-2 p-1">
                  <CharacterSpells label="Spell Level" level='2' value='0' />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                </div>
                
              
              </div>
              <div className="p-1 space-y-1">
                <div className="border-2 p-1">
                  <CharacterSpells label="Spell Level" level='3' value='0' />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                </div>
                <div className="border-2 p-1">
                  <CharacterSpells label="Spell Level" level='4' value='0' />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                </div>
                <div className="border-2 p-1">
                  <CharacterSpells label="Spell Level" level='5' value='0' />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                </div>
              </div>
              <div className="p-1 space-y-1">
                <div className="border-2 p-1">
                  <CharacterSpells label="Spell Level" level='6' value='0' />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                </div>
                <div className="border-2 p-1">
                  <CharacterSpells label="Spell Level" level='7' value='0' />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                </div>
                <div className="border-2 p-1">
                  <CharacterSpells label="Spell Level" level='8' value='0' />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                </div>
                <div className="border-2 p-1">
                  <CharacterSpells label="Spell Level" level='9' value='0' />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                  <SpellNames />
                </div>
              </div>
              
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}