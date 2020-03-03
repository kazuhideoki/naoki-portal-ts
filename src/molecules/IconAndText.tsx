import React from 'react'
import { Typography } from '@material-ui/core'
import { useStylesFactory } from '../modules/useStylesFactory'

const styles = {
    root : {
        textAlign: "center",
    },
}

export const IconAndText = (props:any) => {
    const classes = useStylesFactory(styles)

    return (
        <div className={classes.root}>
        <props.icon
            onClick={() => props.onclick()}
            className={props.classNameIcon}
            {...props}
        />
        <Typography variant="body2">
            {props.text}
        </Typography>
        </div>
    )
}


