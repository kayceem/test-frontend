import React, { useState, useEffect } from 'react';
import './SidingModal.scss';
import CommentList from '../CommentList/CommentList';
import CommentForm from '../CommentForm/CommentForm';

interface SlidingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SlidingModal: React.FC<SlidingModalProps> = ({ isOpen, onClose }) => {
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    setVisible(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300); // Assuming 300ms is your animation duration
  };

  const commentsData = [
    {
      id: '1',
      author: 'khadev27',
      content: 'Rất chi tiết cám ơn bạn nha'
    }
  ];

  return (
    <div className={`modal ${visible ? 'open' : 'closed'}`}>
      <div className='px-8 py-8 modal-content'>
        <button className='text-3xl opacity-60 mb-6' onClick={handleClose}>
          X
        </button>
        <div className='modal-header'>
          <div className='modal-title text-3xl'>Chưa có bình luận</div>
        </div>
        <form className='comment-input-form'>
          <button className='comment-btn' type='submit'>
            <i className='fa fa-paper-plane'></i>
          </button>
          <div className='comments-container'>
            <CommentForm />
            <CommentList comments={commentsData} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SlidingModal;
