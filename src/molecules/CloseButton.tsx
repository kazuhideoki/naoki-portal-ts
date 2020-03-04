import React from 'react'
import { HighlightOff } from '@material-ui/icons';
import { withStyles } from '@material-ui/core';
import { Store } from '../modules/Store';

export const CloseButton = (props:any) => {

    const StyledHighlightOff = withStyles({
        root: {
            fontSize: '90px',
            position: 'absolute',
            top: 0,
            right: 0,
            opacity: '0.7'
        }
    })(HighlightOff);

    return (
        <StyledHighlightOff onClick={props.onClick} />
    )
}
