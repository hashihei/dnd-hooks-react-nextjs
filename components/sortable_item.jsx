import React, { useContext } from 'react';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Store } from '../store/index';

export const Item = (props) => {

  const { globalState, setGlobalState } = useContext(Store)

  const inlineStyles = {
      opacity: '1',
      transformOrigin: '0 0',
      height: "150px",
      backgroundSize: '100%',
      backgroundPosition: 'center'
  };

  if(typeof globalState.images.dataContainer[props.id] === 'undefined'){
    return <></>
  }else{
    return <img id={props.id} style={inlineStyles} src={globalState.images.dataContainer[props.id].imgsData} />
  }
};


export const SortableItem = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Item 
        id={props.id}
      />
    </div>
  ); 
}
