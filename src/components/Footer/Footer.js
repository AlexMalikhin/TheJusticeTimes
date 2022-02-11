import {useContext, useCallback} from "react";
import {LogIn} from "../Header/LogIn/LogIn";
import {LogOut} from "../Header/LogOut/LogOut";
import {AppContext} from "../AppContext/AppContext";
import logoWhite from "../../img/logo_white.png";
import styles from "./Footer.module.css";

export const Footer = () => {
    const {logIn, setLogIn} = useContext(AppContext);
    const toggleLogIn = useCallback(() => {
        setLogIn((logIn) => !logIn);
    }, []);
    return (
        <footer>
            <div className={styles.footer_container}>
                <div className={styles.footer_nav}>
                    <img className={styles.logo} src={logoWhite}/>
                    {logIn
                        ? <LogIn toggle={toggleLogIn} styles={styles.logIn_footer}/>
                        : <LogOut toggle={toggleLogIn} styles={styles.logIn_footer}/>
                    }
                </div>
                <div className={styles.rights}>
                    <span>© 2021 Justice-it. All rights reserved.</span>
                    <span>© 2021 Justice-team. All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
}