import React from 'react'
import { HighlightOff } from '@material-ui/icons';
import { withStyles } from '@material-ui/core';

export const CloseButton = (props:any) => {
    let position = 'absolute'
    let top = -8
    let right = -8
    if(props.fix){
        position = "fixed";
        top = 40
        right = 40
    }
    //@ts-ignore
    const StyledHighlightOff = withStyles({
        root: {
            fontSize: '70px',
            zIndex: 10,
            position: position,
            top: top,
            right: right,
            opacity: '0.8',
        }
    })(HighlightOff);

    return (
        <StyledHighlightOff onClick={props.onClick} />
    )
}
