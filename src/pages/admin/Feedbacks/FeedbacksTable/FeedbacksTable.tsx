import React, { useState } from 'react';
import { Input, Table, Pagination, Button, Space, message } from 'antd';
import { useGetFeedbacksQuery, useDeleteFeedbackMutation } from '../feedback.service';
import FeedbackDetailsModal from '../FeedbackDetailsModal/FeedbackDetailsModal';
import { IContact } from '../../../../types/contact.type';
import './FeedbacksTable.scss';

const { Search } = Input;

const FeedbacksTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isFetching } = useGetFeedbacksQuery({ _page: currentPage, _limit: pageSize, _q: searchTerm });
  const [deleteFeedback, { isLoading: isDeleting }] = useDeleteFeedbackMutation();

  const [selectedFeedbackId, setSelectedFeedbackId] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleViewDetails = (feedbackId: string) => {
    setSelectedFeedbackId(feedbackId);
    setIsModalVisible(true);
  };

  const handleDelete = (feedbackId: string) => {
    deleteFeedback(feedbackId)
      .unwrap()
      .then(() => {
        void message.success('Feedback deleted successfully');
      })
      .catch(() => {
        void message.error('Failed to delete feedback');
      });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      ellipsis: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: IContact, record: IContact) => (
        <Space size='middle'>
          <Button onClick={() => handleViewDetails(record._id)}>View Details</Button>
          <Button onClick={() => handleDelete(record._id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };

  return (
    <div className='feedbacks-table'>
      <div className='search-bar'>
        <Search placeholder='Search by name' onSearch={handleSearch} enterButton allowClear className='search-wrap'/>
      </div>
      <Table
        dataSource={data?.feedbacks as IContact[]}
        columns={columns}
        rowKey='_id'
        pagination={false}
        loading={isFetching}
      />
      <Pagination
        className='pagination'
        current={currentPage}
        pageSize={pageSize}
        total={data?.total}
        onChange={handlePageChange}
        showSizeChanger
      />
      {selectedFeedbackId && (
        <FeedbackDetailsModal
          feedbackId={selectedFeedbackId}
          isOpen={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
      )}
    </div>
  );
};

export default FeedbacksTable;
