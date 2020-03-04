import React from 'react'
import googleQr from "../img/review_qr_google.png";
import facebookQr from "../img/review_qr_facebook.png";

export const Review = () => {
    return (
        <>
            レビューしてね。 google →<img src={googleQr} alt="" />
            facebook→
            <img src={facebookQr} alt="" />
        </>
    )
}
