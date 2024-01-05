import React, { useState } from 'react';
import './CommentForm.scss';
import Avatar from 'antd/es/avatar/avatar';
import { UserOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
import { Button } from 'antd';

const CommentForm: React.FC = () => {
  const [comment, setComment] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle the submission logic here
    console.log(comment);
    setComment('');
  };

  return (
    <form className='comment-form' onSubmit={handleSubmit}>
      <div className='div flex mb-36'>
        <Avatar className='mr-4' icon={<UserOutlined />} />
        <ReactQuill className='comment-input' placeholder='Thêm bình luận...' value={comment} onChange={setComment} />
      </div>
      <div className='div flex justify-end'>
        <Button className='comment-btn mr-8' type='primary' htmlType='submit'>
          Bình luận
        </Button>
        <Button className='comment-btn' type='primary' htmlType='submit'>
          Hủy
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
