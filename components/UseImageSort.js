import React, { useState } from 'react';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSwappingStrategy,

} from '@dnd-kit/sortable'

import SortableItem from './SortableItem';
import styles from '../styles/UseImageSort.module.css';

const UseImageSort = () => {

  const [items, setItems] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9']);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  function handleDragEnd(event){
    const {active, over} = event;

    if(active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className={styles.sortableAreaContainer}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items}
          strategy={rectSwappingStrategy}
          >
          {items.map(id => <SortableItem key={id} id={id} /> )}
        </SortableContext>
      </DndContext>
    </div>
  );

}

export default UseImageSort