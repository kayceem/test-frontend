import React from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import './ProfileForm.scss';

const ProfileForm: React.FC = () => {
  const [form] = Form.useForm();

  const initialValues = {
    language: 'en-US'
  };

  const { Option } = Select;

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={onFinish}
      initialValues={initialValues}
      requiredMark={false}
      className='profile-form'
    >
      <Row gutter={{ xs: 24, lg: 32 }}>
        <Col xs={24} md={18} lg={12}>
          <Form.Item
            name='fullName'
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
              <Option value='en-US'>English (US)</Option>
              <Option value='id'>Bahasa Indonesia</Option>
              <Option value='de'>Deutsch</Option>
              <Option value='es-ES'>Español (España)</Option>
              <Option value='fr-FR'>Français (France)</Option>
              <Option value='vi'>Tiếng Việt</Option>
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
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileForm;
