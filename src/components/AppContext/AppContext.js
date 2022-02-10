import {createContext, useState} from 'react';

export const AppContext = createContext({});

export const AppContextProvider = ({children}) =>{
    const [currentPage, setCurrentPage] = useState(0);
    return(
        <AppContext.Provider value={{currentPage, setCurrentPage}}>
            {children}
        </AppContext.Provider>
    );
}