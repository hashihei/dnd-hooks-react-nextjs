import React, {forwardRef, useContext,} from 'react';
import { Store } from '../store/index';

export const Photo = forwardRef(({url, index, faded, style, ...props}, ref) => {
    const { globalState, setGlobalState } = useContext(Store);

    const inlineStyles = {
        opacity: faded ? '0.2' : '1',
        transformOrigin: '0 0',
        width: "125px",
        height: "150px",
        // gridRowStart: index === 0 ? 'span 2' : null,
        // gridColumnStart: index === 0 ? 'span 2' : null,
        backgroundImage: `url(${globalState.images[index].imgsData})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'grey',

        ...style,
    };

  return <div ref={ref} style={inlineStyles} {...props} />;
});
