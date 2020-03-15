import React from "react";
import { FirstPage } from "@material-ui/icons";
import { pageArrowProps } from "../PPagination";
import { Store } from "../modules/Store";

//  ページ数が3より大きい場合latestとoldestを表示
export const Latest = (props: pageArrowProps) => {
    const { wpParams, totalPages } = React.useContext(Store);
    const currentPage = wpParams.currentPage;

    const arg = { type: "LATEST" };
    let onClick;
    let disable;
    if (currentPage > 3 && totalPages > 3) {
        onClick = () => props.setParams(arg);
        disable = null;
    } else {
        onClick = undefined;
        disable = props.classesDisable;
    }
    return (
        <FirstPage
            onClick={onClick}
            className={`${props.classesIcon} ${disable}`}
        />
    );
};
