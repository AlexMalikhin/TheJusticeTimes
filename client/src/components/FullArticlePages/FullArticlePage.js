import {Link, useNavigate} from 'react-router-dom';
import {Button} from '../Button/Button';
import {articles} from "../../mockStore/articles";
import fullPageStyles from './FullArticlePage.module.css';
import viewsImg from '../../img/viewsImg.png';
import defaultAvatar from '../../img/defaultAvatar.png';

export const FullArticlePage = ({article}) => {
    const navigate = useNavigate();
    const getPath = () => document.location.pathname === `/AllArticles/${article._id}`;
    const linkToAllArticles = () => {
        if(!!getPath()){
            return navigate('/AllArticles', {replace: true})
        }
        else {
            return navigate('/MyArticles', {replace: true})
        }
    }


    return (
        <div className={fullPageStyles.main_container}>
            <Button click={linkToAllArticles} title={!!getPath() ? 'AllArticles' : 'MyArticles'} style={fullPageStyles.all_articles}/>
            <div className={fullPageStyles.fullpage_container}>
                <div className={fullPageStyles.fullpage}>
                    <ul>
                        <li className={fullPageStyles.hashtags}><a>{article.category}</a></li>
                    </ul>
                    <h1>{article.title}</h1>
                    <img className={fullPageStyles.article_img} src={article.headImg}/>
                    <p className={fullPageStyles.paragraph_fullpage}>
                        {article.text}
                    </p>
                </div>
                <div className={fullPageStyles.user_container}>
                    <div className={fullPageStyles.space_between}>
                        <div className={fullPageStyles.article_info}>
                            <div className={fullPageStyles.avatar_block}>
                                <img src={article.avatar ? article.avatar : defaultAvatar} className={fullPageStyles.avatars}/>
                                <span className={fullPageStyles.avatar_name}>{article.firstname} {article.lastname}</span>
                            </div>
                            <div className={fullPageStyles.m8}>
                                <span>{article.monthOfCreated} {article.dayOfCreated} · {article.timeOfCreated}</span>
                            </div>
                            <div className={fullPageStyles.ml8}>
                                <img src={viewsImg} className={fullPageStyles.views}/>
                                <span className={fullPageStyles.ml8}>{article.views}</span>
                            </div>
                        </div>
                        <Button title={article.category} style={fullPageStyles.first_hashtag}/>
                    </div>
                </div>
            </div>
        </div>
    )
}