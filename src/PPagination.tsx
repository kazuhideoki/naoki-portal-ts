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
import { ThemeType } from './modules/ThemeContext';
import { useStylesFactory } from './modules/useStylesFactory';
import { Grid } from '@material-ui/core';

import { DisplayNumbers } from './PPaginationModules/DisplayNumbers';
import { Latest } from './PPaginationModules/Latest';

const styles = {
    icon: {
        fontSize: (themes: ThemeType) => themes.iconSmall
    },
    nums: {
        fontSize: (themes: ThemeType) => themes.iconSmall * 0.7,
        border: "none",
        backgroundColor: "transparent",
        margin: "auto 10px"
    },
    numsCurrent: {
        fontWeight: 'bold'
    },
    disable: {
        color: "whitesmoke"
    },
    pagination: {
        display: "flex",
        justifyContent: "center",
        width: 400
    }
};

export type pageArrowProps = {
  setParams: (type: any) => void;
  classesDisable?: string;
  classesIcon?: string
};

type Props = {
    classes: Record<string, string>
    currentPage: number
    openModal: (modalName: string) => void
    setParams: (type: any) => void
    totalPages: number
}

const PPaginationContainer = ({ presenter }: any) => {
    const classes = useStylesFactory(styles)
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
        return <Home onClick={() => setParams(arg)} className={classes.icon}/>;
    };
    const Tag = () => <Label onClick={() => openModal("tag")} className={classes.icon}/>;
    const Author = () => <Person onClick={() => openModal("author")} className={classes.icon}/>;
    const Insta = () => {
        const arg = { type: "INSTA" };
        return <Instagram onClick={() => setParams(arg)} className={classes.icon}/>;
    };

    const PageNumber = () => {
        return <p className={classes.nums}>【 {currentPage}/{totalPages} 】</p>
    }


    const Prev = () => {
        const arg = { type: "PREV" };
        let onClick;
        let disable;
        if (!(currentPage === 1)) {
          onClick = () => setParams(arg);
          disable = null;
        } else {
          onClick = undefined;
          disable = classes.disable;
        } 
        return (
            <NavigateBefore
            onClick={onClick}
            className={`${classes.icon} ${disable}`}
            />
        );
    };

    const Next = () => {
        const arg = { type: "NEXT" };
        let onClick;
        let disable;
        if (!(currentPage === totalPages)) {
          onClick = () => setParams(arg);
          disable = null;
        } else {
          onClick = undefined;
          disable = classes.disable;
        } 
        return (
            <NavigateNext
            onClick={onClick}
            className={`${classes.icon} ${disable}`}
            />
        );
    };

    const Oldest = () => {
        const arg = { type: "OLDEST", payload: totalPages };
        let onClick;
        let disable;
        if (currentPage < totalPages - 2 && totalPages > 3) {
          onClick = () => setParams(arg);
          disable = null;
        } else {
          onClick = undefined;
          disable = classes.disable;
        } 
        return (
            <LastPage onClick={onClick} className={`${classes.icon} ${disable}`} />
        );
    };

    const SelectParams = () => (
        <>
            <Grid item>
                <HomeButton />
            </Grid>
            <Grid item>
                <Tag />
            </Grid>
            <Grid item>
                <Author />
            </Grid>
            <Grid item>
                <Insta />
            </Grid>
        </>
    )

    const Pagination = () => (
      <Grid item className={classes.pagination}>
        <Latest setParams={setParams} classesDisable={classes.disable} classesIcon={classes.icon}/>
        <Prev />
        <DisplayNumbers setParams={setParams} />
        <Next />
        <Oldest />
      </Grid>
    );

    return (
        <Grid container justify="center" spacing={1}>
            <SelectParams />
            <PageNumber />
            <Pagination />
        </Grid>
    );
};

export const PPagination = () => (
    <PPaginationContainer presenter={(props: Props) => <PPaginationPresenter {...props} />} />
);