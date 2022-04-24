import React, { useCallback, useState, useContext } from 'react'
import { useDropzone } from 'react-dropzone'
import styles from '../styles/DroppableArea.module.css';
import { Store } from '../store/index'

const DroppableArea = () => {
    const { globalState, setGlobalState } = useContext(Store)

    const onDrop = useCallback(acceptedFiles => {
        let imgsJSONdata = globalState.images;

        // Do someting with the files.
        acceptedFiles.map((file, index) => {
            const imgIndex = globalState.images.length + index;
            imgsJSONdata.push({imgsNo: imgIndex, imgsPath: '', imgsTEXT: '', imgsData: URL.createObjectURL(file)})
        });

        setGlobalState({type: 'SET_IMAGES', payload: { images: imgsJSONdata }});
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop})

    return (
        <div className={styles.dropArea} { ...getRootProps() }>
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