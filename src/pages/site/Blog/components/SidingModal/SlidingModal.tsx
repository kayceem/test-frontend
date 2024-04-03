import React, { useEffect, useState } from 'react';
import { Button, Drawer } from 'antd';
import CommentForm from '../CommentForm/CommentForm';
import CommentList from '../CommentList/CommentList';
import { IBlogComment } from '../../../../../types/blogComments.type';
import { useGetBlogCommentsQuery } from '../../../client.service';
import { CloseOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { RootState } from '../../../../../store/store';
import { useSelector } from 'react-redux';

interface SlidingModalProps {
  isOpen: boolean;
  onClose: () => void;
  blogId: string;
}

const SlidingModal: React.FC<SlidingModalProps> = ({ blogId }) => {
  const [commentsData, setCommentsData] = useState<IBlogComment[]>([]);
  const { data, error, isLoading } = useGetBlogCommentsQuery(blogId);
  const [commentLength, setCommentLength] = useState(0);
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  useEffect(() => {
    if (data && data) {
      setCommentsData(data.comments);
      setCommentLength(data.comments.length);
    }
  }, [data]);

  useEffect(() => {
    if (commentsData.length > 0) {
      setCommentLength(commentsData.length);
    }
  }, [commentsData]);

  return (
    <div title={commentsData.length > 0 ? 'Bình luận' : 'Chưa có bình luận'}>
      <div className='comment-input-form' style={{ marginBottom: 16 }}>
        <div className='text-3xl mb-8'>{commentLength} commetns</div>
        {isAuth ? (
          <>
            <CommentForm blogId={blogId} commentLength={commentLength} comments={commentsData} />
            <CommentList comments={commentsData} blogId={blogId} />
          </>
        ) : (
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <p className='text-2xl'>Please login in to comment.</p>
          </div>
        )}
        <CommentList comments={commentsData} blogId={blogId} />
      </div>
    </div>
  );
};

export default SlidingModal;
