import React from 'react'
import { Store } from "./modules/Store";
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
import { ThemeContext } from './modules/ThemeContext';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
    root: {
        display: "flex",
    }
})

type Props = {
    classes: Record<"root", string>
    currentPage: number
    openModal: (modalName: string) => void
    setParams: (type: any) => void
    totalPages: number
}

const PPaginationContainer = ({ presenter }: any) => {
    const themes = React.useContext(ThemeContext)
    const classes = useStyle(themes)
    const { wpParams, dispatchWpParams, dispatchAppState, totalPages } = React.useContext(
      Store
    );

    const currentPage = wpParams.currentPage;
    const openModal = (modalName: string) => {
        dispatchAppState({ type: "OPEN_MODAL", payload: modalName })
    }

    // wpParamsReducerのWpParamsActionで上手く行かなった。検討の余地あり
    const setParams = (arg: WpParamsAction) => {
      dispatchAppState({ type: "START_LOADING" });
      dispatchWpParams(arg);
    };
    
    const props = {
        classes,
        currentPage,
        openModal,
        setParams,
        totalPages,
    };

    return presenter(props)
}

const PPaginationPresenter = ({
    classes,
    currentPage,
    openModal,
    setParams,
    totalPages,
}: Props) => { 
    const HomeButton = () => {
        const arg = { type: "MAINHOME" };
        return <Home onClick={() => setParams(arg)} />;
    };
    const Tag = () => <Label onClick={ () => openModal("tag")} />;
    const Author = () => <Person onClick={ () => openModal("author")} />;
    const Insta = () => {
        const arg = { type: "INSTA" };
        return <Instagram onClick={() => setParams(arg)} />;
    };

    const PageNumber = () => {
        return <>【 {currentPage}/{totalPages} 】</>
    }

    let Latest = () => <></>;
    let Prev = () => <></>;
    let Next = () => <></>;
    let Oldest = () => <></>
    //  ページ数が3より大きい場合latestとoldestを表示
    if (currentPage > 3 && totalPages > 3) {
        Latest = () => {
            const arg = { type: "LATEST" };
            return <FirstPage onClick={() => setParams(arg)} />;
        };
    }
    if (!(currentPage === 1)) {
        Prev = () => {
            const arg = { type: "PREV" };
            return <NavigateBefore onClick={() => setParams(arg)} />;
        }
    }
    if (!(currentPage === totalPages)) {
        Next = () => {
            const arg = { type: "NEXT"};
            return <NavigateNext onClick={() => setParams(arg)} />;
        }
    }
    if (currentPage < totalPages - 2 && totalPages > 3) {
        Oldest = () => {
            const arg = { type: "OLDEST", payload: totalPages };
            return <LastPage onClick={() => setParams(arg)} />;
        }
    }

    const number1 = currentPage - 2;
    const number2 = currentPage - 1;
    const number3 = currentPage;
    const number4 = currentPage + 1;
    const number5 = currentPage + 2;

    const numbers = [number1, number2, number3, number4, number5];

    const DisplayNumbers = () => {
        const nums = numbers.map(num => {
            if (num <= 0) {
            return "";
            } else if (num > totalPages) {
            return "";
            } else if (num === currentPage) {
            return <button key={num}>{num}</button>;
            }

            const arg = { type: "NUM", payload: num };
            return (
                <button key={num} onClick={() => setParams(arg)}> 
                    {num}
                </button>
            );
        })

        return <>{nums}</>
    }

    return (
        <div className={classes.root}>
            <HomeButton/>
            <Tag/>
            <Author/>
            <Insta/>
            <PageNumber/>
            <Latest/>
            <Prev/>
            <DisplayNumbers/>
            <Next/>
            <Oldest/>
        </div>
    );
};

export const PPagination = () => (
    <PPaginationContainer presenter={(props: Props) => <PPaginationPresenter {...props} />} />
);