import topArticle from "../../img/article_images/1.png";
import janayWright from "../../img/avatars/JanayWright.png";
import views from "../../img/viewsImg.png";

export const TopArticle = () =>{
    return(
        <>
            <div className='top-container'>
                <div className='top-article'>
                    <img src={topArticle} className='top-img-article'/>
                    <div className='top-article-block'>
                        <a className='hashtags'>#Typography</a>
                        <h2>Humane Typography in the Digital Age</h2>
                        <p>
                            Human beings aren’t perfect. Perfection is something that will always elude us.
                            There will always be a small part of humanity in everything we do. No matter how small
                            that part, we should make sure that it transcends the limits of the medium. We have to
                            think about the message first. What typeface should we use and why?
                            Does the typeface match the message and what?
                        </p>
                        <div className='bottom-top-article-block'>
                            <div className='avatarBlock'>
                                <img src={janayWright} className='avatars'/>
                                <span className='margin-left-8'>Janay Wright</span>
                            </div>
                            <div>
                                <span>Jun 13 · 5 min read</span>
                            </div>
                            <div>
                                <img src={views} className='views'/>
                                <span className='margin-left-8'>1690</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}