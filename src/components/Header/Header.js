import logoBlack from "../../img/logo_black.png";

export const Header = () =>{
    return(
        <>
            <header className="header-container">
                <div className="App-header">
                    <img src={logoBlack} width={268} height={32}/>
                    <nav>
                        <button className="signIn">Log in</button>
                        <button className="logIn">Sign in</button>
                    </nav>
                </div>
            </header>
        </>
    );
}