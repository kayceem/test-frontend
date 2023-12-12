import React from 'react';
import { Form, Checkbox, Button, Row, Col } from 'antd';
import './PrivacyForm.scss';

const PrivacyForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      name='privacyForm'
      initialValues={{ remember: true }}
      onFinish={onFinish}
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
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PrivacyForm;
