import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { Button, Form, Row, Col } from 'antd';
import imagePreviewIcon from '../../../../assets/images/icons/anonymous_3.png';
import './PictureForm.scss';

const PictureForm: React.FC = () => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>(imagePreviewIcon);
  const [selectedFileName, setSelectedFileName] = useState<string>('No file selected');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.match('image.*')) {
      setSelectedFileName(file.name);
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setImagePreviewUrl(e.target.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Xử lý logic lưu hình ảnh tại đây
    console.log('File to save', imagePreviewUrl);
  };

  return (
    <Form onFinish={handleSubmit} className='picture-form' layout='vertical'>
      <div className='picture-form__image-preview-text'>Image preview</div>
      <div className='picture-form__image-size-info'>Minimum 200x200 pixels, Maximum 6000x6000 pixels</div>
      <Form.Item>
        <div className='picture-form__preview-container'>
          <div className='picture-form__preview-wrapper'>
            <img src={imagePreviewUrl} alt='Image preview' className='picture-form__image' />
          </div>
        </div>

        <div className='picture-form__upload-container' onClick={handleButtonClick}>
          <span className='picture-form__filename'>{selectedFileName}</span>
          <Button type='primary' className='picture-form__upload-btn'>
            Upload Image
          </Button>
          <input
            type='file'
            ref={fileInputRef}
            accept='image/*'
            onChange={handleImageChange}
            className='picture-form__input'
            style={{ display: 'none' }}
          />
        </div>
      </Form.Item>
      <Form.Item className='picture-form__submit'>
        <Button type='primary' htmlType='submit' block>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PictureForm;
