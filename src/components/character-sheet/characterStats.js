export default function CharacterStats({ label, value, modifier }) {
  return (
    <div className="flex flex-col text-center justify-center items-center space-y-1">
      <span className="text-sm">{label}</span>
      <input className="border rounded-md p-1 text-2xl text-white w-14" placeholder={value}/>
      <input className="border rounded-md p-1 text-sm text-white w-14" type='text' placeholder={`+${modifier}`}/>
    </div>
  );
}