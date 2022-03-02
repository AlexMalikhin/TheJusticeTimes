import {useContext, useMemo, useEffect} from 'react';
import { AppContext } from '../AppContext/AppContext';
import { Paggination } from '../Paggination/Paggination';
import pagginationStyles from '../Paggination/Paggination.module.css';
import { MyArticle } from '../MyArticle/MyArticle';
import styles from './MyArticles.module.css';
import defaultAvatar from '../../img/defaultAvatar.png';
import axios from "axios";
import Cookies from "js-cookie";


export const MyArticles = () => {
    const {
        userArticlePage,
        setUserArticlePage,
        myArticles,
        setMyArticles,
        currentUserFirstName,
        currentUserLastName,
        currentUserDescription,
        setCurrentUserFirstName,
        setCurrentUserLastName,
        setCurrentUserDescription,
        profileAvatar,
        setProfileAvatar,
    } = useContext(AppContext);

    useEffect(async()=>{
        const token = {"token": Cookies.get('token')}
        const getMyArticles = await axios.post('http://localhost:5001/article/getMyArticles', token)
        console.log(getMyArticles.data.message)
        setMyArticles(getMyArticles.data.message)
        const user = await axios.post('http://localhost:5001/user/getUserData', token);
        setCurrentUserFirstName(user.data.firstname);
        setCurrentUserLastName(user.data.lastname);
        setProfileAvatar(user.data.avatar);
        setCurrentUserDescription(user.data.description);
    },[])

    const slicedMyArticles = useMemo(() => myArticles.slice(userArticlePage * 4, userArticlePage * 4 + 4), [userArticlePage, myArticles])


    return (
        <div className={styles.container}>
            <div className={styles.main_block}>
                <div className={styles.user_info}>
                    <img src={profileAvatar || defaultAvatar} className={styles.avatar}/>
                    <h3>{currentUserFirstName} {currentUserLastName}</h3>
                    <p className={styles.p}>{currentUserDescription}</p>
                </div>
                {myArticles.length ?
                    <div className={styles.articles_list}>
                        {slicedMyArticles.map(article=> (
                                <MyArticle props={article} key={article._id}/>
                            )
                        )}
                        <Paggination
                            page={userArticlePage}
                            setPage={setUserArticlePage}
                            allArticles={myArticles || ''}
                            style={pagginationStyles.myArticles}
                            length={4}
                        />
                     </div>
                    : <h1>Articles not found you could create a new one </h1>
                }

            </div>
        </div>
    )
}