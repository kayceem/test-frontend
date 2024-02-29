/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, Drawer, Form, Input, InputNumber, notification } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { INote } from '../../../../../types/note.type';
import {
  useAddCourseNoteMutation,
  useGetCourseNoteQuery,
  useUpdateCourseNoteMutation
} from '../../courseNotes.service';

interface AddCourseNoteProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCourseNotes: React.FC<AddCourseNoteProps> = ({ isOpen, onClose }) => {
  const [addCourseNote] = useAddCourseNoteMutation();
  const [updateCourseNote] = useUpdateCourseNoteMutation();
  const noteId = useSelector((state: RootState) => state.noteCourse.courseNotesId);

  const { data: noteResponse, isFetching } = useGetCourseNoteQuery(noteId, {
    skip: !noteId
  });

  const [form] = Form.useForm();

  useEffect(() => {
    if (noteId && noteResponse && noteResponse.notes) {
      form.setFieldsValue(noteResponse.notes);
    }
  }, [noteId, noteResponse, form]);

  useEffect(() => {
    if (!isOpen || !noteId) {
      form.resetFields();
    }
  }, [isOpen, noteId, form]);

  const handleClose = () => {
    onClose();
  };

  const submitHandler = async (values: INote) => {
    try {
      const noteToSubmit = noteId ? { ...values, _id: noteId } : values;
      if (noteId) {
        await updateCourseNote(noteToSubmit).unwrap();
        notification.success({ message: 'Note updated successfully' });
      } else {
        await addCourseNote(noteToSubmit).unwrap();
        notification.success({ message: 'Note added successfully' });
      }
      form.resetFields();
      onClose();
    } catch (error) {
      notification.error({ message: 'Operation failed', description: 'An error occurred' });
    }
  };

  return (
    <Drawer
      title={noteId ? 'Edit Course Note' : 'Create a New Course Note'}
      width={720}
      onClose={handleClose}
      open={isOpen}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Form form={form} layout='vertical' onFinish={submitHandler}>
        <Form.Item name='content' label='Content' rules={[{ required: true, message: 'Please enter the Content' }]}>
          <Input placeholder='Enter the Content' />
        </Form.Item>
        <Form.Item
          name='lessonId'
          label='Lesson ID'
          rules={[{ required: true, message: 'Please enter the lesson ID' }]}
        >
          <Input placeholder='Enter the lesson ID' />
        </Form.Item>
        <Form.Item
          name='videoMinute'
          label='Video Minute'
          rules={[{ required: true, message: 'Please enter the video minute' }]}
        >
          <InputNumber min={0} placeholder='Enter the video minute' style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            {noteId ? 'Update Course Note' : 'Add Course Note'}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddCourseNotes;
