import React, { useState } from 'react';
import { Modal, Rate, Input, Form, Image } from 'antd';
import { IOrderHistoryItem } from '../../../../../../types/order.type';

interface CourseReviewModalProps {
    courseId: string | null;
    courseInfo: IOrderHistoryItem | null;
    isOpen: boolean;
    onClose: () => void;
    onReviewSubmit: (courseId: string, rating: number, title: string, review: string) => void;
}


const CourseReviewModal: React.FC<CourseReviewModalProps> = ({ courseId, courseInfo, isOpen, onClose, onReviewSubmit }) => {
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState('');
    const [review, setReview] = useState('');

    const handleSubmit = () => {
        if (!courseId) return;

        onReviewSubmit(courseId, rating, title, review);

        setRating(0);
        setTitle('');
        setReview('');

        onClose();
    };

    const handleCancel = () => {
        setRating(0);
        setTitle('');
        setReview('');

        onClose();
    };



    return (
        <Modal
            title={`Review Course: ${courseInfo?.name || "Unknown Course"}`}
            open={isOpen}
            onOk={handleSubmit}
            onCancel={handleCancel}
            okText="Submit Review"
            cancelText="Cancel"
        >
            <Form layout="vertical">
                {courseInfo?.thumbnail && (
                    <Form.Item >
                        <Image src={courseInfo.thumbnail} alt={courseInfo.name} />
                    </Form.Item>
                )}
                {courseInfo?.finalPrice && (
                    <Form.Item >
                        <span>${courseInfo.finalPrice.toFixed(2)}</span>
                    </Form.Item>
                )}
                <Form.Item label="Rating">
                    <Rate allowHalf onChange={setRating} value={rating} />
                </Form.Item>
                <Form.Item label="Review Title">
                    <Input onChange={e => setTitle(e.target.value)} value={title} />
                </Form.Item>
                <Form.Item label="Your Review">
                    <Input.TextArea onChange={e => setReview(e.target.value)} value={review} />
                </Form.Item>

            </Form>
        </Modal>
    );
};

export default CourseReviewModal;
