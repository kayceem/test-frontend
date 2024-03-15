import { Button } from 'antd';
import { useState } from 'react';
import DiscussList from './components/DiscussList';

type Props = {
  className: string;
};

const Discusses = (props: Props) => {
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
    <div className={props.className + ' discusses'}>
      {' '}
      <h1 className='text-2xl mb-3'>Go here to open the discussion :</h1>
      <Button type='default' onClick={showModal}>
        Open
      </Button>
      <DiscussList isVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} />
    </div>
  );
};

export default Discusses;
