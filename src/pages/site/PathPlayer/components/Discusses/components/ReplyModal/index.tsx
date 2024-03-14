/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';
import { Modal, Form, Input, Button, notification } from 'antd';
import { useAddReplyToDiscussMutation } from '../../../../../client.service';

// Thêm interface cho props nếu cần
interface ReplyModalProps {
  isReplyModalVisible: boolean;
  setIsReplyModalVisible: (isVisible: boolean) => void;
  parentDiscussId: string;
  userId: string;
  lessonId: string;
  courseId: string | null;
}

interface DiscussionFormValues {
  comments: string;
  title: string;
  userId: string;
  parentDiscussId: string;
  lessonId: string;
  sectionId: string;
  courseId: string;
}

const ReplyModal: React.FC<ReplyModalProps> = ({
  isReplyModalVisible,
  setIsReplyModalVisible,
  parentDiscussId,
  userId,
  lessonId,
  courseId
}) => {
  const [form] = Form.useForm();
  const [addReplyToDiscuss, { isLoading }] = useAddReplyToDiscussMutation();
  const discussId = parentDiscussId;

  const onFinish = async (values: DiscussionFormValues) => {
    try {
      await addReplyToDiscuss({
        ...values,
        comments: values.comments,
        parentDiscussId: discussId,
        userId: userId,
        lessonId: lessonId,
        courseId: courseId as string
      });
      notification.success({
        message: 'Thảo luận đã được thêm!',
        description: 'Cuộc thảo luận của bạn đã được tạo thành công.'
      });
    } catch (err) {
      notification.error({
        message: 'Lỗi!',
        description: 'Không thể thêm cuộc thảo luận. Vui lòng thử lại.'
      });
    }
  };

  return (
    <Modal
      title='Reply to Comment'
      visible={isReplyModalVisible}
      onOk={form.submit}
      onCancel={() => setIsReplyModalVisible(false)}
      footer={[
        <Button key='back' onClick={() => setIsReplyModalVisible(false)}>
          Cancel
        </Button>,
        <Button key='submit' type='primary' loading={isLoading} onClick={() => form.submit()}>
          Reply
        </Button>
      ]}
    >
      <Form form={form} onFinish={onFinish} layout='vertical'>
        <Form.Item name='comments' rules={[{ required: true, message: 'Please input your comments!' }]}>
          <Input.TextArea rows={4} placeholder='Write your reply here...' />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ReplyModal;
