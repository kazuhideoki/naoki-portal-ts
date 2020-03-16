import React from 'react'
import { Typography } from '@material-ui/core'
import { useStylesFactory } from '../modules/useStylesFactory'
import { ThemeType } from '../modules/ThemeContext'
import { Store } from '../modules/Store'

const styles = {
    root : {
        textAlign: "center",
    },
    icon: {
        fontSize: (themes: ThemeType) => themes.icon,
    },
    img: {
        height: (themes: ThemeType) => themes.icon,
    }
} 

export const IconAndText = (props:any) => {
    const classes = useStylesFactory(styles)
    const {dispatchAppState} = React.useContext(Store)
    let onClick: () => void
    if (props.onClose && props.onClick) {
        onClick = () => {
            dispatchAppState({type: 'CLOSE_MODAL'})
            props.onClick()
        } 
    } else if(props.onClick) {
        onClick = () => props.onClick()
    } else if(props.onClose) {
        onClick = () => dispatchAppState({ type: "CLOSE_MODAL" });
    }

    let icon 
    // svgのアイコンはiconに入れる
    if (props.icon) {
        icon = <props.icon
            // onClick={(props.onClick) ? () => props.onClick() : null}
            onClick={() => onClick()}
            className={classes.icon}
            {...props}
        />
    // 画像はurlをimgに入れる。
    }else if(props.img) {
        icon = <img
            src={props.img}
            alt=""
            // onClick={() => props.onClick()}
            onClick={() => onClick()}
            className={`${classes.img} ${props.className}`}        />
    }

    return (
        <div className={classes.root}>
            {icon}
            <Typography variant="body2">
                {props.text}
            </Typography>
        </div>
    )
}


