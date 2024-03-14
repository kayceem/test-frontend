import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Button, List, Modal, Space, Typography, notification } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import {
  useAddReplyToDiscussMutation,
  useDeleteDiscussionMutation,
  useGetDiscussionsByLessonIdQuery
} from '../../../../../client.service';
import UpdateDiscuss from '../UpdateDiscuss';
import ReplyModal from '../ReplyModal';

interface CommentsProps {
  userId: string;
  lessonId: string;
  courseId: string | null;
}

const CommentList: React.FC<CommentsProps> = ({ userId, lessonId, courseId }) => {
  const { data, isLoading, isError } = useGetDiscussionsByLessonIdQuery(lessonId);
  const discussData = data?.discuss;
  const [deleteDiscussion] = useDeleteDiscussionMutation();
  useAddReplyToDiscussMutation();

  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [isReplyModalVisible, setIsReplyModalVisible] = useState(false);
  const [parentDiscussId, setParentDiscussId] = useState<string>('');

  const handleUpdate = (id: string) => {
    setUpdatingId(id);
    setIsUpdateModalVisible(true);
  };

  const handleOk = () => {
    setIsUpdateModalVisible(false);
  };

  const handleCancel = () => {
    setIsUpdateModalVisible(false);
  };

  const handleOpenReplyModal = (discussId: string) => {
    setParentDiscussId(discussId);
    setIsReplyModalVisible(true);
  };

  if (isLoading) return <div>Loading comments...</div>;
  if (isError || !data) return <div>Error loading comments.</div>;

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Do you want to delete this discussion?',
      onOk() {
        deleteDiscussion(id)
          .then(() => {
            notification.success({
              message: 'Success',
              description: 'Discussion deleted successfully'
            });
          })
          .catch((error) => {
            notification.error({
              message: 'Error',
              description: 'Failed to delete discussion'
            });
            console.error('Failed to delete discussion:', error);
          });
      }
    });
  };

  return (
    <>
      <Content style={{ height: '600px', overflow: 'auto' }}>
        <List
          itemLayout='horizontal'
          dataSource={discussData}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.userId.avatar} />}
                title={<a href='#'>{item.userId.name}</a>}
                description={
                  <div>
                    <div style={{ wordBreak: 'break-word' }}>{item.comments}</div>
                    <div className='mt-3 mb-3'>
                      {item.replies && item.replies.length > 0 && (
                        <List
                          size='small'
                          dataSource={item.replies}
                          renderItem={(reply) => (
                            <List.Item>
                              <List.Item.Meta
                                avatar={<Avatar src={reply.userId.avatar} />}
                                title={<a href='#'>{reply.userId.name}</a>}
                                description={<div style={{ wordBreak: 'break-word' }}>{reply.comments}</div>}
                              />
                            </List.Item>
                          )}
                        />
                      )}
                      <Button onClick={() => handleOpenReplyModal(item._id)}>Reply</Button>
                    </div>
                  </div>
                }
              />
              <Typography.Text type='secondary' className='mr-4'>
                {item.createdAt ? new Date(item.createdAt).toLocaleString() : 'N/A'}
              </Typography.Text>
              {item.userId._id === userId && (
                <Space className='mr-3'>
                  <Button
                    icon={<EditOutlined style={{ color: '#000' }} />}
                    onClick={() => handleUpdate(item._id)}
                  ></Button>
                  <Button
                    icon={<DeleteOutlined style={{ color: '#000' }} />}
                    onClick={() => handleDelete(item._id)}
                  ></Button>
                </Space>
              )}
            </List.Item>
          )}
        />
      </Content>
      <UpdateDiscuss
        isUpdateModalVisible={isUpdateModalVisible}
        setIsUpdateModalVisible={setIsUpdateModalVisible}
        discussId={updatingId || ''}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <ReplyModal
        isReplyModalVisible={isReplyModalVisible}
        setIsReplyModalVisible={setIsReplyModalVisible}
        parentDiscussId={parentDiscussId}
        userId={userId}
        lessonId={lessonId}
        courseId={courseId}
      />
    </>
  );
};

export default CommentList;
