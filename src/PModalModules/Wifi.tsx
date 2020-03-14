import React from 'react'
import { Typography } from '@material-ui/core'
import { useWordsChange } from '../modules/useWordsChange'
import { wifi } from "../modules/words";

export const Wifi = () => {
    const w = useWordsChange(wifi)

    return (
        <div>
            <Typography variant="h2" align='center' gutterBottom >
                NAOKI Hair Dressing
            </Typography>
            <Typography variant="h3" align='center'>
                {w.password}
            </Typography>
            <Typography variant="h2" align='center'>
                02350235
            </Typography>
        </div> 
    )
}
