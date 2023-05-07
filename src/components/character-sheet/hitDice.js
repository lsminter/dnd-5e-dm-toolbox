export default function HitDice({ label }) {
  return (
    <div className="">
      <div className="flex space-x-1 m-1">
        <div className="flex flex-col text-start content-start">
          <span className="text-xs">{label}</span>
        </div>
        <div className="justify-start">
          <input type="text" className="bg-white text-black border-2 w-full" />
        </div>
      </div>
      <div className="justify-start m-1">
        <input type="text" className="bg-white text-black text-sm border-2 w-full" />
      </div>
    </div>
  );
}