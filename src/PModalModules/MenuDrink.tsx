import React from 'react'
import menuDrink from "../img/drink-img.jpg";
import menuDrinkJa from "../img/drink-img-ja.jpg";
import { Store } from '../modules/Store';

export const MenuDrink = (props: any) => {
    const {wpParams} = React.useContext(Store)
    const img = wpParams.isJa ? menuDrinkJa : menuDrink

    return <img src={img} alt="" style={{ width: "100%" }} />;
}
