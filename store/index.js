import React, { createContext, useReducer } from 'react'

const droppableImageState = {
    images: []
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_images':
            return {...state, images: action.payload.images}
        default :
            return state
    }
}

export const Store = createContexxt ({
    globalState: droppableImageState,
    setGlobalState: () => null
})

export const StoreProvider = ({children}) => {
    const [globalState, setGlobalState] = useReducer( recuder, droppableImageState)

    return (
        <Store.Provider value={{ globalState, setGlobalState }}>{children}</Store.Provider>
    )
}

export default StoreProvider