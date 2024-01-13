import { Button } from 'antd';
import { FC, FormEvent, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import ListNode from './components/ListNode';
import ReactPlayer from 'react-player';

interface NotesProps {
  className?: string;
}

type Note = {
  time: number;
  note: string;
};

const Notes: FC<NotesProps> = ({ className }) => {
  const [comment, setComment] = useState<string>('');
  const [notes, setNotes] = useState<Note[]>([]);
  const playerRef = useRef<ReactPlayer>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Handle the comment submission here
  };

  const handleCancel = () => {
    setComment(''); // Clear the comment
  };

  const handleCommentChange = (value: string) => {
    setComment(value);
  };

  const handleNote = () => {
    if (playerRef.current) {
      const currentTimeInMinutes = Math.floor(playerRef.current.getCurrentTime() / 60);
      setNotes((prevNotes) => [...prevNotes, { time: currentTimeInMinutes, note: 'Your note here' }]);
    }
  };

  return (
    <div className={className}>
      <ListNode />
      <form className='comment-form mt-6' onSubmit={handleSubmit}>
        <div className='flex mb-36 mr-8'>
          <ReactQuill
            className='comment-input'
            placeholder='Thêm bình luận...'
            value={comment}
            onChange={handleCommentChange}
          />
        </div>
        <div className='div flex justify-end mr-8'>
          <Button className='comment-btn mr-4' type='dashed' htmlType='submit'>
            Ghi chú
          </Button>
          {notes.map((note, index) => (
            <div key={index}>
              <p>Thời gian: {note.time} phút</p>
              <p>Ghi chú: {note.note}</p>
            </div>
          ))}
          <Button className='comment-btn' type='primary' onClick={handleCancel}>
            Hủy
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Notes;
