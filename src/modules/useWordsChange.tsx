import React from 'react'
import { Store } from './Store';

export const useWordsChange = (words: any) => {
    const { wpParams } = React.useContext(Store);

    let w
    if (wpParams.isJa) {
        w = words.ja
    } else {
        w = words.en
    }

    return w
}
