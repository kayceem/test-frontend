import React from 'react';
import { Modal, Spin } from 'antd';
import { useGetFeedbackQuery } from '../feedback.service';

interface FeedbackDetailsModalProps {
  feedbackId: string;
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackDetailsModal: React.FC<FeedbackDetailsModalProps> = ({ feedbackId, isOpen, onClose }) => {
  const { data, isFetching } = useGetFeedbackQuery(feedbackId);

  return (
    <Modal title='Feedback Details' open={isOpen} onCancel={onClose} footer={null}>
      {isFetching ? (
        <Spin />
      ) : (
        <div>
          <p>Name: {data?.feedback.name}</p>
          <p>Email: {data?.feedback.email}</p>
          <p>Message: {data?.feedback.message}</p>
        </div>
      )}
    </Modal>
  );
};

export default FeedbackDetailsModal;
