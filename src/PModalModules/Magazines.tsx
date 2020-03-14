import React from 'react'
import { useStylesFactory } from '../modules/useStylesFactory';
import { IconAndText } from '../molecules/IconAndText';
import { magazines } from "../modules/words";
import { useWordsChange } from '../modules/useWordsChange';
import magzter from "../img/magzter.png";
import rakutenMagazine from "../img/rakuten_magazine.png";


const styles = {
    root: {
        display: "flex",
        justifyContent: "space-around",
    },
    icon: {
        borderRadius: 10
    }
}

export const Magazines = (props: any) => {
    const classes = useStylesFactory(styles);
    const w = useWordsChange(magazines)
    const magzterUrl = 'fb179689808731959://'
    const rmagazineUrl = "rmagazine://";

    return (
        <div className={classes.root}>
            <IconAndText
                img={magzter}
                text={w.magzter}
                className={classes.icon}
                //   最初aタグでアプリへの遷移を試みたが内蔵ブラウザが開いてしまったのでonClickにlocation.hrefを変える関数を渡す。
                onClick={() => (window.location.href = magzterUrl)}
            />
            <IconAndText
                img={rakutenMagazine}
                text={w.japaneseMagazine}
                className={classes.icon}
                onClick={() => (window.location.href = rmagazineUrl)}
            />
        </div>
    );
}
