import React from 'react'
import { pickStaffImg } from "../modules/pickStaffImg";
import { staffImg } from "../img/staff/staffImg";
import { Button } from '@material-ui/core';
import { sortDataUsers } from '../modules/organizeData';
import { Store } from '../modules/Store';
import { useStylesFactory } from '../modules/useStylesFactory';

const styles = {
    staffImg: {
        width: 70
    },
    button: {
        fontSize: '1.5em',
    }
}

export const AuthorModal = (props: any) => {
    const classes = useStylesFactory(styles)
    const { wpData } = React.useContext(Store)

    const authors = sortDataUsers(wpData.users);

    let auhtorsWrap = authors.filter(function (value) {
        // 表示させない人を省く
        if (value.name === "Naoki Hair Dressing" || value.name === "Kenji" || value.name === "meiko") {
            return false; // skip
        }
        return true;
    }).map((value, key) => {
        const payload = value.id
        const img = pickStaffImg(staffImg, payload)
        const type = "AUTHOR"
        return (
            <Button className={classes.button} key={key} onClick={() => props.setParamsAndClose({ type, payload })}>
                <img src={img} alt="" className={classes.staffImg} />{value.name}
            </Button>
        )
    });
    return <div className={props.className}>{auhtorsWrap}</div>;
}
