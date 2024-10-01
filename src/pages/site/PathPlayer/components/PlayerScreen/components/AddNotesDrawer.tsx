/* eslint-disable @typescript-eslint/no-misused-promises */
// AddNoteDrawer.jsx
import { Button, Drawer, Input, notification } from 'antd';
import { useState } from 'react';

interface AddNoteDrawerProps {
  visible: boolean;
  onClose: () => void;
  noteContent: string;
  setNoteContent: (noteContent: string) => void;
  onSubmitNote: () => Promise<void>;
  isLoading: boolean;
  formattedTime: string;
  currLessonId: string;
}

const AddNoteDrawer: React.FC<AddNoteDrawerProps> = ({
  visible,
  onClose,
  noteContent,
  setNoteContent,
  onSubmitNote,
  formattedTime,
  isLoading,
  currLessonId
}) => {
  const [error, setError] = useState('');

  const validateNoteContent = () => {
    if (!noteContent.trim()) {
      setError('Notes are not allowed to empty');
      return false;
    }
    setError('');
    return true;
  };

  const handleSaveNote = async () => {
    const isValid = validateNoteContent();
    if (isValid) {
      try {
        await onSubmitNote();
        notification.success({
          message: 'Success',
          description: 'Note has been added'
        });
        onClose(); 
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Error while saving notes'
        });
      }
    }
  };
  return (
    <Drawer title='Add notes' placement='right' closable={true} onClose={onClose} visible={visible}>
      <p className='mb-6 text-2xl'>
        Add notes at: <span className='bg-red-600 p-2 text-white rounded-xl'>{formattedTime}</span>
      </p>
      <Input.TextArea
        rows={4}
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        placeholder='Note content...'
      />
      {error && <p className='text-red-500'>{error}</p>}
      <Button type='primary' onClick={handleSaveNote} disabled={isLoading} style={{ marginTop: 16 }}>
        {isLoading ? 'In progress...' : 'Save notes'}
      </Button>
    </Drawer>
  );
};

export default AddNoteDrawer;
