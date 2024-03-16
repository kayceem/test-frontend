/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  CheckCircleOutlined,
  EditOutlined,
  EyeOutlined,
  HistoryOutlined,
  MessageOutlined,
  StopOutlined
} from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { transformDate } from '../../../../utils/functions';
import { IDiscuss } from '../../../../types/discuss.type';
import { ICourse } from '../../../../types/course.type';
import { ISection } from '../../../../types/lesson.type';

interface IDisCussProps {
  data: IDiscuss[];
  onDiscussEdit: (discussId: string) => void;
  course: ICourse[];
  section: ISection[];
}

const ListDiscuss: React.FC<IDisCussProps> = ({ data, onDiscussEdit, course, section }) => {
  const dispatch = useDispatch();
  // const [updateActiveStatusBlogComments] = useUpdateActiveStatusBlogCommentsMutation();
  const [blogCommentId, setSelectedCommentsId] = useState('');
  const [discusss, setDiscuss] = useState(data);
  const [detailVisible, setDetailVisible] = useState(false);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [MessVisible, setMessVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const getCourseName = (courseId: string) => {
    const courseObj = course.find((c) => c._id === courseId);
    return courseObj ? courseObj.name : 'Unknown Course';
  };

  const getSectionName = (sectionId: string) => {
    const sectionObj = section.find((c) => c._id === sectionId);
    return sectionObj ? sectionObj.name : 'Unknown Course';
  };

  const handleTableChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleViewDetail = (commentId: string) => {
    setDetailVisible(true);
    setSelectedCommentsId(commentId);
  };

  const handleViewHistory = (commentId: string) => {
    setHistoryVisible(true);
    setSelectedCommentsId(commentId);
  };

  const handleViewMess = (commentId: string) => {
    setMessVisible(true);
    setSelectedCommentsId(commentId);
  };

  // const handleUpdateStatus = (commentId: string) => {
  //   updateActiveStatusBlogComments({ commentId: commentId })
  //     .unwrap()
  //     .then(() => {
  //       void message.success('Blog Comments status updated successfully');
  //       const updatedComments = comments.map((comment) => {
  //         if (comment._id === commentId) {
  //           return {
  //             ...comment,
  //             isDeleted: !comment.isDeleted
  //           };
  //         }
  //         return comment;
  //       });
  //       setComments(updatedComments);
  //     })
  //     .catch(() => {
  //       void message.error('Failed to update blog category status');
  //     });
  // };

  // const BlogCommentsEditHandler = (blogId: string) => {
  //   onBlogCommentsEdit(blogId);
  //   dispatch(startEditBlogComments(blogId));
  // };

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'Avatar',
      key: 'Avatar',
      render: (_: IDiscuss, record: IDiscuss) => (
        <img src={record.userId.avatar} alt='Avatar' style={{ width: '50px', height: '50px' }} />
      )
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: IDiscuss, record: IDiscuss) => <span>{record.userId.name}</span>
    },
    {
      title: 'Course Name',
      dataIndex: 'CourseName',
      key: 'CourseName',
      render: (_: IDiscuss, record: IDiscuss) => <span>{getCourseName(record.courseId)}</span>
    },
    {
      title: 'Lesson Name',
      dataIndex: 'LessonNamee',
      key: 'LessonName',
      render: (_: IDiscuss, record: IDiscuss) => {
        return <span>{getSectionName(record.lessonId)}</span>;
      }
    },
    {
      title: 'Comments',
      dataIndex: 'Comments',
      key: 'Comments',
      render: (_: IDiscuss, record: IDiscuss) => <span>{record.comments}</span>
    },

    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_: IDiscuss, record: IDiscuss) => (
        <span>{record.createdAt ? transformDate(record.createdAt) : 'N/A'}</span>
      )
    },
    {
      title: 'Status',
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      render: (_: IDiscuss, record: IDiscuss) => <span>{record.isDeleted ? 'Active' : 'UnActive'}</span>
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_: IDiscuss, record: IDiscuss) => (
        <Space size='middle'>
          <Button
            icon={<MessageOutlined style={{ color: '#1890ff' }} />}
            onClick={() => handleViewMess(record._id)}
            className='btn-wrap'
          ></Button>
          <Button
            icon={<EditOutlined style={{ color: '#1890ff' }} />}
            // onClick={() => BlogCommentsEditHandler(record.blogId)}
            className='btn-wrap'
          ></Button>
          <Button icon={<EyeOutlined style={{ color: '#1890ff' }} />} onClick={() => handleViewDetail(record._id)} />
          <Button
            icon={<HistoryOutlined style={{ color: '#1890ff' }} />}
            onClick={() => handleViewHistory(record._id)}
          />
          {record.isDeleted ? (
            <Popconfirm
              title='Are you sure you want to activate this blog category?'
              placement='topRight'
              // onConfirm={() => handleUpdateStatus(record._id)}
              okText='Yes'
              cancelText='No'
            >
              <Button icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />} />
            </Popconfirm>
          ) : (
            <Popconfirm
              title='Are you sure you want to deactivate this blog category?'
              placement='topRight'
              // onConfirm={() => handleUpdateStatus(record._id)}
              okText='Yes'
              cancelText='No'
            >
              <Button icon={<StopOutlined style={{ color: '#ff4d4f' }} />} danger />
            </Popconfirm>
          )}
        </Space>
      )
    }
  ];

  return (
    <div className='categories-list'>
      <Table
        columns={columns}
        dataSource={discusss}
        pagination={{ current: currentPage, pageSize, onChange: handleTableChange }}
        scroll={{ x: 'max-content' }}
      />
      {/* <ViewDetailBlogComments
          isVisible={detailVisible}
          onClose={() => setDetailVisible(false)}
          blogCommentId={blogCommentId}
        />
        <ViewHistoryBlogComments
          isVisible={historyVisible}
          onClose={() => setHistoryVisible(false)}
          blogCommentId={blogCommentId}
        />
        <ViewMessReply isVisible={MessVisible} onClose={() => setMessVisible(false)} blogCommentId={blogCommentId} /> */}
    </div>
  );
};

export default ListDiscuss;
