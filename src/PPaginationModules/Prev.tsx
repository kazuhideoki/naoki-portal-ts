import React from "react";
import { NavigateBefore } from "@material-ui/icons";
import { pageArrowProps } from "../PPagination";
import { Store } from "../modules/Store";

export const Prev = (props: pageArrowProps) => {
  const { wpParams } = React.useContext(Store);
  const currentPage = wpParams.currentPage;

  const arg = { type: "PREV" };
  let onClick;
  let disable;
  if (!(currentPage === 1)) {
    onClick = () => props.setParams(arg);
    disable = null;
  } else {
    onClick = undefined;
    disable = props.classesDisable;
  }
  return (
    <NavigateBefore
      onClick={onClick}
      className={`${props.classesIcon} ${disable}`}
    />
  );
};
