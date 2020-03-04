import React from 'react'
import menuDrink from "../img/drink-img.jpg";
import { StyledPaper } from '../StyledComponent/StyledPaper';

export const MenuDrink = (props: any) => {
    return (
        <StyledPaper className={props.menuLists}>
            <img src={menuDrink} alt="" style={{ width: "100%" }}/>
        </StyledPaper>
    )
}
