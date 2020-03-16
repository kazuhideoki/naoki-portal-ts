import React from 'react'
import { IconAndText } from '../molecules/IconAndText'
import treatmentIcon from "../img/menu-treatment.png";
import { useStylesFactory } from '../modules/useStylesFactory';
import {
    FreeBreakfastTwoTone,
    ListTwoTone,
    Web
} from "@material-ui/icons";
import { useWordsChange } from '../modules/useWordsChange';
import { menus } from '../modules/words';

const styles = {
    root: {
        display: "flex",
        justifyContent: "space-around",
    },
    treatment: {
        display: "flex",
        flexDirection: "column",
    },
    treatmentImg: {
        width: 90
    }
}

export const Menus = (props: any) => {
    const classes = useStylesFactory(styles)
    const w = useWordsChange(menus)

    return (
      <div className={classes.root}>
        <IconAndText
          icon={FreeBreakfastTwoTone}
          onClick={() => props.openModal("menuDrink")}
          text={w.beverage}
        />
        <IconAndText
          icon={ListTwoTone}
          onClick={() => props.openModal("menu")}
          text={w.service}
        />
        <IconAndText
          img={treatmentIcon}
          onClick={() => props.openModal("menuTreatment")}
          text={w.treatment}
        />
        {/* <IconAndText
          icon={Web}
          onClick={() => props.openModal("colorChart")}
          text={w.colorChart}
        /> */}
        {/* iframeでリンク先を表示させようとしたが、読み込みが遅いのとメニューがうまく開かないのでとりあえずaタグに */}
        <a href="https://ordevebrand-digital.com/color/ordeve">
            <IconAndText
            icon={Web}
            text={w.colorChart}
            onClose
            />
        </a>
      </div>
    );
}