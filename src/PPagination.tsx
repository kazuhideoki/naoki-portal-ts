import React from 'react'
import { Store, WpParams} from "./modules/Store";
import { WpParamsAction } from "./modules/wpParamsReducer";
import {
    Home,
  FirstPage,
  NavigateBefore,
  NavigateNext,
  LastPage,
  Label,
  Person,
    Instagram
} from "@material-ui/icons";

type Props = {
    wpParams: WpParams
    openModal: (modalName: string) => void
    totalPages: number
    dispatchWpParams: React.Dispatch<WpParamsAction>
}

const PPaginationContainer = ({ presenter }: any) => {
    const { wpParams, dispatchWpParams, dispatchAppState, totalPages } = React.useContext(
      Store
    );

    const openModal = (modalName: string) =>
        dispatchAppState({ type: "OPEN_MODAL", payload: modalName });

    const props = {
        wpParams,
        openModal,
        totalPages,
        dispatchWpParams
    };

    return presenter(props)
}

const PPaginationPresenter = ({
    wpParams,
    openModal,
    totalPages,
    dispatchWpParams,
}: Props) => {
  const page = wpParams.currentPage;

    const home = <Home onClick={() => dispatchWpParams({ type: "MAINHOME" })} />;
  const tag = <Label onClick={ () => openModal("tag")} />;

  const author = <Person onClick={ () => openModal("author")} />;
    const insta = <Instagram onClick={() => dispatchWpParams({ type: "INSTA" })}/>

  const pageNumber = (
    <>
      【 {page}/{totalPages} 】
    </>
  );

  let latest, prev, next, oldest

  //  ページ数が3より大きい場合latestとoldestを表示
  if (page > 3 && totalPages > 3) {
      latest = <FirstPage onClick={() => dispatchWpParams({ type: "LATEST" })} />;
  }
  if (!(page === 1)) {
      prev = <NavigateBefore onClick={() => dispatchWpParams({ type: "PREV" })} />;
  }
  if (!(page === totalPages)) {
      next = <NavigateNext onClick={() => dispatchWpParams({ type: "NEXT" })} />;
  }
  if (page < totalPages - 2 && totalPages > 3) {
      oldest = <LastPage onClick={() => dispatchWpParams({ type: "OLDEST", payload: totalPages })} />;
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
        <button key={num} onClick={() => dispatchWpParams({ type: "NUM", payload: num })}>
        {num}
      </button>
    );
  });

  return (
    <div>
      {home}
      {tag}
      {author}
      {insta}
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
    <PPaginationContainer presenter={(props: Props) => <PPaginationPresenter {...props} />} />
);