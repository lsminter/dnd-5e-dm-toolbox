function AdditionalInfo({ selectedAdditionalInfo }) {

  return (
    <div className="relative inline-block text-left px-2">
      <div>
        <p className="text-center">Add additional Info</p>
        <input className="w-full pl-2" id="info" onChange={selectedAdditionalInfo}/>
      </div>
    </div>
  );
}

export default AdditionalInfo;