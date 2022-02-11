import viewsImg from "../../../img/viewsImg.png";
import {Link} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import {useCallback} from "react";

const Article = ({id, key, img, author, avatar, views, header, paragraph, month, day, readed, tags}) =>{
    const navigate = useNavigate();
    const showFullArticle = useCallback((id) =>{
        navigate(`./${id}`, {replace: true})
    },[]);

    return(
          <div onClick={()=>showFullArticle(id)} className='articles'>
              <img src={img} className='img-article'/>
              <div className='top-article-block'>
                  <ul>
                      {tags.map(item=> <li key={key} className='hashtags'><a>{item}</a></li>)}
                  </ul>
                  <h2>{header}</h2>
                  <p>{paragraph}</p>
                  <div className='bottom-top-article-block'>
                      <div className='avatarBlock'>
                          <img src={avatar} className='avatars'/>
                          <span className='margin-left-8'>{author}</span>
                      </div>
                      <div>
                          <span>{month} {day} · {readed} min read</span>
                      </div>
                      <div>
                          <img src={viewsImg} className='views'/>
                          <span className='margin-left-8'>{views}</span>
                      </div>
                  </div>
              </div>
          </div>
    );
}

export default Article;