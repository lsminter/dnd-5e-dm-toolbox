export default function CharacterText({ label, value }) {
  return (
    <div className="flex flex-col text-center">
      <span className="text-sm">{label}</span>
      <span className="text-sm w-full border-2 max-h-full">
        <textarea className="w-full bg-white text-black h-40" type="text" value={value}/>
      </span>
    </div>
  );
}