import React, { useState } from 'react';
import { Input, Table, Pagination, Button, Space, message } from 'antd';
import { useGetReviewsQuery, useDeleteReviewMutation } from '../review.service';
import ReviewDetailsModal from '../ReviewDetailsModal/ReviewDetailsModal';
import { IReview } from '../../../../types/review.type'; 
import './ReviewsTable.scss';

const { Search } = Input;

const ReviewsTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isFetching } = useGetReviewsQuery({ _page: currentPage, _limit: pageSize, _q: searchTerm });
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();

  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleViewDetails = (reviewId: string) => {
    setSelectedReviewId(reviewId);
    setIsModalVisible(true);
  };

  const handleDelete = (reviewId: string) => {
    deleteReview(reviewId)
      .unwrap()
      .then(() => {
        void message.success('Review deleted successfully');
      })
      .catch(() => {
        void message.error('Failed to delete review');
      });
  };

  const columns = [
    {
      title: 'Course ID',
      dataIndex: 'courseId',
      key: 'courseId',
      ellipsis: true,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
    },
    {
      title: 'Rating',
      dataIndex: 'ratingStar',
      key: 'ratingStar',
      ellipsis: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: IReview, record: IReview) => (
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
    <div className='reviews-table'>
      <div className='search-bar'>
        <Search placeholder='Search by title' onSearch={handleSearch} enterButton allowClear />
      </div>
      <Table
        dataSource={data?.reviews as IReview[]}
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
      {selectedReviewId && (
        <ReviewDetailsModal
          reviewId={selectedReviewId}
          isOpen={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
      )}
    </div>
  );
};

export default ReviewsTable;
