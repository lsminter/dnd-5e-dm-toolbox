function AdditionalInfo({ selectedAdditionalInfo }) {

  return (
    <div className="relative inline-block text-left px-2">
      <div>
        <p className="text-center">Add additional Info</p>
        <input className="px-4 py-2 border border-gray-400 bg-gray-400 rounded-lg w-full" id="info" onChange={selectedAdditionalInfo}/>
      </div>
    </div>
  );
}

export default AdditionalInfo;