import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import styles from '../styles/DroppableArea.module.css';

const DroppableArea = () => {

    const onDrop = useCallback(acceptedFiles => {
        // Do someting with the files.
        console.log('acceptedFiles: ', acceptedFiles);
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