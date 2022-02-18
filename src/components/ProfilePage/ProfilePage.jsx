import { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { AppContext } from '../AppContext/AppContext';

import defaultAvatar from '../../img/defaultAvatar.png';
import profilePageStyles from './ProfilePage.module.css';
import avatar from '../../img/avatars/JanayWright.png';
import buttonStyles from '../Button/Button.module.css';
import inputStyles from '../Input/Input.module.css';


export const ProfilePage = () =>{
    const reader = new FileReader();
    const {
        users,
        setUsers,
        currentUser,
        setCurrentUser,
        currentUserFirstName,
        currentUserLastName,
        currentUserDescription,
        setCurrentUserFirstName,
        setCurrentUserLastName,
        setCurrentUserDescription,
        profileAvatar,
        setProfileAvatar,
        allArticles,
        setAllArticles,
        authKey} = useContext(AppContext);

    const [othersUsers, setOthersUsers] = useState([]);
    // const [newImage, setNewImage] = useState('');
    const changeUserDescription = (e) =>{
        setCurrentUserDescription((value)=> value = e.target.value);
    }
    const saveChanges = () =>{
        setCurrentUser({
            ...currentUser,
            firstname: currentUserFirstName,
            lastname: currentUserLastName,
            description: currentUserDescription,
        })
        const otherUsers = (users.filter((user)=> user.userId !== authKey));
        const allNewUsers = [...otherUsers, {
            ...currentUser,
            avatar: profileAvatar,
            firstname: currentUserFirstName,
            lastname: currentUserLastName,
            description: currentUserDescription,
        }]
        setUsers(allNewUsers)
        localStorage.setItem('users', JSON.stringify(allNewUsers))
        const myArticles = (allArticles.filter((article)=> article.userId === authKey))
        console.log(myArticles);
        const chagedMyArticles = myArticles.map((article)=> ({...article, avatar: profileAvatar, firstname: currentUserFirstName, lastname: currentUserLastName }))
        setAllArticles(chagedMyArticles);
        localStorage.setItem('articles', JSON.stringify(chagedMyArticles));
        console.log(chagedMyArticles);
        // console.log(changedMyArticles);
        // написать функцию по получению , изменению фамилии ,имени и аватара B массиве articles и отправке на localStorage
    }

    useEffect(()=>{
        if(!!authKey){
            const currentUser = users.find((user)=> user.userId === authKey);
            setCurrentUser(currentUser);
            setProfileAvatar(currentUser.avatar);
            setCurrentUserDescription(currentUser.description);
            setCurrentUserLastName(currentUser.lastname);
            setCurrentUserFirstName(currentUser.firstname);
        }
    },[authKey])

    const saveImage = (e) => {
        const file = e.target.files[0];
        reader.onloadend = () => {
            const base64String = reader.result;
            setProfileAvatar(base64String);
        };
        reader.readAsDataURL(file);
    };
    const clearImg = () =>{
        setProfileAvatar('')
    }

    return(
        <div className={profilePageStyles.block}>
            <h1 className={profilePageStyles.header}>Profile</h1>
            <div className={profilePageStyles.content_block}>
                <div className={profilePageStyles.photo_block}>
                    <img src={profileAvatar || defaultAvatar} className={profilePageStyles.avatar}/>
                    <div className={profilePageStyles.upload_input}>
                        <label htmlFor='upload' className={profilePageStyles.input_label}>Change Photo</label>
                        <input id='upload' className={profilePageStyles.input_file_hidden} type='file' accept=".png, .jpg, .jpeg" onChange={saveImage}/>
                    </div>
                    <button className={profilePageStyles.delete_link} onClick={clearImg}>Delete photo</button>
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