import React from 'react'
import { Typography } from '@material-ui/core'
import { useStylesFactory } from '../modules/useStylesFactory'
import { ThemeType } from '../modules/ThemeContext'

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

    let icon 
    // svgのアイコンはiconに入れる
    if (props.icon) {
        icon = <props.icon
            onClick={(props.onClick) ? () => props.onClick() : null}
            className={classes.icon}
            {...props}
        />
    // 画像はurlをimgに入れる。
    }else if(props.img) {
        icon = <img
            src={props.img}
            alt=""
            // onClick={() => props.onClick()}
            onClick={() => props.onClick()}
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


