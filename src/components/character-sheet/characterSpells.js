export default function CharacterSpells({ label, level, value }) {
  return (
    <div className="flex flex-col text-center">
      <div className="grid grid-cols-3 text-xs">
        <div className="flex">
          <p className='w-9'>
            {label}
          </p>
          <p className="self-center text-black text-xl font-bold" placeholder={value}>
            {level}
          </p>
        </div>
        <div className="col-span-2">
          <div className="flex space-x-1 mr-2">
            <div className="flex">
              <p>
                Slots Total
              </p>  
              <input className="w-8 text-white text-center rounded-md" type='number' placeholder={value}/>
            </div>
            <div className="flex">
              <p>
                Slots Used
              </p>  
              <input className="w-8 text-white text-center rounded-md" type='number' placeholder={value}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}