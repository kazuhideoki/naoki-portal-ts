import React from 'react'
import { Store } from '../modules/Store';
import { sortDataTags } from '../modules/organizeData';
import { Button } from '@material-ui/core';
import { useStylesFactory } from '../modules/useStylesFactory';

const styles = {
    button: {
        fontSize: '1.5em',
        margin: 10,
        border: '1px solid grey'
    }
}

export const TagModal = (props:any) => {
    const classes = useStylesFactory(styles)
    const {wpParams, wpData } = React.useContext(Store)
    const tags = sortDataTags(wpData.tags);

    let tagsLang; 
    if (wpParams.isJa) {
        tagsLang = tags.tagsJa;
    } else {
        tagsLang = tags.tagsEn;
    }
    const tagsWrap = tagsLang.map((value, key) => {
        const payload = value.id
        const type = "TAG"
        return (
          <Button
            className={classes.button}
            key={key}
            onClick={() => props.setParamsAndClose({ type, payload })}
          >
            {value.name}
          </Button>
        );
    });

    return <div className={props.className}>{tagsWrap}</div>;
}
