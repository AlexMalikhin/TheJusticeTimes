import logoBlack from "../../img/logo_black.png";
import {useContext, useCallback} from "react";
import {LogIn} from './LogIn/LogIn'
import {LogOut} from './LogOut/LogOut';
import {AppContext} from "../AppContext/AppContext";
import {Link} from "react-router-dom";

export const Header = () =>{
    const {logIn, setLogIn} = useContext(AppContext);
    const toggleLogIn = useCallback(()=>{
        setLogIn((logIn)=>!logIn);
    },[]);
    return(
        <>
            <header className="header-container">
                <div className="App-header">
                    <Link to='AllArticles'><img src={logoBlack} width={268} height={32}/></Link>
                    {logIn ? <LogIn toggle={toggleLogIn} active={'active'}/> : <LogOut toggle={toggleLogIn}/> }
                </div>
            </header>
        </>
    );
}