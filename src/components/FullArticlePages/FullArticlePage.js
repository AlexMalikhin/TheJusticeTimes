import {Link} from 'react-router-dom';
import {articles} from "../../mockStore/articles";

export const FullArticlePage = ({article}) =>{
    return(
        <div className='main-container mr-top-bottom-80 flex'>
            <Link to={'/AllArticles'}><button className='signIn mr-84'>All articles</button></Link>
            <div className='fullPage-container'>
                <div className='fullPage'>
                     <ul>
                         {article.hashtags.map(hashtag=>(
                             <li className='hashtags'><a>{hashtag}</a></li>
                         ))}
                     </ul>
                     <h1>Humane Typography in the Digital Age</h1>
                </div>
            </div>
        </div>
    )
}