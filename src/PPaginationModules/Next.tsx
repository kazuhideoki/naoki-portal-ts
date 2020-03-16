import React from "react";
import { NavigateNext } from "@material-ui/icons";
import { pageArrowProps } from "../PPagination";
import { Store } from "../modules/Store";
import { WpParamsAction } from "../modules/wpParamsReducer";


export const Next = (props: pageArrowProps) => {
  const { wpParams, totalPages } = React.useContext(Store);
  const currentPage = wpParams.currentPage;

  const arg: WpParamsAction = { type: "NEXT" };
  let onClick;
  let disable;
  if (!(currentPage === totalPages)) {
    onClick = () => props.setParams(arg);
    disable = null;
  } else {
    onClick = undefined;
    disable = props.classesDisable;
  }
  return (
    <NavigateNext
      onClick={onClick}
      className={`${props.classesIcon} ${disable}`}
    />
  );
};
