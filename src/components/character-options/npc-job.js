import {npcJobs} from './professions.js'

export default function JobList({ jobName }) {
  const job = jobName ? npcJobs[jobName] : [0];

  return (
    <div className="relative inline-block text-left px-2">
      <div>
        <p className="text-center">Select Job</p>
        <select id="job-list" className="px-4 py-2 border border-gray-400 bg-gray-400 rounded-lg w-full text-center">
        <option value="">--Please choose a Job--</option>
          {job.map((jobTitle) => (
            <option key={jobTitle.name} value={jobTitle.name}>
              {jobTitle.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
