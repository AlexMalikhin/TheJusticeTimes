export const LogIn = ({toggle, active, styles}) => {

    return (
        <nav className='logIn-menu'>
            <ul className='logIn-nav'>
                <li className={active}><a>All articles</a></li>
                <li><a>My articles</a></li>
                <li><a>Add article</a></li>
                <li><a>Profile</a></li>
            </ul>
            <button
                className={`logIn ml-44 ${styles}`}
                onClick={toggle}
            >Logout
            </button>
        </nav>
    );
}