import React, { useState } from 'react';
import { Drawer, Form, Button, Input, Select, message,Upload } from 'antd';
import { useAddCourseMutation } from '../../course.service';
import { useGetAllCategoriesQuery, useGetCategoriesQuery } from '../../../Categories/category.service';
import { ICourse } from '../../../../../types/course.type';
import { UploadChangeParam, UploadProps } from 'antd/lib/upload/interface';
import { UploadOutlined } from '@ant-design/icons';
import { UPLOAD_URL } from '../../../../../constant/constant';

const { Option } = Select;

interface CreateCourseDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCourseDrawer: React.FC<CreateCourseDrawerProps> = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [postCourse] = useAddCourseMutation();
  const [fileList, setFileList] = useState<any[]>([]);
  const [videoFileList, setVideoFileList] = useState<any[]>([]);
  const [imagePath, setImagePath] = useState<string>("")
  const [formData, setFormData] = useState<ICourse>();
  const [uploadedVideoPath, setUploadedVideoPath] = useState('');
  const [accessType, setAccessType] = useState<string | undefined>(undefined);


  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoriesQuery();

  const handleSubmit = (values: ICourse) => {
    postCourse(values)
      .unwrap()
      .then(() => {
        void message.success('Course created successfully');
        onClose();
        form.resetFields();
      })
      .catch(() => {
        void message.error('Failed to create course');
      });
  };
  const handleAccessChange = (value: string) => {
    setAccessType(value);
    if (value === 'FREE') {
      form.setFieldsValue({ price: 0, finalPrice: 0 });
    }
  };
  const uploadImageProps: UploadProps = {
    name: 'imageFile',
    action: `${UPLOAD_URL}/uploads/image`,
    fileList: fileList,
    maxCount: 1,
    onChange(info) {
      setFileList(info.fileList);
      if (info.file.status === 'done') {
        void message.success(`${info.file.name} file uploaded successfully`);

        const response = info.file.response as { imagePath: string };
        if (response && response.imagePath) {
          const imagePath = response.imagePath
          setImagePath(imagePath);
          form.setFieldsValue({ thumbnail: imagePath });
        }
      } else if (info.file.status === 'error') {
        void message.error(`${info.file.name} file upload failed.`);
      }
    }
  }
  const uploadVideoProps: UploadProps = {
    name: 'videoFile',
    action: `${UPLOAD_URL}/uploads/video`,
    fileList: videoFileList,
    maxCount: 1,
    onChange(info) {
      setVideoFileList(info.fileList);
      if (info.file.status === 'done') {
        void message.success(`${info.file.name} file uploaded successfully`);
        
        const response = info.file.response as { videoPath: string };
        if (response && response.videoPath) {
          setUploadedVideoPath(response.videoPath);
          form.setFieldsValue({ coursePreview: uploadedVideoPath });
        }
      } else if (info.file.status === 'error') {
        void message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  return (
    <Drawer
      title='Create New Course'
      width={720}
      onClose={onClose}
      open={isOpen}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={() => form.submit()} type='primary'>
            Submit
          </Button>
        </div>
      }
    >
      <Form form={form} layout='vertical' onFinish={handleSubmit}>
        <Form.Item
          name='name'
          label='Course Name'
          rules={[
            { required: true, message: 'Please enter the couser name!' },
            { min: 30, message: 'Course name must be at least 30 characters!' }
          ]}
        >
          <Input placeholder='Enter couser name' />
        </Form.Item>
        <Form.Item
          name='categoryId'
          label='Category'
          rules={[{ required: true, message: 'Please select a category!' }]}
        >
          <Select placeholder='Select a category' loading={isCategoriesLoading}>
            {categoriesData?.categories.map((category) => (
              <Option key={category._id} value={category._id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name='description'
          label='Description'
          rules={[
            { required: true, message: 'Please enter the description!' },
            { min: 150, message: 'Description must be at least 150 characters!' }
          ]}
        >
          <Input.TextArea placeholder='Enter description' />
        </Form.Item>
        <Form.Item
          name='thumbnail'
          label='Thumbnail'
          rules={[{ required: true, message: 'Please enter the thumbnail URL!' }]}
        >
        <Upload {...uploadImageProps} >
              <Button icon={<UploadOutlined style={{ color: '#000' }} />}>Select Image</Button>
        </Upload>
        </Form.Item>
        <Form.Item
          name='coursePreview'
          label='Course Preview'
          rules={[{ required: true, message: 'Please enter the course preview URL!' }]}
        >
          <Upload {...uploadVideoProps}>
                  <Button icon={<UploadOutlined style={{ color: 'black' }} />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item name='access' label='Access' rules={[{ required: true, message: 'Please select the access type!' }]}>
          <Select placeholder='Select access type' onChange={handleAccessChange}>
            <Option value='PAID'>PAID</Option>
            <Option value='DRAFT'>DRAFT</Option>
            <Option value='COMMING_SOON'>COMMING SOON</Option>
            <Option value='ENROLLMENT_CLOSED'>ENROLLMENT CLOSED</Option>
            <Option value='FREE'>FREE</Option>
            <Option value='PRIVATE'>PRIVATE</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name='price'
          label='Price'
          rules={[
            { required: true, message: 'Please enter the price!' },
            {
              validator: (_, value) => {
                if (value < 0) {
                  return Promise.reject('Price cannot be negative');
                }
                return Promise.resolve();
              }
            }
          ]}
        >
          <Input type='number' placeholder='Enter price' disabled={accessType === 'FREE'} />
        </Form.Item>
        <Form.Item
          name='finalPrice'
          label='Final Price'
          rules={[
            { required: true, message: 'Please enter the final price!' },
            {
              validator: (_, value) => {
                if (value < 0) {
                  return Promise.reject('Final price cannot be negative');
                }
                return Promise.resolve();
              }
            }
          ]}
        >
          <Input type='number' placeholder='Enter final price' disabled={accessType === 'FREE'}/>
        </Form.Item>
        <Form.Item
          name='subTitle'
          label='Sub Title'
          rules={[{ required: true, message: 'Please enter the sub title!' }]}
        >
          <Input placeholder='Enter sub title' />
        </Form.Item>
        <Form.Item
          name='courseSlug'
          label='Course Slug'
          rules={[{ required: true, message: 'Please enter the course slug!' }]}
        >
          <Input placeholder='Enter course slug' />
        </Form.Item>
        
        <Form.Item name='level' label='Level' rules={[{ required: true, message: 'Please select the level!' }]}>
          <Select placeholder='Select level'>
            <Option value='ALL'>ALL</Option>
            <Option value='BEGINNER'>BEGINNER</Option>
            <Option value='INTERMEDIATE'>INTERMEDIATE</Option>
            <Option value='ADVANCED'>ADVANCED</Option>
          </Select>
        </Form.Item>
        <Form.List name='willLearns'>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item key={field.key} label={index === 0 ? 'Will Learns' : ''} required={false}>
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: 'Please input will learn or delete this field.'
                      }
                    ]}
                    noStyle
                  >
                    <Input placeholder='Enter will learn' style={{ width: '60%' }} />
                  </Form.Item>
                  {fields.length > 0 ? (
                    <Button type='dashed' onClick={() => remove(field.name)} style={{ width: '20%' }}>
                      Remove
                    </Button>
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button type='dashed' onClick={() => add()} style={{ width: '60%' }}>
                  Add will learns
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.List name='requirements'>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item key={field.key} label={index === 0 ? 'Requirements' : ''} required={false}>
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: 'Please input requirements or delete this field.'
                      }
                    ]}
                    noStyle
                  >
                    <Input placeholder='Enter requirements' style={{ width: '60%' }} />
                  </Form.Item>
                  {fields.length > 0 ? (
                    <Button type='dashed' onClick={() => remove(field.name)} style={{ width: '20%' }}>
                      Remove
                    </Button>
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button type='dashed' onClick={() => add()} style={{ width: '60%' }}>
                  Add requirements
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.List name='tags'>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item key={field.key} label={index === 0 ? 'Tags' : ''} required={false}>
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: 'Please input tags or delete this field.'
                      }
                    ]}
                    noStyle
                  >
                    <Input placeholder='Enter tags' style={{ width: '60%' }} />
                  </Form.Item>
                  {fields.length > 0 ? (
                    <Button type='dashed' onClick={() => remove(field.name)} style={{ width: '20%' }}>
                      Remove
                    </Button>
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button type='dashed' onClick={() => add()} style={{ width: '60%' }}>
                  Add tags
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Drawer>
  );
};

export default CreateCourseDrawer;
