export default function CharacterCantrips({ label, cantripNumber, setCantripNumber, cantrip  }) {
  return (
    <div className="pl-2 pt-2">
      <div className="grid grid-cols-3">
        <input
          type="number"
          placeholder="0"
          name={cantrip}
          value={cantripNumber}
          onChange={setCantripNumber}
          className="p-[2px] w-10"
        />
        <p className="w-9 col-span-2 font-bold">{label}</p>
      </div>
    </div>
  );
}
