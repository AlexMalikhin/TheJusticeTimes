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
        authKey} = useContext(AppContext);

    const [othersUsers, setOthersUsers] = useState([]);
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
        setUsers([...otherUsers, {
            ...currentUser,
            firstname: currentUserFirstName,
            lastname: currentUserLastName,
            description: currentUserDescription,
        }])

        localStorage.setItem('users', JSON.stringify([...otherUsers, {
            ...currentUser,
            firstname: currentUserFirstName,
            lastname: currentUserLastName,
            description: currentUserDescription,
        }]))
    }

    console.log(users)

    useEffect(()=>{
        if(!!authKey){
            const currentUser = users.find((user)=> user.userId === authKey);
            setCurrentUser(currentUser);
            setCurrentUserDescription(currentUser.description);
            setCurrentUserLastName(currentUser.lastname);
            setCurrentUserFirstName(currentUser.firstname);
        }
    },[authKey])

    return(
        <div className={profilePageStyles.block}>
            <h1 className={profilePageStyles.header}>Profile</h1>
            <div className={profilePageStyles.content_block}>
                <div className={profilePageStyles.photo_block}>
                    <img src={defaultAvatar} className={profilePageStyles.avatar}/>
                    <div className={profilePageStyles.upload_input}>
                        <label htmlFor='upload' className={profilePageStyles.input_label}>Change Photo</label>
                        <input id='upload' className={profilePageStyles.input_file_hidden} type='file' accept=".png, .jpg, .jpeg"/>
                    </div>
                    <Link to='/Profile' className={profilePageStyles.delete_link}>Delete photo</Link>
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