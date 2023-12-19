import { Modal, Table, Image, Button, Row, Col } from 'antd';
import { IOrderHistory } from '../../../../../types/order.type';
import React from 'react';
import styles from './OrderDetailsModal.module.scss';

interface OrderDetailsModalProps {
    order: IOrderHistory | null;
    isOpen: boolean;
    onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, isOpen, onClose }) => {
    if (!order) return null;

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
                <Button size="small" onClick={() => handleReviewProduct(key)}>Review</Button>
            ),
        },

    ];

    const handleReviewProduct = (courseId: string) => {
        console.log(`Reviewing product with ID: ${courseId}`);
    };


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
        </Modal>
    );
};

export default OrderDetailsModal;
