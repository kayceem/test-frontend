import { Modal } from 'antd';
import { IOrderHistory } from '../../../../../types/order.type';
import React from 'react';

interface OrderDetailsModalProps {
    order: IOrderHistory | null;
    isOpen: boolean;
    onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, isOpen, onClose }) => {
    if (!order) return null;

    const test = order.items.map((item) => item._id);

    console.log(test);



    return (
        <Modal title="Order Details" open={isOpen} onCancel={onClose} footer={null}>
            <div>
                <p><strong>User Name:</strong> {order.user.name}</p>
                <p><strong>Email:</strong> {order.user.email}</p>
                <ul>
                    {order.items.map(item => (
                        <li key={item._id}>
                            {item.name} - ${item.finalPrice}
                        </li>
                    ))}
                </ul>
            </div>
        </Modal>
    );
};

export default OrderDetailsModal;
