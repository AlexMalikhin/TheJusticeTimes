import {ButtonLog} from '../ButtonLog/ButtonLog';
import styles from './LogIn.module.css';


export const LogIn = ({active, login, style}) => {
    return (
        <nav className={styles.logout}>
            <ul className={styles.logout_list}>
                <li className={styles.logout_li}><a>All articles</a></li>
                <li className={styles.logout_li}><a>My articles</a></li>
                <li className={styles.logout_li}><a>Add article</a></li>
                <li className={styles.logout_li}><a>Profile</a></li>
            </ul>
            <ButtonLog click={login} style={style} title={'LogOut'} disabled={false}/>
        </nav>
    );
}