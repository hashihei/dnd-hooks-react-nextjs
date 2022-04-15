import React from 'react'
import styles from '../styles/Home.module.css'

//image url
const imageList = [
  'https://picsum.photos/id/1014/200/300',
  'https://picsum.photos/id/1015/200/300',
  'https://picsum.photos/id/1016/200/300',
  'https://picsum.photos/id/1018/200/300',
  'https://picsum.photos/id/1019/200/300',
  'https://picsum.photos/id/102/200/300',
  'https://picsum.photos/id/1020/200/300',
  'https://picsum.photos/id/1021/200/300',
  'https://picsum.photos/id/1024/200/300'
];

//Hooks
const UseImageSortHooks = () => {
  return (
    <div>
      <h2>useImageSortHooks</h2>
      <div className={styles.imageTable}>
        {/* output image */
          imageList.map((image, index) => (
            <img key={index} src={image} />
          ))
        }
      </div>
    </div>
  )
}

export default UseImageSortHooks