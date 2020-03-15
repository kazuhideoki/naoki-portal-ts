import React from "react";
import { LastPage } from "@material-ui/icons";
import { pageArrowProps } from "../PPagination";
import { Store } from "../modules/Store";

//  ページ数が3より大きい場合latestとoldestを表示
export const Oldest = (props: pageArrowProps) => {
  const { wpParams, totalPages } = React.useContext(Store);
  const currentPage = wpParams.currentPage;

  const arg = { type: "OLDEST" };
  let onClick;
  let disable;
  if (currentPage < totalPages - 2 && totalPages > 3) {
    onClick = () => props.setParams(arg);
    disable = null;
  } else {
    onClick = undefined;
    disable = props.classesDisable;
  }
  return (
    <LastPage onClick={onClick} className={`${props.classesIcon} ${disable}`} />
  );
};
