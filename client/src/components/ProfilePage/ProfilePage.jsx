import {useContext, useEffect} from 'react';
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
        authKey
    } = useContext(AppContext);

    const changeUserDescription = (e) => {
        setCurrentUserDescription(e.target.value);
    }
    const saveChanges = () => {
        setCurrentUser({
            ...currentUser,
            firstname: currentUserFirstName,
            lastname: currentUserLastName,
            description: currentUserDescription,
        })
        const newUsers = users.map(user => {
            if (user.userId !== authKey) {
                return user
            }
            return {
                ...user,
                avatar: profileAvatar,
                firstname: currentUserFirstName,
                lastname: currentUserLastName,
                description: currentUserDescription,
            }
        })

        setUsers(newUsers)
        localStorage.setItem('users', JSON.stringify(newUsers))
        const myArticles = (allArticles.filter((article) => article.userId === authKey))
        const otherArticles = (allArticles.filter((article) => article.userId !== authKey))
        const changedMyArticles = myArticles.map((article) => (
            {
                ...article,
                avatar: profileAvatar,
                firstname: currentUserFirstName,
                lastname: currentUserLastName
            }))
        console.log([...changedMyArticles, ...otherArticles])
        setAllArticles([...changedMyArticles, ...otherArticles]);
        localStorage.setItem('articles', JSON.stringify([...changedMyArticles, ...otherArticles]));
    }

    useEffect(() => {
        if (!!authKey) {
            const currentUser = users.find((user) => user.userId === authKey);
            setCurrentUser(currentUser);
            setProfileAvatar(currentUser.avatar);
            setCurrentUserDescription(currentUser.description);
            setCurrentUserLastName(currentUser.lastname);
            setCurrentUserFirstName(currentUser.firstname);
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
                    <img src={profileAvatar || defaultAvatar} className={profilePageStyles.avatar}/>
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