import React, { useEffect, useState } from 'react';
import { Form, Checkbox, Button, notification, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { getUserResponse, useUpdateUserMutation } from '../../client.service';
import { IUser } from '../../../../types/user.type';
import './PrivacyForm.scss';

const PrivacyForm: React.FC<{ userData: getUserResponse | undefined, isSuccess: boolean, userId: string }> = ({ userData, isSuccess, userId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  useEffect(() => {
    if (isSuccess && userData) {
      form.setFieldsValue({
        showProfile: userData.user.showProfile,
        showCourses: userData.user.showCourses
      });
    }
  }, [userData, isSuccess, form]);

  const [updateUser] = useUpdateUserMutation(); 

  const handleFinish = (values: IUser) => {
    onFinish(values).catch((error) => {
      console.error('Error during form submission:', error);
    });
  };

  

  const onFinish = async (values: IUser) => {
    setLoading(true);
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      const value = values[key as keyof IUser];
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
  
    try {
      const result = await updateUser({ userId, formData }).unwrap();
      notification.success({
        message: 'Success',
        description: result.message,
        placement: 'topRight',
      });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Error updating profile',
        placement: 'topRight',
      });
    } finally {
      setLoading(false); 
    }

  };
  return (
    <Form
      form={form}
      name='privacyForm'
      onFinish={handleFinish}
      scrollToFirstError
      className='privacy-form'
    >
      <Form.Item name='showProfile' valuePropName='checked' className='privacy-form__item'>
        <Checkbox className='privacy-form__checkbox'>Show your profile to logged-in users</Checkbox>
      </Form.Item>

      <Form.Item name='showCourses' valuePropName='checked' className='privacy-form__item'>
        <Checkbox className='privacy-form__checkbox'>Show courses you're taking on your profile page</Checkbox>
      </Form.Item>

      <Form.Item className='privacy-form__submit'>
        <Button type='primary' htmlType='submit' block>
          {loading ? <Spin indicator={antIcon} /> : 'Save '}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PrivacyForm;
