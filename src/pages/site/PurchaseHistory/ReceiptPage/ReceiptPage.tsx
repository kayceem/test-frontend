import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetOrderByIdQuery } from '../../client.service';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from './ReceiptPage.module.scss';

interface DataType {
    key?: React.Key;
    name?: string;
    createdAt?: string;
    finalPrice?: number;
    quantity: number;
}

type Params = { [key: string]: string | undefined; }

const ReceiptPage: React.FC = () => {
    const { orderId } = useParams<Params>();
    const { data: orderDetails } = useGetOrderByIdQuery(orderId || '');

    if (!orderDetails) {
        return;
    }

    const formatDate = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'Item',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ordered',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text: string) => formatDate(text),
            responsive: ['md'],
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: () => 1,
        },
        {
            title: 'Price',
            dataIndex: 'finalPrice',
            key: 'finalPrice',
            render: (text: number) => `$${text.toLocaleString()}`,
            responsive: ['sm'],
        },
        {
            title: 'Amount',
            dataIndex: 'finalPrice',
            key: 'amount',
            render: (text: number) => `$${text.toLocaleString()}`,
            responsive: ['lg'],
        },
    ];


    const dataSource: DataType[] = orderDetails.order.items.map((item) => ({
        key: item._id,
        name: item.name,
        createdAt: orderDetails.order.createdAt,
        finalPrice: item.finalPrice,
        quantity: 1,
    }));

    const footerTable = () => (
        <div className={styles.receiptPage__table__footer}>
            <p>Tax*: ${orderDetails.order.vatFee}</p>
            <p>Total Paid: ${orderDetails.order.totalPrice}</p>
        </div>
    );

    return (
        <div className={styles.receiptPage}>
            <div className={'container'}>
                <h2 className={styles.receiptPage__title}>Receipt</h2>
                <div className={styles.receiptPage__dateTitle}>Receipt - {formatDate(orderDetails.order.createdAt || '')} </div>
                <p className={styles.receiptPage__companyName}>E-Leaning, Inc.</p>
                <div className={styles.receiptPage__info}>
                    <div className={styles.receiptPage__company}>
                        <p className={styles.receiptPage__companyAddress}>600 Harrison Street, 3rd Floor</p>
                        <p className={styles.receiptPage__companyCity}>San Francisco, CA 94107, US</p>
                        <p className={styles.receiptPage__companyCity}>elearning.com</p>
                    </div>
                    <div className={styles.receiptPage__order}>
                        <p className={styles.receiptPage__date}><strong>Date:</strong> {formatDate(orderDetails.order.createdAt || '')}</p>
                        <p className={styles.receiptPage__orderNumber}><strong>Order #:</strong> {orderDetails.order._id}</p>
                    </div>
                </div>
                <p className={styles.receiptPage__soldTo}><strong>Sold To:</strong> {orderDetails.order.user.name}</p>
                <Table className={styles.receiptPage__table} columns={columns} dataSource={dataSource} pagination={false} footer={footerTable} />
                <div className={styles.receiptPage__taxNote} >
                    <p className={styles.receiptPage__taxNoteItem}>*For any users charged VAT, the Tax amount is calculated on the Subtotal, not the Total Amount.</p>
                    <p className={styles.receiptPage__taxNoteItem}>If you have any questions about this receipt please contact our support team.</p>
                </div>
            </div>
        </div>
    );
};

export default ReceiptPage;


