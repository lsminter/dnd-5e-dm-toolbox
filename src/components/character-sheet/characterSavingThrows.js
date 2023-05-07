export default function SavingThrows({ label, value }) {
  return (
    <div className="flex justify-between">
      <input type="checkbox" />
      <div className="flex flex-col text-end justify-end items-end">
        <span className="text-xs">{label}</span>
        <input className="text-xs w-10 pl-1 bg-white text-black" type='number' placeholder={value}/>
      </div>
    </div>
  );
}