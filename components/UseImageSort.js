import React, { useState, useContext, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable'

import {Grid} from './Grid';
import {SortablePhoto} from './SortablePhoto';
import {Photo} from './Photo';
import styles from '../styles/UseImageSort.module.css';
import { Store } from '../store/index'

const UseImageSort = () => {

  const { globalState, setGlobalState } = useContext(Store)
  const [items, setItems] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(MouseSensor),
     useSensor(TouchSensor));


  useEffect(() => {
    let newItems = [];

    if (globalState.images.length > 0) {
      globalState.images.map((item) => {
        newItems.push(String(item.imgsNo))
      });  
    }
    if (newItems.length > 0){
      setItems(newItems);
    } 
  },[globalState]);
  
  return (
    <div className={styles.sortableAreaContainer}>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <Grid columns={5}>
          {items.map((url, index) => (
            <SortablePhoto key={url} url={url} index={index} />
          ))}
        </Grid>
      </SortableContext>

      <DragOverlay adjustScale={true}>
        {activeId ? (
          <Photo url={activeId} index={items.indexOf(activeId)} />
        ) : null}
      </DragOverlay>
    </DndContext>

    </div>
  );

  function handleDragStart(event){
    setActiveId(event.active.id)
  }

  function handleDragEnd(event){
    const {active, over} = event;

    console.log("active:" + active.id + " over:" + over.id);

    if(active.id !== over.id) {
      let oldIndex;
      let newIndex;
      setItems((items) => {
        oldIndex = items.indexOf(active.id);
        newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });

      setGlobalState({type: 'SET_IMAGES', payload: { images: arrayMove(globalState.images, oldIndex, newIndex) }});
      setActiveId(null);
    }
  }

  function handleDragCancel(){
    setActiveId(null);
  }

}

export default UseImageSort