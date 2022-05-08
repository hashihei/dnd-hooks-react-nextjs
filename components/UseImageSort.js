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
  useSortable
} from '@dnd-kit/sortable'

import { Item } from './sortable_item';
import { Store } from '../store/index';
import Container from './container';

const wrapperStyle = {
  width: "100%",
  
};

const UseImageSort = () => {

  const { globalState, setGlobalState } = useContext(Store)
  const [items, setItems] = useState({
    dataContainer: [],
    topContainerList: [],
    colorContainerList: [],
    mainContainerList: [],
    deleteContainerList: []
  });
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  useEffect(() => {
    const newItems = { ...globalState.images };
    setItems(newItems); 
  },[globalState]);
  

  const defaultAnnouncements = {
    onDragStart(id) {
    //   console.log(`Picked up draggable item ${id}.`);
    },
    onDragOver(id, overId) {
        if (overId) {
        // console.log(
        //   `Draggable item ${id} was moved over droppable area ${overId}.`
        // );
        return;
        }

    //   console.log(`Draggable item ${id} is no longer over a droppable area.`);
    },
    onDragEnd(id, overId) {
        if (overId) {
        // console.log(
        //   `Draggable item ${id} was dropped over droppable area ${overId}`
        // );
        setGlobalState({type: 'SET_IMAGES', payload: { images: items }});
        console.log("DragEnd-mainContainerList:" + globalState.images.mainContainerList)
        return;
        }

    //   console.log(`Draggable item ${id} was dropped.`);
    },
    onDragCancel(id) {
    //   console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`);
    }
  };


  return (
    <div style={wrapperStyle}>
        <DndContext
            announcements={defaultAnnouncements}
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <Container id="topContainerList" itemLists={items.topContainerList}  />
            <Container id="colorContainerList" itemLists={items.colorContainerList} />
            <Container id="mainContainerList" itemLists={items.mainContainerList} />
            <Container id="deleteContainerList" itemLists={items.deleteContainerList} />

            <DragOverlay>
                {activeId ? (
                <Item id={activeId} />
                ) : null}
            </DragOverlay>
        </DndContext>
    </div>
  );

  function findContainer(id) {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key].includes(id));
  }

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;

    setActiveId(id);
  }

  function handleDragOver(event) {
    const { active, over, draggingRect } = event;
    const { id } = active;
    const { id: overId } = over;
    
    // Find the containers
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.indexOf(id);
      const overIndex = overItems.indexOf(overId);

      let newIndex;
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          draggingRect &&
          overIndex === overItems.length - 1 &&
          draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item !== active.id)
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length)
        ]
      };
    });
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = items[activeContainer].indexOf(active.id);
    const overIndex = items[overContainer].indexOf(overId);

    if (activeIndex !== overIndex) {
        setItems((items) => ({
          ...items,
          [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
        }));
    }
    setActiveId(null);
  }
}

export default UseImageSort