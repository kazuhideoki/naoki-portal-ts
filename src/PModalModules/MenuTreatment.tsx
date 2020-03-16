import React from 'react'
import menuTreatment from "../img/menu-treatment-img.jpg";
import menuTreatmentJa from "../img/menu-treatment-img-ja.jpg";
import { Store } from "../modules/Store";

export const MenuTreatment = () => {
     const { wpParams } = React.useContext(Store);
     const img = wpParams.isJa ? menuTreatmentJa : menuTreatment;
    return <img src={img} alt="" style={{ width: "100%" }} />;
}
