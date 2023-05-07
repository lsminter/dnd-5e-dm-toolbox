export default function Attribute({ label, value }) {
  return (
    <div className="flex flex-col text-center">
      <input
        type="number"
        placeholder={value}
        className="border rounded-md p-2 text-sm text-white w-14"/>
      <span className="text-xs">{label}</span>
    </div>
  );
}