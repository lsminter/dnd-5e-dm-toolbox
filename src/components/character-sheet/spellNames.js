export default function SpellNames({ label }) {
  return (
    <div className="flex justify-between p-1">
      <div className="self-center">
        <input type="checkbox" />
      </div>
      <div className="flex flex-col text-end content-start">
        <input className="bg-white text-black border-2" />
      </div>
    </div>
  );
}