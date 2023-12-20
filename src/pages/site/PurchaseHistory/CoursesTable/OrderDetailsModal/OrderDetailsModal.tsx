import { Modal, Table, Image, Button, Row, Col } from 'antd';
import { IOrderHistory, IOrderHistoryItem } from '../../../../../types/order.type';
import React, { useState } from 'react';
import CourseReviewModal from './CourseReviewModal/CourseReviewModal';
import styles from './OrderDetailsModal.module.scss';

interface OrderDetailsModalProps {
    order: IOrderHistory | null;
    isOpen: boolean;
    onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, isOpen, onClose }) => {
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [reviewCourseId, setReviewCourseId] = useState<string | null>(null);
    const [reviewCourseInfo, setReviewCourseInfo] = useState<IOrderHistoryItem | null>(null);

    if (!order) return null;

    const openReviewModal = (courseId: string) => {
        const courseInfo = order.items.find(item => item._id === courseId) || null;

        setReviewCourseId(courseId);
        setReviewCourseInfo(courseInfo);
        setIsReviewModalOpen(true);
    };


    const handleReviewSubmit = (courseId: string, rating: number, title: string, review: string) => {
        console.log(`Review for course ${courseId} with rating ${rating}`);
        console.log(`Review Title: ${title}`);
        console.log(`Review Content: ${review}`);
    };

    const dataSource = order.items.map(item => ({
        key: item._id,
        name: item.name,
        thumbnail: <Image src={item.thumbnail} alt={item.name} />,
        finalPrice: `$${item.finalPrice || 0}`,
    }));

    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
        },
        {
            title: 'Final Price',
            dataIndex: 'finalPrice',
            key: 'finalPrice',
        },
        {
            title: 'Review Product',
            dataIndex: 'key',
            key: 'key',
            render: (key: string) => (
                <Button size="small" onClick={() => openReviewModal(key)}>Review</Button>
            ),
        },

    ];


    return (
        <Modal title="Order Details" open={isOpen} onCancel={onClose} footer={null} width={1000}>
            <Row gutter={20} className={styles.orderDetails}>
                <Col xs={24} lg={12} className={styles.orderDetails__info}>
                    <div className={styles.orderDetails__item}>
                        <strong>Order ID:</strong>
                        <span>{order._id}</span>
                    </div>
                    <div className={styles.orderDetails__item}>
                        <strong>Customer Name:</strong>
                        <span>{order.user.name}</span>
                    </div>
                    <div className={styles.orderDetails__item}>
                        <strong>Customer Email:</strong>
                        <span>{order.user.email}</span>
                    </div>
                    <div className={styles.orderDetails__item}>
                        <strong>Created At:</strong>
                        <span>{order.createdAt}</span>
                    </div>
                    <div className={styles.orderDetails__item}>
                        <strong>Total Price:</strong>
                        <span>${order.totalPrice}</span>
                    </div>
                    <div className={styles.orderDetails__item}>
                        <strong>Transaction Method:</strong>
                        <span>{order.transaction.method}</span>
                    </div>
                    <div className={styles.orderDetails__item}>
                        <strong>VAT Fee:</strong>
                        <span>${order.vatFee}</span>
                    </div>
                    <div className={styles.orderDetails__item}>
                        <strong>Customer Phone:</strong>
                        <span>{order.user.phone}</span>
                    </div>
                </Col>
                <Col xs={24} lg={12} className={styles.orderDetails__productList}>
                    <Table dataSource={dataSource} columns={columns} pagination={false} />
                </Col>
            </Row>
            <CourseReviewModal
                courseId={reviewCourseId}
                courseInfo={reviewCourseInfo}
                isOpen={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
                onReviewSubmit={handleReviewSubmit}
            />
        </Modal>
    );
};

export default OrderDetailsModal;
