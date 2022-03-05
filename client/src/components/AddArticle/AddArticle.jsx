import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState } from 'draft-js'
import axios from 'axios'
import Cookies from 'js-cookie'
import moment from 'moment'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import emptyImg from '../../img/article_images/empty_img.png'
import addArticleStyles from './AddArticle.module.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export const AddArticle = () => {
  const navigate = useNavigate()
  const reader = new FileReader()

  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [imgNewArticle, setImgNewArticle] = useState('')
  const [newArticleTitle, setNewArticleTitle] = useState('')
  const [newArticleCategory, setNewArticleCategory] = useState('')

  const saveImage = (e) => {
    const file = e.target.files[0]
    reader.onloadend = () => {
      const base64String = reader.result
      setImgNewArticle(base64String)
    }
    reader.readAsDataURL(file)
  }
  const clearImg = () => {
    setImgNewArticle('')
  }

  const checkInputs = () => {
    return (
      !newArticleCategory ||
      !newArticleTitle ||
      !imgNewArticle ||
      !editorState.getCurrentContent().getPlainText()
    )
  }

  const publishArticle = async () => {
    const newArticle = {
      title: newArticleTitle,
      category: newArticleCategory,
      headImg: imgNewArticle,
      date: moment().format(`MMM D ${'·'} LT`),
      text: editorState.getCurrentContent().getPlainText(),
      views: 0,
    }
    const token = { token: Cookies.get('token') }
    await axios.post(
      'http://localhost:5001/article/createArticle',
      newArticle,
      { headers: { Authorization: token.token } }
    )
    clearInputs()
    navigate('/AllArticles')
  }

  const clearInputs = () => {
    setEditorState(EditorState.createEmpty())
    setImgNewArticle('')
    setNewArticleCategory('')
    setNewArticleTitle('')
  }

  return (
    <div className={addArticleStyles.container}>
      <div className={addArticleStyles.wrapper}>
        <h1 className={addArticleStyles.header}>Add article</h1>
        <Input
          placeholder="Enter a title..."
          inputValue={newArticleTitle}
          changeValue={setNewArticleTitle}
        />
        <Input
          placeholder="Enter the category name..."
          inputValue={newArticleCategory}
          changeValue={setNewArticleCategory}
        />
        <div className={addArticleStyles.add_image_block}>
          <div className={addArticleStyles.image_block}>
            <img
              src={imgNewArticle || emptyImg}
              className={
                imgNewArticle
                  ? addArticleStyles.img
                  : addArticleStyles.img_filtered
              }
              alt={'User image for new Article'}
            />
          </div>
          <div className={addArticleStyles.add_img_buttons}>
            <div className={addArticleStyles.upload_input}>
              <label htmlFor="upload" className={addArticleStyles.input_label}>
                {imgNewArticle ? 'Change Photo' : 'Upload Photo'}
              </label>
              <input
                id="upload"
                className={addArticleStyles.input_file_hidden}
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={saveImage}
              />
            </div>
            {imgNewArticle && (
              <Button
                title="Delete image"
                type={'header_logIn'}
                click={clearImg}
              />
            )}
          </div>
        </div>
        <Editor
          editorStyle={{
            border: '1px solid #E1E1E1',
            padding: '0px 10px',
            minHeight: '335px',
            marginTop: '30px',
          }}
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={setEditorState}
        />
        <Button
          type={'profile_save_changes'}
          title="Publish an article"
          click={publishArticle}
          disable={checkInputs()}
        />
      </div>
    </div>
  )
}
