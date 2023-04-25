import {useState} from 'react'
import axios from 'axios'
import RandomEncounter from '../components/random-encounter/random-monsters.js'

export default function EncounterPage(props) {
  return (
    <div>
      <h1 className="text-3xl text-center font-bold underline mb-6">
        Random Encounter
      </h1>

      <RandomEncounter />
    </div>
  )
}
