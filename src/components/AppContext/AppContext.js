import {createContext, useState} from 'react';

export const AppContext = createContext({});

export const AppContextProvider = ({children}) =>{
    const [currentPage, setCurrentPage] = useState(0);
    const [logIn, setLogIn] = useState(false);
    return(
        <AppContext.Provider value={
            {
                currentPage, setCurrentPage,
                logIn, setLogIn,
            }}>
            {children}
        </AppContext.Provider>
    );
}