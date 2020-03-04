import React from 'react'
import { Store } from '../modules/Store';
import { sortDataTags } from '../modules/organizeData';
import { Button } from '@material-ui/core';

export const TagModal = (props:any) => {
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
            <Button key={key} onClick={() => props.setParamsAndClose({ type, payload })}>
                {value.name}
            </Button>
        )
    });

    return <>{tagsWrap}</>;
}
