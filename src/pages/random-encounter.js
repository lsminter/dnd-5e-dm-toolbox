import SelectedMonsterStats from '../components/random-encounter/selected-monster-stats.js'

export default function EncounterPage(props) {
  return (
    <div className="min-h-screen">
      <h1 className="text-3xl text-center font-bold underline mb-6">
        Random Encounter
      </h1>

      <SelectedMonsterStats />
    </div>
  )
}
