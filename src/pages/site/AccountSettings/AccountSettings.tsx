import React from 'react';
import { Tabs } from 'antd';
import ProfileForm from './ProfileForm/ProfileForm';
import PrivacyForm from './PrivacyForm/PrivacyForm';
import PictureForm from './PictureForm/PictureForm';
import './AccountSettings.scss';

const tabsItems = [
  {
    label: 'E-Learning profile',
    key: '1',
    children: <ProfileForm />
  },
  {
    label: 'Profile picture',
    key: '2',
    children: <PictureForm />
  },
  {
    label: 'Privacy settings',
    key: '3',
    children: <PrivacyForm />
  }
];

const AccountSetting: React.FC = () => {
  return (
    <div className='account-settings'>
      <div className='account-settings-container container'>
        <h2 className='account-settings__title spacing-h-sm'>Account Settings</h2>
        <Tabs defaultActiveKey='1' className='account-settings__tabs' items={tabsItems} />
      </div>
    </div>
  );
};

export default AccountSetting;
