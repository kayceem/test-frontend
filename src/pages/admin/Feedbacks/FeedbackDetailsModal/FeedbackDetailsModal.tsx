import React from 'react';
import { Modal, Spin, Typography } from 'antd';
import { useGetFeedbackQuery } from '../feedback.service';
import './FeedbackDetailsModal.scss';

const { Title, Text } = Typography;

interface FeedbackDetailsModalProps {
  feedbackId: string;
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackDetailsModal: React.FC<FeedbackDetailsModalProps> = ({ feedbackId, isOpen, onClose }) => {
  const { data, isFetching } = useGetFeedbackQuery(feedbackId);

  return (
    <Modal className="feedback-details-modal" title="Feedback Details" open={isOpen} onCancel={onClose} footer={null}>
      {isFetching ? (
        <Spin />
      ) : (
        <div className="feedback-details-content">
          <Title level={4}>Name:</Title>
          <Text>{data?.feedback.name}</Text>
          <Title level={4}>Email:</Title>
          <Text>{data?.feedback.email}</Text>
          <Title level={4}>Message:</Title>
          <Text>{data?.feedback.message}</Text>
        </div>
      )}
    </Modal>
  );
};

export default FeedbackDetailsModal;
