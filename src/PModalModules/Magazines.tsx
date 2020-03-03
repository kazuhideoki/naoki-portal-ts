import React from 'react'
import { ImportContacts } from '@material-ui/icons';
import { ThemeType } from '../modules/ThemeContext';
import { useStylesFactory } from '../modules/useStylesFactory';
import { IconAndText } from '../molecules/IconAndText';
import { magazines } from "../modules/words";
import { useWordsChange } from '../modules/useWordsChange';

const styles = {
    icon: { fontSize: (themes: ThemeType) => themes.icon }
}

export const Magazines = () => {
    const classes = useStylesFactory(styles);
    const w = useWordsChange(magazines)

    return (
        <>
            <a href="fb179689808731959://">
                <IconAndText
                    icon={ImportContacts}
                    classNameIcon={classes.icon}
                    text={w.magzter}
                />
            </a>
            <a href="rmagazine://">
                <IconAndText
                    icon={ImportContacts}
                    classNameIcon={classes.icon}
                    text={w.japaneseMagazine}
                />
            </a>
        </>
    );
}
