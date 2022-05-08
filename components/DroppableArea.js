import React, { useCallback, useState, useContext } from 'react'
import { useDropzone } from 'react-dropzone'
import { Store } from '../store/index'

const dropAreaStyle = {
    width: "100%",
    height: "100px",
    backgroundColor: "#eeeeee",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: "50px",
    borderRadius: "15px",
};

const DroppableArea = () => {
    const { globalState, setGlobalState } = useContext(Store)

    const onDrop = useCallback(acceptedFiles => {
        let imgsJSONdata = globalState.images;
        const initialDataLength = globalState.images.dataContainer.length;

        console.log("mainContainerList-before:" + imgsJSONdata.mainContainerList)
        // Do someting with the files.
        acceptedFiles.map((file, index) => {
            const imgIndex = String(initialDataLength + index);
            imgsJSONdata.dataContainer.push({imgsNo: imgIndex, imgsPath: '', imgsTEXT: '', imgsData: URL.createObjectURL(file)})
            imgsJSONdata.mainContainerList.push(imgIndex)
        });
        console.log("mainContainerList-after:" + imgsJSONdata.mainContainerList)
        setGlobalState({type: 'SET_IMAGES', payload: { images: imgsJSONdata }});
    },[globalState]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop})

    return (
        <div style={dropAreaStyle} { ...getRootProps() }>
            <input { ...getInputProps() } />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files.</p>
            }
        </div>
    )
}

export default DroppableArea