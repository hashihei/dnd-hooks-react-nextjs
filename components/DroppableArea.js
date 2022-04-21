import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import styles from '../styles/DroppableArea.module.css';

const DroppableArea = () => {

    const [imgs, setImgs] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        // Do someting with the files.
        acceptedFiles.map((file) => {
            imgs.push(URL.createObjectURL(file))
            setImgs(imgs);
        });
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
            {
                imgs.map((img) => (
                    <img src={img} />
                ))
            }
        </div>
    )
}

export default DroppableArea