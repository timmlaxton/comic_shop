import React from 'react';
import UserLayout from '../../../hoc/user';
import ManageCharacters from './manage_characters';
import ManagePublishers from './manage_publishers'



const MangageCatergories = () => {
    return (
        <UserLayout>
            <ManageCharacters/>
            <ManagePublishers/>
        </UserLayout>
    );
};

export default MangageCatergories;