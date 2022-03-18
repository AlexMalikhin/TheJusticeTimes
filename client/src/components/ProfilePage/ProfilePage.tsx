import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import { getCurrentUser } from '../../store/asyncActions/authActions/getUserData'
import { updateUserData } from '../../store/asyncActions/authActions/updateUserData'
import { fetchAllArticles } from '../../store/asyncActions/articlesActions/getAllArticles'
// @ts-ignore
import defaultAvatar from '../../img/defaultAvatar.png'
import profilePageStyles from './ProfilePage.module.scss'

export const ProfilePage: React.FC = () => {
  const reader = new FileReader()
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state: any) => state.authReducer)
  const { isLoading } = useSelector((state: any) => state.authReducer)
  const [profileAvatar, setProfileAvatar] = useState<
    string | null | ArrayBuffer
  >('')
  const [currentUserFirstName, setCurrentUserFirstName] = useState('')
  const [currentUserLastName, setCurrentUserLastName] = useState('')
  const [currentUserDescription, setCurrentUserDescription] = useState('')

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [])
  useEffect(() => {
    setProfileAvatar(currentUser?.avatar)
    setCurrentUserFirstName(currentUser?.firstname)
    setCurrentUserLastName(currentUser?.lastname)
    setCurrentUserDescription(currentUser?.description)
  }, [currentUser])

  const changeUserDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentUserDescription(e.target.value)
  }

  const saveChanges = () => {
    dispatch(
      updateUserData(
        currentUserFirstName,
        currentUserLastName,
        profileAvatar,
        currentUserDescription
      )
    )
  }

  const saveImage = (e: any) => {
    const file = e.target.files[0]
    reader.onloadend = () => {
      const base64String: string | null | ArrayBuffer = reader.result
      setProfileAvatar(base64String)
    }
    reader.readAsDataURL(file)
  }

  const clearImg = () => {
    setProfileAvatar('')
  }

  return (
    <>
      {isLoading ? (
        <div className={profilePageStyles.lds_dual_ring} />
      ) : (
        <div className={profilePageStyles.block}>
          <h1 className={profilePageStyles.header}>Profile</h1>
          <div className={profilePageStyles.content_block}>
            <div className={profilePageStyles.photo_block_container}>
              <div className={profilePageStyles.photo_block}>
                <img
                  src={profileAvatar || defaultAvatar}
                  className={profilePageStyles.avatar}
                  alt={'user avatar'}
                />
                <div className={profilePageStyles.upload_input}>
                  <label
                    htmlFor="upload"
                    className={profilePageStyles.input_label}
                  >
                    {profileAvatar ? 'Change Photo' : 'Upload photo'}
                  </label>
                  <input
                    id="upload"
                    className={profilePageStyles.input_file_hidden}
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={saveImage}
                  />
                </div>
                {profileAvatar && (
                  <button
                    className={profilePageStyles.delete_link}
                    onClick={clearImg}
                  >
                    Delete photo
                  </button>
                )}
              </div>
            </div>
            <div className={profilePageStyles.user_info}>
              <div className={profilePageStyles.user_data_block}>
                <Input
                  name="First name"
                  label="First name"
                  inputValue={currentUserFirstName}
                  changeValue={setCurrentUserFirstName}
                  classNam={'input'}
                />
                <Input
                  name="Last name"
                  label="Last name"
                  inputValue={currentUserLastName}
                  changeValue={setCurrentUserLastName}
                  classNam={'input'}
                />
              </div>
              <label
                className={profilePageStyles.description_label}
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                name="description"
                className={profilePageStyles.description}
                defaultValue={currentUserDescription}
                onChange={changeUserDescription}
              />
              <Button
                title="Save Changes"
                type={'profile_save_changes'}
                click={saveChanges}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
