import React from 'react'
import { Store } from "./modules/Store";
import {
    Home,
  FirstPage,
  NavigateBefore,
  NavigateNext,
  LastPage,
  Label,
  Person
} from "@material-ui/icons";

const PPaginationContainer = ({presenter}) => {
    const { wpParams, dispatchWpParams, dispatchAppState, totalPages } = React.useContext(
      Store
    );

    const changeParams = (type, payload) => {
        if (payload) {
            dispatchWpParams({ type: type, payload: payload });
        }else{
            dispatchWpParams({type: type})
        }
    }

    const openModal = modalName =>
        dispatchAppState({ type: "OPEN_MODAL", payload: modalName });

    const props = {
        wpParams,
        changeParams,
        openModal,
        totalPages
    };

    return presenter(props)
}

const PPaginationPresenter = ({
  wpParams,
  changeParams,
  openModal,
  totalPages
}) => {
  const page = wpParams.currentPage;

  const home = <Home onClick={ () => changeParams("HOME")} />;
  const tag = <Label onClick={ () => openModal("tag")} />;

  const author = <Person onClick={ () => openModal("author")} />;

  const pageNumber = (
    <>
      【 {page}/{totalPages} 】
    </>
  );

  let [latest, prev, next, oldest] = "";

  //  ページ数が3より大きい場合latestとoldestを表示
  if (page > 3 && totalPages > 3) {
    latest = <FirstPage onClick={ () => changeParams("LATEST")} />;
  }
  if (!(page === 1)) {
    prev = <NavigateBefore onClick={ () => changeParams("PREV")} />;
  }
  if (!(page === totalPages)) {
    next = <NavigateNext onClick={ () => changeParams("NEXT")} />;
  }
  if (page < totalPages - 2 && totalPages > 3) {
    oldest = <LastPage onClick={ () => changeParams("OLDEST", totalPages)} />;
  }

  const number1 = page - 2;
  const number2 = page - 1;
  const number3 = page;
  const number4 = page + 1;
  const number5 = page + 2;

  const numbers = [number1, number2, number3, number4, number5];

  const displayNumbers = numbers.map(num => {
    if (num <= 0) {
      return "";
    } else if (num > totalPages) {
      return "";
    } else if (num === page) {
      return <button key={num}>{num}</button>;
    }
    return (
      <button key={num} onClick={ () => changeParams("NUM", num)}>
        {num}
      </button>
    );
  });

  return (
    <div>
      {home}
      {tag}
      {author}
      {pageNumber}
      {latest}
      {prev}
      {displayNumbers}
      {next}
      {oldest}
    </div>
  );
};

export const PPagination = () => (
    <PPaginationContainer presenter={props => <PPaginationPresenter {...props} />} />
);