import {Link} from 'react-router-dom';
import {ButtonLog} from '../ButtonLog/ButtonLog';
import {articles} from "../../mockStore/articles";
import fullPageStyles from './FullArticlePage.module.css';
import viewsImg from '../../img/viewsImg.png';

export const FullArticlePage = ({article}) => {
    return (
        <div className={fullPageStyles.main_container}>
            <Link to={'/AllArticles'}>
                <ButtonLog title='All articles' style={fullPageStyles.all_articles}/>
            </Link>
            <div className={fullPageStyles.fullpage_container}>
                <div className={fullPageStyles.fullpage}>
                    <ul>
                        {article.hashtags.map(hashtag => (
                            <li key={hashtag.key} className={fullPageStyles.hashtags}><a>{hashtag.title}</a></li>)
                        )}
                    </ul>
                    <h1>{article.header}</h1>
                    <img src={article.img}/>
                    <p className={fullPageStyles.paragraph_fullpage}>
                        {article.paragraph}
                    </p>
                    <h2>The first transition</h2>
                    <p>A similar conflict emerged after the invention of the first printing press in Europe. Johannes
                        Gutenberg invented
                        movable type and used it to produce different compositions. His workshop could print up to 240
                        impressions per hour.
                        Until then, the books were being copied by hand. All the books were handwritten and decorated
                        with hand drawn ornaments and figures.
                        A process of copying a book was long but each book, even a copy, was a work of art.
                        The first printed books were, at first, perceived as inferior to the handwritten ones. They were
                        smaller and cheaper to produce.
                        Movable type provided the printers with flexibility that allowed them to print books in
                        languages other than Latin. Gill describes
                        the transition to industrialism as something that people needed and wanted. Something similar
                        happened after the first printed books emerged.
                        People wanted books in a language they understood and they wanted books they could take with
                        them. They were hungry for knowledge and printed
                        books satisfied this hunger.
                    </p>
                    <img src={article.secondImg}/>
                    <p className={fullPageStyles.descriptionImg}>{article.descriptionImg}</p>
                    <p className={fullPageStyles.paragraph_fullpage}>
                        But, through this transition, the book lost a large part of its humanity. The machine took over
                        most of the process but
                        craftsmanship was still a part of it. The typefaces were cut manually by the first punch
                        cutters. The paper was made by hand.
                        The illustrations and ornaments were still being hand drawn. These were the remains of the
                        craftsmanship that went almost extinct in the times of Eric Gill.
                    </p>
                    <h2>Chasing perfection</h2>
                    <p>Human beings aren’t perfect. Perfection is something that will always elude us. There will always
                        be a small part of
                        humanity in everything we do. No matter how small that part, we should make sure that it
                        transcends the limits of
                        the medium. We have to think about the message first. What typeface should we use and why? Does
                        the typeface match
                        the message and what we want to communicate with it? What will be the leading and why? Will
                        there be more typefaces in our
                        design? On what ground will they be combined? What makes our design unique and why? This is the
                        part of humanity that is
                        left in typography. It might be the last part. Are we really going to give it up?
                    </p>
                </div>
                <div className={fullPageStyles.user_container}>
                    <div className={fullPageStyles.space_between}>
                        <div className={fullPageStyles.article_info}>
                            <div className={fullPageStyles.avatar_block}>
                                <img src={article.avatar} className={fullPageStyles.avatars}/>
                                <span className={fullPageStyles.avatar_name}>{article.author}</span>
                            </div>
                            <div className={fullPageStyles.m8}>
                                <span>{article.month} {article.day} · {article.readed} min read</span>
                            </div>
                            <div className={fullPageStyles.ml8}>
                                <img src={viewsImg} className={fullPageStyles.views}/>
                                <span className={fullPageStyles.ml8}>{article.views}</span>
                            </div>
                        </div>
                        <ButtonLog title={article.hashtags[0].title} style={fullPageStyles.first_hashtag}/>
                    </div>
                </div>
            </div>
        </div>
    )
}