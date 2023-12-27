import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import type { RadioChangeEvent, UploadProps } from 'antd';
import { Button, Col, Drawer, Form, Input, Radio, Row, Space, notification, Upload, message } from 'antd';
import React, { useRef, useState } from 'react';
import { BACKEND_URL } from '../../../../../../../constant/backend-domain';
import { UploadFile } from 'antd/lib/upload/interface';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/store';
import { ILesson } from '../../../../../../../types/lesson.type';
import { formatTime } from '../../../../../../../utils/functions';
import { useAddLessonMutation } from '../../../../course.service';

type AddLessonProps = {
  // onSubmit: (formData: Omit<ILesson, '_id'>) => void;
  // videoLength?: number;
  // onCloseActivies: () => void;
};

interface UploadVideoResponse {
  message: string;
  videoPath: string;
}


const AddLesson: React.FC<AddLessonProps> = () => {
  const [open, setOpen] = useState(false);
  const playerRef = useRef<ReactPlayer | null>(null);
  const [contentLink, setContentLink] = useState('');
  const [form] = Form.useForm();
  // const [formData, setFormData] = useState<Omit<ISection, '_id'>>(initialSection);
  const [addLesson, addLessonResult] = useAddLessonMutation();

  const [uploadMethod, setUploadMethod] = useState('link');
  const [uploadedVideoPath, setUploadedVideoPath] = useState('');
  const [videoDuration, setVideoDuration] = useState(0);
  const [fileList, setFileList] = useState<UploadFile<UploadVideoResponse>[]>([]);


  const uploadVideoProps: UploadProps = {
    name: 'videoFile',
    action: `${BACKEND_URL}/upload-video`,
    fileList: fileList,
    onChange(info) {
      setFileList(info.fileList);
      if (info.file.status === 'done') {
        void message.success(`${info.file.name} file uploaded successfully`);

        const response = info.file.response as { videoPath: string };
        if (response && response.videoPath) {
          setUploadedVideoPath(response.videoPath);
        }


      } else if (info.file.status === 'error') {
        void message.error(`${info.file.name} file upload failed.`);
      }
    },

  };



  const sectionId = useSelector((state: RootState) => state.course.sectionId);

  const showDrawer = () => {
    // props.onCloseActivies();

    // Close section add activities --> Add later
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [value, setValue] = useState('FREE');

  const onChange = (e: RadioChangeEvent) => {
    setValue((e.target as HTMLInputElement).value);
  };

  const onChangeVideoLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContentLink(e.target.value);
  };

  const onPasteVideoLink = (e: React.ClipboardEvent<HTMLInputElement>) => {
    console.log(e.clipboardData.getData('text'));
    setContentLink(e.clipboardData.getData('text'));
  };

  const onFinish = (formData: Omit<ILesson, '_id'>) => {
    console.log(formData);
    console.log(playerRef.current?.getDuration());
    console.log(formatTime(playerRef.current?.getDuration() || 0));

    const lessonData: Omit<ILesson, '_id'> = {
      name: formData.name,
      content: uploadMethod === 'link' ? formData.content : uploadedVideoPath,
      access: formData.access,
      sectionId: sectionId,
      type: 'video',
      description: formData.description,
      videoLength: uploadMethod === 'link' ? (playerRef.current?.getDuration() || 0) : videoDuration
    };

    addLesson(lessonData)
      .unwrap()
      .then((result) => {
        console.log(result);

        notification.success({
          message: 'Add lesson successfully',
          duration: 2
        });

        setOpen(false);
        form.resetFields();
        setFileList([]);
        setUploadedVideoPath('');
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(addLessonResult);
  };

  const onuploadMethodChange = (e: RadioChangeEvent) => {
    setUploadMethod(e.target.value as string);
  };



  return (
    <>
      <Button type='primary' onClick={showDrawer} icon={<PlusOutlined />}>
        Add New Lesson
      </Button>
      <Drawer
        title='Lesson Edit'
        width={812}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        <Row>
          <Col md={8}></Col>
          <Col md={16}>
            {/* Form maybe cange layter */}
            <Form form={form} layout='vertical' hideRequiredMark onFinish={onFinish}>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Please enter user name' }]}>
                    <Input placeholder='Please enter the section name here' />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Upload Method">
                    <Radio.Group onChange={onuploadMethodChange} value={uploadMethod}>
                      <Radio value="link">Link</Radio>
                      <Radio value="upload">Upload Video</Radio>
                    </Radio.Group>
                  </Form.Item>
                  {uploadMethod === 'link' && (
                    <Form.Item
                      name='content'
                      label='Link Youtube'
                      rules={[{ required: true, message: 'Please enter link youtube' }]}
                    >
                      <Input
                        onPaste={onPasteVideoLink}
                        onChange={onChangeVideoLink}
                        placeholder='Please enter link youtube'
                      />
                    </Form.Item>
                  )}

                  {uploadMethod === 'upload' && (
                    <Form.Item
                      label='Upload Video'
                      rules={[{ required: true, message: 'Please upload a video' }]}
                    >
                      <Upload {...uploadVideoProps}>
                        <Button icon={<UploadOutlined style={{ color: 'black' }} />}>Click to Upload</Button>
                      </Upload>
                    </Form.Item>
                  )}

                  <ReactPlayer
                    ref={playerRef}
                    url={uploadMethod === 'link' ? contentLink : uploadedVideoPath}
                    width={0}
                    height={0}
                    onDuration={setVideoDuration}
                    config={{
                      youtube: {
                        playerVars: {
                          controls: 0,
                          modestbranding: 1,
                          showinfo: 0,
                          fs: 0
                        }
                      }
                    }}
                  />
                </Col>
                <Col span={24}>
                  <Form.Item name='access' label='Access' rules={[{ required: true, message: 'Please enter url' }]}>
                    <Radio.Group onChange={onChange} value={value}>
                      <Space direction='vertical'>
                        <Radio value='DRAFT'>DRAFT</Radio>
                        <Radio value='SOON'>SOON</Radio>
                        <Radio value='FREE'>FREE</Radio>
                        <Radio value='PAID'>PAID</Radio>
                        {/* <Radio value={4}>
                          More...
                          {value === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
                        </Radio> */}
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                {/* <Col span={12}>
                  <Form.Item
                    name='approver'
                    label='Approver'
                    rules={[{ required: true, message: 'Please choose the approver' }]}
                  >
                    <Select placeholder='Please choose the approver'>
                      <Option value='jack'>Jack Ma</Option>
                      <Option value='tom'>Tom Liu</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name='dateTime'
                    label='DateTime'
                    rules={[{ required: true, message: 'Please choose the dateTime' }]}
                  >
                    <DatePicker.RangePicker
                      style={{ width: '100%' }}
                      getPopupContainer={(trigger) => trigger.parentElement!}
                    />
                  </Form.Item>
                </Col> */}
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name='description'
                    label='Description'
                    rules={[
                      {
                        required: true,
                        message: 'please enter url description'
                      }
                    ]}
                  >
                    <Input.TextArea rows={4} placeholder='please enter url description' />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Drawer>
    </>
  );
};

export default AddLesson;
