import viewsImg from "../../../img/viewsImg.png";

const Article = ({img, author, avatar, views, header, paragraph, month, day, readed, tags}) =>{
    return(
      <>
          <div className='articles'>
              <img src={img} className='img-article'/>
              <div className='top-article-block'>
                  <ul>
                      {tags.map(item=> <li className='hashtags'><a>{item}</a></li>)}
                  </ul>
                  <h2>{header}</h2>
                  <p>
                      {paragraph}
                  </p>
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
      </>
    );
}

export default Article;