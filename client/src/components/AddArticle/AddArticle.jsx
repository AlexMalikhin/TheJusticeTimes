import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import axios from 'axios';
import { Button } from '../Button/Button';
import { Input } from "../Input/Input";
import emptyImg from '../../img/article_images/empty_img.png';
import buttonStyles from '../Button/Button.module.css';
import addArticleStyles from "./AddArticle.module.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Cookies from "js-cookie";

export const AddArticle = () =>{
    const navigate = useNavigate();
    const reader = new FileReader();

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [imgNewArticle, setImgNewArticle] = useState('');
    const [newArticleTitle, setNewArticleTitle] = useState('');
    const [newArticleCategory, setNewArticleCategory] = useState('');

    const saveImage = (e) => {
        const file = e.target.files[0];
        reader.onloadend = () => {
            const base64String = reader.result;
            setImgNewArticle(base64String);
        };
        reader.readAsDataURL(file);
    };
    const clearImg = () =>{
        setImgNewArticle('')
    }
    const getDay = () =>{
        let date = new Date();
        return date.getDate();
    }
    const getMonth = () =>{
        let date = new Date();
        return date.toLocaleString('default', { month: 'short'}).slice(0, 3)
    }
    const getTimePublication = () =>{
        let date = new Date();
        return `${date.getHours()}:${date.getMinutes()}`
    }
    const checkInputs = () =>{
            return !newArticleCategory || !newArticleTitle || !imgNewArticle || !(editorState.getCurrentContent().getPlainText())
    }

    const publishArticle = async() =>{
        const newArticle = {
            token: Cookies.get('token'),
            title: newArticleTitle,
            category: newArticleCategory,
            headImg: imgNewArticle,
            monthOfCreated: getMonth(),
            dayOfCreated: getDay(),
            timeOfCreated: getTimePublication(),
            text: editorState.getCurrentContent().getPlainText(),
            views: 0,
        }
        await axios.post('http://localhost:5001/auth/createArticle', newArticle)
        clearInputs();
        navigate('/AllArticles');
    }

    const clearInputs = () =>{
        setEditorState(EditorState.createEmpty());
        setImgNewArticle('');
        setNewArticleCategory('');
        setNewArticleTitle('');
    }

    return(
        <div className={addArticleStyles.container}>
            <div className={addArticleStyles.wrapper}>
                <h1 className={addArticleStyles.header}>Add article</h1>
            <Input
                placeholder='Enter a title...'
                inputValue={newArticleTitle}
                changeValue={setNewArticleTitle}
            />
            <Input
                placeholder='Enter the category name...'
                inputValue={newArticleCategory}
                changeValue={setNewArticleCategory}
            />
                <div className={addArticleStyles.add_image_block}>
                    <div className={addArticleStyles.image_block}>
                         <img
                             src={imgNewArticle || emptyImg}
                             className={imgNewArticle ? addArticleStyles.img : addArticleStyles.img_filtered}
                         />
                    </div>
                    <div className={addArticleStyles.add_img_buttons}>
                        <div className={addArticleStyles.upload_input}>
                            <label
                                htmlFor='upload'
                                className={addArticleStyles.input_label}
                            >
                                {imgNewArticle ? 'Change Photo' : 'Upload Photo'}
                            </label>
                            <input id='upload' className={addArticleStyles.input_file_hidden} type='file' accept=".png, .jpg, .jpeg" onChange={saveImage}/>
                        </div>
                        {imgNewArticle && <Button title='Delete image' style={buttonStyles.header_logIn} click={clearImg}/>}
                    </div>
                </div>
            <Editor
               editorStyle={{border: '1px solid #E1E1E1', padding: '0px 10px', minHeight: '335px', marginTop: '30px'}}
               editorState={editorState}
               toolbarClassName="toolbarClassName"
               wrapperClassName="wrapperClassName"
               editorClassName="editorClassName"
               onEditorStateChange={setEditorState}
            />
                <Button
                    style={buttonStyles.profile_save_changes}
                    title='Publish an article'
                    click={publishArticle}
                    disable={checkInputs()}
                />
            </div>
        </div>
    )
}