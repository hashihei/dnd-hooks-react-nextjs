import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: "100px",
    height: "100px",
    backgroundColor: "skyblue",
    margin: "10px",
    borderRadius: 4,
    display: "flex",
    position: "relative",
    flexwrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  };
  
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.id}
    </div>
  );
}

export default SortableItem;