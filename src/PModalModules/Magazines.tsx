import React from 'react'
import { ImportContacts } from '@material-ui/icons';
import { ThemeType } from '../modules/ThemeContext';
import { useStylesFactory } from '../modules/useStylesFactory';
import { IconAndText } from '../molecules/IconAndText';
import { magazines } from "../modules/words";
import { useWordsChange } from '../modules/useWordsChange';

const styles = {
    root: {
        display: "flex",
    }
}

export const Magazines = (props: any) => {
    const classes = useStylesFactory(styles);
    const w = useWordsChange(magazines)

    return (
        <div className={classes.root}>
            <a href="fb179689808731959://">
                <IconAndText
                    icon={ImportContacts}
                    classNameIcon={props.icon}
                    text={w.magzter}
                />
            </a>
            <a href="rmagazine://">
                <IconAndText
                    icon={ImportContacts}
                    classNameIcon={props.icon}
                    text={w.japaneseMagazine}
                />
            </a>
        </div>
    );
}
