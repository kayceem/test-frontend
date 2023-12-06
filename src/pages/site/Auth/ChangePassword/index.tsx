import { FacebookFilled, GithubOutlined, GoogleOutlined, LinkedinFilled, LoadingOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Space, Spin, notification } from 'antd';
import jwtDecode from 'jwt-decode';
import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import ButtonCmp from '../../../../components/Button';
import { useGenerateNewPasswordMutation, useUpdateLastLoginMutation } from '../../../auth.service';
import { closeAuthModal, setAuthenticated } from '../../../auth.slice';
import '../ChangePassword.scss';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
interface ChangePasswordProps {
  onClick: (authState: string) => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = (props) => {
  const [form] = Form.useForm();
  const [generateNewPass, generateNewPassResult] = useGenerateNewPasswordMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const [updateLastLogin] = useUpdateLastLoginMutation();

  const onFinish = (formValues: { token: string; newPassword: string }) => {
    const userCredentials: { email: string; password: string } = {
      
    };

    setIsSubmitting(true);
    generateNewPass({
      password: formValues.newPassword,
      passwordToken: formValues.token,
      userId: ""
    })
    .unwrap()
      .then((result) => {
        // if(result.error) {
        //   notification.error({ type: 'error', message: result.error.data.message, duration: 2 });
        // }
        if ('error' in result) {
          notification.error({ type: 'error', message: 'login failed', description: 'Email or password incorrect' });
        }

   

        if (!generateNewPassResult.isLoading) {
          setIsSubmitting(false);
        }

        // Handling error failed login here
        // if ('error' in result) {
        //   if ('status' in result.error) {
        //     console.log('show notification!');
        //   }
        // }
        // if (result.error.status === 500) {
        //   console.log('show notification!');
        // }
      })
      .catch((error) => {
        console.log('error:', error);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const navigateLoginHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    props.onClick('signup');
  };

  const navigateForgotPassHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    props.onClick('forgot');
  };


  return (
    <Fragment>
      <div className='auth__title'>
        <h2 className='auth__title-heading'>Update your password</h2>
      </div>

      <Divider></Divider>

      <Form
        form={form}
        name='basic'
        layout='vertical'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 800 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item wrapperCol={{ span: 24 }} label='New Password' name='newPassword' rules={[{ required: true, message: 'Please input your new password!' }]}>
          <Input className='' />
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 24 }}
          label='Token'
          name='token'
          rules={[{ required: true, message: 'Please input your token!' }]}
        >
          <Input.Password className='' />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <ButtonCmp disabled={isSubmitting} className='btn btn-primary btn-sm w-full'>
            {isSubmitting ? <Spin indicator={antIcon} /> : 'Login '}
          </ButtonCmp>
          {/* <Button loading={true}>
            Submit Ant Design <Spin indicator={antIcon} />;
          </Button> */}
        </Form.Item>
      </Form>
      <div className='auth__footer'>
    
      </div>
    </Fragment>
  );
};

export default ChangePassword;
