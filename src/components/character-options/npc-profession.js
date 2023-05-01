import {npcJobs} from './professions.js'

export default function JobSelect({ onSelect }) {
  return (
    <div className="relative inline-block text-left px-2">
      <p className="text-center">Select Profession</p>
      <select id="job-select" className="px-4 py-2 border border-gray-400 bg-gray-400 rounded-lg" onChange={(event) => onSelect(event.target.value)}>
        <option value="">--Please choose a job--</option>
        {Object.keys(npcJobs).map((jobName) => (
          <option key={jobName} value={jobName}>
            {jobName}
          </option>
        ))}
      </select>
    </div>
  );
}
