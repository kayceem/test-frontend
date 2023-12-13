import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, Select, notification, Spin  } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './ProfileForm.scss';
import { getUserResponse, useUpdateUserMutation } from '../../client.service';
import { IUser } from '../../../../types/user.type';

const ProfileForm: React.FC<{ userData: getUserResponse | undefined, isSuccess: boolean, userId: string }> = ({ userData, isSuccess, userId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  useEffect(() => {
    if (isSuccess && userData) {
      form.setFieldsValue({
        name: userData.user.name,
        email: userData.user.email,
        phone: userData.user.phone,
        headline: userData.user.headline,
        biography: userData.user.biography,
        website: userData.user.website,
        twitter: userData.user.twitter,
        facebook: userData.user.facebook,
        linkedin: userData.user.linkedin,
        youtube: userData.user.youtube,
        language: userData.user.language
      });
    }
  }, [userData, isSuccess, form]);

  const [updateUser] = useUpdateUserMutation(); 

  const { Option } = Select;

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
    <Form form={form} layout='vertical' onFinish={handleFinish} requiredMark={false} className='profile-form'>
      <Row gutter={{ xs: 24, lg: 32 }}>
        <Col xs={24} md={18} lg={12}>
          <Form.Item
            name='name'
            label='Full Name'
            className='profile-form__item'
            rules={[{ required: true, message: 'Please input your full name!' }]}
          >
            <Input className='profile-form__input' />
          </Form.Item>

          <Form.Item
            name='email'
            label='Email'
            className='profile-form__item'
            rules={[
              {
                required: true,
                message: 'Please input your email!'
              },
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              }
            ]}
          >
            <Input className='profile-form__input' />
          </Form.Item>

          <Form.Item
            name='phone'
            label='Phone'
            className='profile-form__item'
            rules={[
              {
                required: true,
                message: 'Please input your phone number!'
              },
              {
                pattern: new RegExp(/^[0-9+\-\s()]+$/),
                message: 'Please input a valid phone number!'
              }
            ]}
          >
            <Input className='profile-form__input' />
          </Form.Item>

          <Form.Item
            name='headline'
            label='Headline'
            className='profile-form__item'
            rules={[{ required: true, message: 'Please input your headline!' }]}
          >
            <Input className='profile-form__input' placeholder='Instructor at E-Learning' />
          </Form.Item>

          <Form.Item
            name='biography'
            label='Biography'
            className='profile-form__item mb-0'
            rules={[{ required: true, message: 'Please input your biography!' }]}
          >
            <Input.TextArea
              rows={4}
              className='profile-form__input profile-form__input--textarea'
              placeholder='Share something about yourself'
            />
          </Form.Item>
          <div className='profile-form__bio-hint'>
            To help learners learn more about you, your bio should reflect your Credibility, Empathy, Passion, and
            Personality. Your biography should have at least 50 words, links and coupon codes are not permitted.
          </div>

          <Form.Item
            name='language'
            label='Language'
            className='profile-form__item'
            rules={[{ required: true, message: 'Please select your language!' }]}
          >
            <Select
              className='profile-form__input profile-form__input--select'
              placeholder='Select a language'
              optionFilterProp='children'
            >
              <Option value='en'>English</Option>
              <Option value='es'>Spanish</Option>
              <Option value='pt'>Portuguese</Option>
              <Option value='it'>Italian</Option>
              <Option value='de'>German</Option>
              <Option value='fr'>French</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={18} lg={12}>
          <Form.Item name='website' className='profile-form__item' label='Website'>
            <Input className='profile-form__input' placeholder='Url' />
          </Form.Item>

          <Form.Item name='twitter' className='profile-form__item' label='Twitter'>
            <Input
              className='profile-form__input profile-form__input--social'
              addonBefore='http://twitter.com/'
              placeholder='Username'
            />
          </Form.Item>

          <Form.Item name='facebook' className='profile-form__item' label='Facebook'>
            <Input
              className='profile-form__input profile-form__input--social'
              addonBefore='http://facebook.com/'
              placeholder='Username'
            />
          </Form.Item>

          <Form.Item name='linkedin' className='profile-form__item' label='LinkedIn'>
            <Input
              className='profile-form__input profile-form__input--social'
              addonBefore='http://linkedin.com/in/'
              placeholder='Resource ID'
            />
          </Form.Item>

          <Form.Item name='youtube' className='profile-form__item' label='Youtube'>
            <Input
              className='profile-form__input profile-form__input--social'
              addonBefore='http://youtube.com/'
              placeholder='Username'
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item className='profile-form__submit'>
        <Button type='primary' htmlType='submit' block>
          {loading ? <Spin indicator={antIcon} /> : 'Save '}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileForm;
