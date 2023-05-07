export default function CharacterCantrips({ label, level, value }) {
  return (
    <div className="pl-2">
      <div className="grid grid-cols-3">
        <p className="self-center text-black text-xl font-bold" placeholder={value}>
          {value}
        </p>
        <p className='w-9 col-span-2 font-bold'>
          {label}
        </p>
      </div>
      
    </div>
  );
}