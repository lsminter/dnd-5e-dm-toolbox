export default function AttAndSpells({ label, value }) {
  return (
    <div className="flex flex-col text-center">
      <div className="flex text-center text-sm">
        <div className="text-center w-full">
          Name
        </div>
        <div className="text-center w-full">
          Atk Bonus
        </div>
        <div className="text-center w-full">
          Damage/Type
        </div>
      </div>
      <div className="space-y-1 mb-1">
        <div className="flex space-x-1">
          <input type="text" className="w-full bg-white text-black border-2" />
          <input type="text" className="w-full bg-white text-black border-2" />
          <input type="text" className="w-full bg-white text-black border-2" />
        </div>
        <div className="flex space-x-1">
          <input type="text" className="w-full bg-white text-black border-2" />
          <input type="text" className="w-full bg-white text-black border-2" />
          <input type="text" className="w-full bg-white text-black border-2" />
        </div>
        <div className="flex space-x-1">
          <input type="text" className="w-full bg-white text-black border-2" />
          <input type="text" className="w-full bg-white text-black border-2" />
          <input type="text" className="w-full bg-white text-black border-2" />
        </div>
      </div>
      <span className="text-sm w-full border-2 max-h-full">
        <textarea className="w-full bg-white text-black h-40" type="text" placeholder={value}/>
      </span>
      <p className="text-sm">Attacks & Spellcasting</p>
    </div>
  );
}