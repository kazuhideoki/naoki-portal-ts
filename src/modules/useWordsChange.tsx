import React from 'react'
import { Store } from './Store';

type Words<E, J> = {
    en: E
    ja: J 
}

export const useWordsChange = <E, J>(words: Words<E, J>) => {
    const { wpParams } = React.useContext(Store);

    if (wpParams.isJa) {
        return words.ja
    } else {
        return words.en
    }
}
