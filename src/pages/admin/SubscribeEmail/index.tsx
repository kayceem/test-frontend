import React from 'react';
import { useGetSubscribesQuery } from './SubscribeEmail.service';
import { List } from 'antd';
import { Space, Table, Tag } from 'antd';
import { ISubscribe } from '../../../types/subscribe.type';
import { transformDate } from '../../../utils/functions';

const { Column, ColumnGroup } = Table;

interface SubscribeEmail {
  email: string;
  firstName: string;
  createdAt: string;
}
const columns: ColumnsType<ISubscribe> = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (_: ISubscribe, record: ISubscribe) => (record.email)
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      render: (_: ISubscribe, record: ISubscribe) => transformDate(record.createdAt ? record.createdAt : new Date().toISOString())
    },
  ];
const SubscribeEmail = () => {
  const { data: subscribeResponse, isFetching: isFetchingSubscribe } = useGetSubscribesQuery();

  return (
    <div>
      <Table
      dataSource={subscribeResponse?.subscribe}
      columns={columns}
      pagination={{ pageSize: 5 }}
      scroll={{ x: 'min-content' }}
    />
    </div>
  );
};

export default SubscribeEmail;
