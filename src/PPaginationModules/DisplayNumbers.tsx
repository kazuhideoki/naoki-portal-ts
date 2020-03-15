import React from "react";
import { Store } from "../modules/Store";
import { useStylesFactory } from "../modules/useStylesFactory";
import { ThemeType } from "../modules/ThemeContext";
import { pageArrowProps } from "../PPagination";

const styles = {
  nums: {
    fontSize: (themes: ThemeType) => themes.iconSmall * 0.7,
    border: "none",
    backgroundColor: "transparent",
    margin: "auto 10px",
    padding: 5
  },
  numsCurrent: {
    fontWeight: "bold"
  }
};

export const DisplayNumbers = (props: pageArrowProps) => {
    const classes = useStylesFactory(styles)
    const { wpParams, totalPages } = React.useContext(Store);
    const currentPage = wpParams.currentPage;

    const number1 = currentPage - 2;
    const number2 = currentPage - 1;
    const number3 = currentPage;
    const number4 = currentPage + 1;
    const number5 = currentPage + 2;

    const numbers = [number1, number2, number3, number4, number5];
  const nums = numbers.map(num => {
    if (num <= 0) {
      return "";
    } else if (num > totalPages) {
      return "";
    } else if (num === currentPage) {
      return (
        <button key={num} className={`${classes.nums} ${classes.numsCurrent}`}>
          {num}
        </button>
      );
    }

    const arg = { type: "NUM", payload: num };
    return (
      <button key={num} onClick={() => props.setParams(arg)} className={classes.nums}>
        {num}
      </button>
    );
  });

  return <>{nums}</>;
};
