export const LogOut = ({toggle, styles}) => {
    return (
        <nav>
            <button className="signIn" onClick={toggle}>Log in</button>
            <button className={`logIn ${styles}`}>Sign in</button>
        </nav>
    );
}