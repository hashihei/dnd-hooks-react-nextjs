import React, { createContext, useReducer } from 'react'

const droppableImageState = {
    sku: '0000AA000000',
    images: {
        dataContainer: [],
        topContainerList: [],
        colorContainerList: [],
        mainContainerList: [],
        deleteContainerList: []
    }
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_MAIN_IMAGES':
            return {...state, images: action.payload.images}
        case 'SET_SKU':
            return {...state, sku: action.payload.sku}
        default :
            return state
    }
}

export const Store = createContext ({
    globalState: droppableImageState,
    setGlobalState: () => null
})

export const StoreProvider = ({children}) => {
    const [globalState, setGlobalState] = useReducer( reducer, droppableImageState)

    return (
        <Store.Provider value={{ globalState, setGlobalState }}>{children}</Store.Provider>
    )
}

export default StoreProvider