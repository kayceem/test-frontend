import { Avatar, Button, Popconfirm, Popover, Skeleton, Space, Table, Tag, Tooltip, message, notification } from 'antd';
import type { ColumnsType, TablePaginationConfig, TableProps } from 'antd/es/table';
import type { FilterValue } from 'antd/es/table/interface';
import React, { Fragment, useEffect, useState } from 'react';
import './UsersList.scss';
import { EditOutlined, EllipsisOutlined, CheckOutlined  } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useUpdateActiveStatusUserMutation, useGetUsersQuery, useApproveUserMutation } from '../../user.service';
import { startEditUser } from '../../user.slice';
import UserDetail from './components/UserDetail';
import moment from 'moment';
import { Helper } from '../../../../../utils/helper';
interface DataUserType {
  key: React.Key;
  name: JSX.Element;
  avatar?: string;
  email?: string;
  courses: JSX.Element;
  tags: JSX.Element;
  createdAt: string | undefined; // Convert to date: Example: 18 jun 2023
  lastLogin: string;
  actions?: any;
  statusName: string;
  statusColor: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const columns: ColumnsType<DataUserType> = [
  {
    title: 'User',
    dataIndex: 'name',
    width: '30%'
  },
  {
    title: 'Last login',
    dataIndex: 'lastLogin'
  },
  {
    title: 'Registerd',
    dataIndex: 'createdAt',
    filters: [
      {
        text: 'London',
        value: 'London'
      },
      {
        text: 'New York',
        value: 'New York'
      }
    ],
    filterSearch: true
  },
  {
    title: 'Role',
    dataIndex: 'role'
  },
  {
    title: 'Courses',
    dataIndex: 'courses'
  },
  {
    title: 'Status',
    dataIndex: 'status'
  },
  {
    title: 'Manage',
    dataIndex: 'manage'
  }
];

const SettingContent = (props: { userId: string; isDeleted: boolean }) => {
  const [updateActiveStatusUser, updateActiveStatusUserResult] = useUpdateActiveStatusUserMutation();

  const updateActiveStatusUserHandler = () => {
    updateActiveStatusUser({ userId: props.userId })
      .unwrap()
      .then(() => {
        const successMessage = props.isDeleted ? 'User activated successfully' : 'User deactivated successfully';
        void message.success(successMessage);
      })
      .catch(() => {
        const errorMessage = props.isDeleted ? 'Failed to activate user' : 'Failed to deactivate user';
        void message.error(errorMessage);
      });
  };

  const actionText = props.isDeleted ? 'Activate' : 'Deactivate';

  return (
    <div>
      <p>Content</p>
      <a onClick={updateActiveStatusUserHandler}>{`${actionText}`}</a>
    </div>
  );
};

interface UserListProps {
  onEditUser: () => void;
  searchValue: string;
}

const UsersList: React.FC<UserListProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [usersParams, setUsersParams] = useState({
    _q: props.searchValue
  });
  const helper = new Helper();
  const enumData = helper.getEnumData
  useEffect(() => {
    setUsersParams({
      _q: props.searchValue
    });
  }, [props.searchValue]);

  const { data, isFetching } = useGetUsersQuery(usersParams);
  const [approveUser, _] = useApproveUserMutation();
  const dispatch = useDispatch();
  const showUserDetail = () => {
    setOpen(true);
  };

  const editUserHandler = (userId: string) => {
    dispatch(startEditUser(userId));
    props.onEditUser();
  };

  const onApproveUser = (userId: string) => {
    // dispatch(startEditUser(userId));
    // props.onEditUser();
    setIsLoading(true);
    approveUser({userId}).unwrap().then(() => {
      notification.success({
        message: 'Approve user successfully',
      });
      setIsLoading(false);
    }).catch(() => {
      notification.error({
        message: 'Failed to approve user',
      });
      setIsLoading(false);
    })

  };

  const onChange: TableProps<DataUserType>['onChange'] = (pagination, filters, sorter, extra) => {
    setTableParams({ pagination: pagination });
  };

  const usersData: DataUserType[] =
    data?.users.map((user) => {
      const userTemplateItem = {
        key: user._id,
        name: (
          <>
            <a href='#' onClick={showUserDetail}>
              <div className='user-info'>
                <img alt={user?.name} src={user?.avatar} className='user-info__avatar' />

                <div className='user-info__content'>
                  <div className='user-info__name txt-tt'>{user?.name}</div>
                  <div className='user-info__email txt-desc'>{user?.email}</div>
                </div>
              </div>
            </a>
          </>
        ),
        lastLogin: <div className='txt-desc'>{moment(user?.lastLogin).format('YYYY-MM-DD HH:mm:ss') || ''}</div>,
        createdAt: <div className='txt-desc'>{moment(user?.createdAt).format('YYYY-MM-DD HH:mm:ss')}</div>,
        role:<div>{user.role}</div>,
        courses: (
          <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
            {(user.courses || []).map((course) => (
              <Avatar key={course?._id} src={course?.thumbnail} />
            ))}
            <Tooltip title='Ant User' placement='top'>
              {(user.courses || []).map((course) => (
                <Avatar key={course?._id} src={course?.thumbnail} />
              ))}
            </Tooltip>
          </Avatar.Group>
        ),
        status: (
          <>
            <Tag color={user.statusColor}>{user.statusName}</Tag>
          </>
        ),
        manage: (
          <Space>
            <Button onClick={() => editUserHandler(user._id)} className='btn-wrap'>
              <EditOutlined />
            </Button>

            {user.status == 'NEW' && ( // Check if user.status is not 'new'
              <Popconfirm
                title="Approve User"
                description="Are you sure to approve this user to become an author?"
                onConfirm={() => onApproveUser(user._id)}
                okText="Yes"
                cancelText="No"
              >
                <Button className='btn-wrap'>
                  <CheckOutlined />
                </Button>
              </Popconfirm>
            )}

            <Popover
              placement='bottomRight'
              content={<SettingContent userId={user._id} isDeleted={user?.isDeleted || false} />}
              title='Actions'
            >
              <Button className='btn-wrap'>
                <EllipsisOutlined />
              </Button>
            </Popover>
          </Space>
        )
      };

      return userTemplateItem;
    }) || [];

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 12
    }
  });

  return (
    <Fragment>
      {isFetching && <Skeleton />}
      {!isFetching && (
        <div className='users-list'>
          <Table loading={isLoading} columns={columns} dataSource={usersData} onChange={onChange} pagination={tableParams.pagination} scroll={{x: 1200, y: 400 }} />
          <UserDetail isOpen={open} onClose={() => setOpen(false)} />
        </div>
      )}
    </Fragment>
  );
};

export default UsersList;
