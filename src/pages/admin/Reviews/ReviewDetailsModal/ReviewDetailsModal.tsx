import React from 'react';
import { Modal, Typography } from 'antd';
import { useGetReviewQuery } from '../review.service'; // Đảm bảo đường dẫn này đúng
import './ReviewDetailsModal.scss';

const { Text } = Typography;

interface ReviewDetailsModalProps {
  reviewId: string;
  isOpen: boolean;
  onClose: () => void;
}

const ReviewDetailsModal: React.FC<ReviewDetailsModalProps> = ({ reviewId, isOpen, onClose }) => {
  const { data, isFetching } = useGetReviewQuery(reviewId);

  if (isFetching || !data) {
    return (
      <Modal className='review-details-modal' title='Review Details' open={isOpen} onCancel={onClose} footer={null}>
        <Text className='review-details__empty'>Loading...</Text>
      </Modal>
    );
  }

  return (
    <Modal className='review-details-modal' title='Review Details' open={isOpen} onCancel={onClose} footer={null}>
      <div className='review-details'>
        <div className='review-details__section'>
          <Text className='review-details__label'>User ID:</Text>
          <Text>{data.review.userId}</Text>
        </div>
        <div className='review-details__section'>
          <Text className='review-details__label'>Course ID:</Text>
          <Text>{data.review.courseId}</Text>
        </div>
        <div className='review-details__section'>
          <Text className='review-details__label'>Order ID:</Text>
          <Text>{data.review.orderId}</Text>
        </div>
        <div className='review-details__section'>
          <Text className='review-details__label'>Title:</Text>
          <Text>{data.review.title}</Text>
        </div>
        <div className='review-details__section'>
          <Text className='review-details__label'>Content:</Text>
          <Text>{data.review.content}</Text>
        </div>
        <div className='review-details__section'>
          <Text className='review-details__label'>Rating star:</Text>
          <Text>{data.review.ratingStar}</Text>
        </div>
      </div>
    </Modal>
  );
};

export default ReviewDetailsModal;
