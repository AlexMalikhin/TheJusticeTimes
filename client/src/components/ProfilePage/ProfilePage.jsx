import {useContext, useEffect} from 'react';
import axios from "axios";
import Cookies from "js-cookie";
import {Button} from '../Button/Button';
import {Input} from '../Input/Input';
import {AppContext} from '../AppContext/AppContext';
import defaultAvatar from '../../img/defaultAvatar.png';
import profilePageStyles from './ProfilePage.module.css';
import buttonStyles from '../Button/Button.module.css';
import inputStyles from '../Input/Input.module.css';


export const ProfilePage = () => {
    const reader = new FileReader();
    const {
        currentUserFirstName,
        currentUserLastName,
        currentUserDescription,
        setCurrentUserFirstName,
        setCurrentUserLastName,
        setCurrentUserDescription,
        profileAvatar,
        setProfileAvatar,
        authKey
    } = useContext(AppContext);

    const changeUserDescription = (e) => {
        setCurrentUserDescription(e.target.value);
    }

    const saveChanges = async () => {
        try{
            const currentUserData = {
                firstname: currentUserFirstName,
                lastname: currentUserLastName,
                avatar: profileAvatar,
                description: currentUserDescription,
                token: Cookies.get('token')
            }
            await axios.post('http://localhost:5001/user/updateUser', currentUserData);
        }catch (e) {
            console.log('hui')
        }
    }

    useEffect(async() => {
        if (!!authKey) {
            try{
                const token = {"token": Cookies.get('token')};
                const user = await axios.post('http://localhost:5001/user/getUserData', token);
                setCurrentUserFirstName(user.data.firstname);
                setCurrentUserLastName(user.data.lastname);
                setProfileAvatar(user.data.avatar);
                setCurrentUserDescription(user.data.description);
            }catch (e) {
                console.log(e.response.message)
            }
        }
    }, [authKey])

    const saveImage = (e) => {
        const file = e.target.files[0];
        reader.onloadend = () => {
            const base64String = reader.result;
            setProfileAvatar(base64String);
        };
        reader.readAsDataURL(file);
    };
    const clearImg = () => {
        setProfileAvatar('')
    }

    return (
        <div className={profilePageStyles.block}>
            <h1 className={profilePageStyles.header}>Profile</h1>
            <div className={profilePageStyles.content_block}>
                <div className={profilePageStyles.photo_block}>
                    <img src={profileAvatar || defaultAvatar} className={profilePageStyles.avatar} alt={'user avatar'}/>
                    <div className={profilePageStyles.upload_input}>
                        <label htmlFor='upload'
                               className={profilePageStyles.input_label}>{profileAvatar ? 'Change Photo' : 'Upload photo'}</label>
                        <input id='upload' className={profilePageStyles.input_file_hidden} type='file'
                               accept=".png, .jpg, .jpeg" onChange={saveImage}/>
                    </div>
                    {profileAvatar &&
                        <button className={profilePageStyles.delete_link} onClick={clearImg}>Delete photo</button>}
                </div>
                <div className={profilePageStyles.user_info}>
                    <div className={profilePageStyles.user_data_block}>
                        <Input
                            name='First name'
                            label='First name'
                            style={inputStyles.input}
                            inputValue={currentUserFirstName}
                            changeValue={setCurrentUserFirstName}
                        />
                        <Input
                            name='Last name'
                            label='Last name'
                            style={inputStyles.input}
                            inputValue={currentUserLastName}
                            changeValue={setCurrentUserLastName}
                        />
                    </div>
                    <label htmlFor='description'>Description</label>
                    <textarea
                        name='description'
                        className={profilePageStyles.description}
                        defaultValue={currentUserDescription}
                        onChange={changeUserDescription}
                    />
                    <Button title='Save Changes' style={buttonStyles.profile_save_changes} click={saveChanges}/>
                </div>
            </div>
        </div>
    )
}
