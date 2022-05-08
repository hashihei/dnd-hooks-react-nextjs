import React  from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy
} from "@dnd-kit/sortable";
import { Grid } from './Grid'
import { SortableItem } from "./sortable_item";

const containerStyle = {
  padding: 10,
  margin: 10,
  flex: 1
};

const containerBackgroundStyle = {
  width: "100%",
  minHeight: "170px",
  marginBottom: "50px",
  backgroundColor: "#e3e3e3",
  borderRadius: "15px",
};

const containerSubjectStyle = {
  marginTop: "50px",
  marginBottom: "10px",
};

export default function Container(props) {
  const { id, itemLists } = props;

  const { setNodeRef } = useDroppable({
    id
  });

  return (
    <SortableContext
      id={id}
      items={itemLists}
      strategy={rectSortingStrategy}  
    >
      {/* print container title */}
      <div style={containerSubjectStyle}>{props.id}</div>
      <div ref={setNodeRef} style={containerBackgroundStyle}>
      {
        <Grid columns={5} style={containerStyle}>
            {
              typeof itemLists !== 'undefined' &&
                  itemLists.map((itemNo) => (
                      <SortableItem id={itemNo} key={itemNo} />
                  ))    
            }
        </Grid>
      }
      </div>
    </SortableContext>
  );
}
