import {useContext, useCallback} from "react";
import {LogIn} from './LogIn/LogIn'
import {LogOut} from './LogOut/LogOut';
import {AppContext} from "../AppContext/AppContext";
import {Link} from "react-router-dom";
import logoBlack from "../../img/logo_black.png";
import styles from "./Header.module.css";

export const Header = () => {
    const {logIn, setLogIn} = useContext(AppContext);
    const toggleLogIn = useCallback(() => {
        setLogIn((logIn) => !logIn);
    }, []);
    return (
        <header className={styles.header_container}>
            <div className={styles.app_header}>
                <Link to='AllArticles'><img className={styles.logo} src={logoBlack}/></Link>
                {logIn
                    ? <LogIn toggle={toggleLogIn} active={styles.active}/>
                    : <LogOut toggle={toggleLogIn}/>
                }
            </div>
        </header>
    );
}