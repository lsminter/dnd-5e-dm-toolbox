export default function CharacterEquipment({ label, value }) {
  return (
    <div className="flex flex-col text-center">
      <span className="text-sm">{label}</span>
      <span className="text-sm w-full border-2">
        <textarea className="w-full bg-white text-black h-56" type="text" placeholder={value}/>
      </span>
    </div>
  );
}