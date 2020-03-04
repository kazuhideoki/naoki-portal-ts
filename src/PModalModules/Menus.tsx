import React from 'react'
import { IconAndText } from '../molecules/IconAndText'
import treatmentIcon from "../img/menu-treatment.png";
import { useStylesFactory } from '../modules/useStylesFactory';
import {
    FreeBreakfastTwoTone,
    ListTwoTone
} from "@material-ui/icons";

const styles = {
    root: {
        display: "flex",
    },
    menuTreatment: {
        width: 90
    }
}

export const Menus = (props: any) => {
    const classes = useStylesFactory(styles)

    const img = <img
        src={treatmentIcon}
        alt=""
    />
    
    return (
        <div className={classes.root}>
            <IconAndText
                icon={FreeBreakfastTwoTone}
                classNameIcon={props.icon}
                onClick={() => props.openModal("menuDrink")}
            />
            <IconAndText
                icon={ListTwoTone}
                classNameIcon={props.icon}
                onClick={() => props.openModal("menu")}
            />
            <img
                src={treatmentIcon}
                alt=""
                onClick={() => props.openModal("menuTreatment")}
                className={classes.menuTreatment}
            />
        </div>
    )
}
