import React from 'react';
import './CommentList.scss';
import Avatar from 'antd/es/avatar/avatar';
import { UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

// Define the shape of the props expected by the component
interface Comment {
  id: string;
  author: string;
  content: string;
  // other properties like timestamp, likes, etc.
}

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList(props: CommentListProps) {
  const items: MenuProps['items'] = [
    {
      label: <a href='https://www.antgroup.com'>Thêm bình luận</a>,
      key: '0'
    },
    {
      label: <a href='https://www.aliyun.com'>Sửa bình luận</a>,
      key: '1'
    }
  ];
  return (
    <div>
      {props.comments.map((comment) => (
        <div className='comment' key={comment.id}>
          <div className='comment-header flex'>
            <Avatar className='mr-4' icon={<UserOutlined />} />
            <div className='comment-author'>{comment.author}</div>
          </div>
          <div className='comment-content ml-16 mt-4 bg-slate-300 px-6 py-7 rounded-2xl	'>{comment.content}</div>
          <div className='ml-12 px-6 mt-4'>
            <button className='text-1xl text-slate-800 hover:text-slate-400 mr-2'>Thích</button>
            <span>-</span>
            <button className='text-1xl text-slate-800 hover:text-slate-400 mr-4'>Trả lời</button>
            <Dropdown menu={{ items }} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <UnorderedListOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      ))}
    </div>
  );
}
