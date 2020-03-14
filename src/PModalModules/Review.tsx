import React from 'react'
import googleQr from "../img/review_qr_google.png";
import facebookQr from "../img/review_qr_facebook.png";
import { Typography } from '@material-ui/core';
import { useStylesFactory } from '../modules/useStylesFactory';

const styles = {
    qrs: {
        display: 'flex',
        justifyContent: 'space-between',
    }
}

export const Review = () => {
    const classes = useStylesFactory(styles)

    return (
        <div>
            <Typography variant="h2" align='center' gutterBottom >
                Give us a positive feedback!
            </Typography>
            <div className={classes.qrs}>
                <div>
                    <img src={googleQr} alt="" />
                    <Typography variant="h4" align='center'>
                        Google
                    </Typography>
                </div>
                <div>
                    <img src={facebookQr} alt="" />
                    <Typography variant="h4" align='center'>
                        Facebook
                    </Typography>
                    
                </div>
            </div>            
        </div>
    )
}
