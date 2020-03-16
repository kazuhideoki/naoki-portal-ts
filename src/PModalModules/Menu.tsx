import React from 'react'
import menu from "../img/menu-img.jpg"; 
import menuJa from "../img/menu-img-ja.jpg"; 
import { Store } from "../modules/Store";

export const Menu = () => {
    const { wpParams } = React.useContext(Store);
    const img = wpParams.isJa ? menuJa : menu;

    return <img src={img} alt="" style={{ width: "100%" }} />;
}
