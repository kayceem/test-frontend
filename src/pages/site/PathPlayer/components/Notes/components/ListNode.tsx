import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const ListNode = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button type='default' onClick={showModal}>
        Danh sách ghi chú
      </Button>
      <Modal title='Danh sách ghi chú' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Render ra listNode</p>
      </Modal>
    </div>
  );
};

export default ListNode;
