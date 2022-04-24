import React, { useContext, useEffect, useState } from 'react'
import UseImageSort from '../components/UseImageSort'
import DroppableArea from '../components/DroppableArea'
import { Store } from '../store/index'

import { EventEmitter } from 'events';
const eventStore = new EventEmitter()

const ImageSortMainArea = () => {
  const [state, setState] = useState([])
  const { globalState, setGlobalState } = useContext(Store)

  useEffect(() => {
    // Storeからstateをセットするハンドラ
    const onChange = newState => setState({...newState})
    // ハンドラをeventStoreに登録
    eventStore.on('change', onChange)
    // ComponentがDOMから削除されたときの後処理としてハンドラも削除
    return () => eventStore.removeListener('change', onChange)
  },[globalState])

  return (
    <>
      <UseImageSort  globalState={globalState} setGlobalState={setGlobalState} />
      <DroppableArea globalState={globalState} setGlobalState={setGlobalState} />
    </>
  )
}

export default ImageSortMainArea