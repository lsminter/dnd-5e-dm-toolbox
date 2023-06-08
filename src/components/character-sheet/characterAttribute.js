export default function Attribute({ label, attributeValue, setAttributeValue, name }) {
  return (
    <div className="flex flex-col text-center">
      <input
        type="number"
        value={attributeValue}
        name={name}
        onChange={setAttributeValue}
        className="border rounded-md p-2 place-self-center text-sm text-white w-14"/>
      <span className="text-xs">{label}</span>
    </div>
  );
}