import { useState } from 'react'
import { DndContext, KeyboardSensor, PointerSensor, closestCorners, useSensor, useSensors } from "@dnd-kit/core"
import { Column } from './components/Column/Column';
import './App.css'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Input } from './components/Input/Input';


export default function App() {
  const [magnets, setMagnets] = useState([
    { id: 1, title: "Add tests to homepage"},
    { id: 2, title: "Fix styling in about section"},
    { id: 3, title: "Learn how to center a div"},
  ]);

  const addMagnet = title => {
    setMagnets(magnets => [...magnets, {id: magnets.length + 1, title}])
  }

  const getMagnetPos = id => magnets.findIndex(magnet => magnet.id === id)
  
  const handleDragEnd = event => {
    const {active, over} = event

    if(active.id === over.id) return;

    setMagnets(magnets => {
      const originalPos = getMagnetPos(active.id)
      const newPos = getMagnetPos(over.id)

      return arrayMove(magnets, originalPos, newPos)
    })
  }

  const sensors = useSensors(
    useSensor(PointerSensor), 
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  return (
    <div className="App">
      <h1>My Magnets</h1>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
      <Input onSubmit={addMagnet} />
      <Column magnets={magnets} />
      </DndContext>
    </div>
  )
}

