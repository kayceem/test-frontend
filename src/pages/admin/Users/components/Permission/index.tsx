import React, { Fragment, Key, useState } from 'react';
import './Permission.scss';
import { Button, Col, Row, Select, Skeleton, TreeDataNode } from 'antd';
import { Tree } from 'antd';
import { useGetPermissionsQuery, useGetUsersSelectQuery } from '../../user.service';
import { DownloadOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons';
const treeData: TreeDataNode[] = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  },
];
const Permission: React.FC = () => {
  
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['0-0-0', '0-0-1']);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(['0-0-0']);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [permissionQuery, setPermissionQuery] = useState({})
  const [selectUser, setSelectedUser] = useState<string>();
  // Fetch permission data list
  const { data: permissionResponse, isFetching: isPermissionFetching, refetch } = useGetPermissionsQuery(permissionQuery);
  const { data: usersSelectRes, isFetching: isUsersSelectFetching } = useGetUsersSelectQuery({});
  const listPermission = permissionResponse?.listPermission;
  const listUserSelect = usersSelectRes?.users;
  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue: React.Key[] ) => {
    
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };
  
  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

  // Selection box section
  const onChangeUserSelect = (value: string) => {
    setSelectedUser(value);
  };
  
  const onSearchUserSelect = (value: string) => {
    console.log('search:', value);
  };

  const searchPermissionData = () => {
    console.log("oke")
    console.log("selectUser", selectUser)
    setPermissionQuery({userId: selectUser})
    refetch().then((res) => {
      console.log("res")
    }).catch((err: any) => {
      console.log("error", err)
    })
  }

  return (
    
    <Fragment >

    <div>
    <Select
    showSearch
    placeholder="Select a user"
    optionFilterProp="children"
    onChange={onChangeUserSelect}
    onSearch={onSearchUserSelect}
    options={listUserSelect}
  />
    <Button type="primary" icon={<SearchOutlined />} onClick={searchPermissionData}>
        Search
      </Button>
      <Button type="primary" icon={<SaveOutlined />}>
            Save
      </Button>

    </div>

      {isPermissionFetching && <Skeleton/>}
  
       <Row className="mt-4" gutter={[16, 16]}>
       {listPermission?.map((permissionTreeData) => {
        return (
          <Col span={6}>
          <Tree
            checkable
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            onSelect={onSelect}
            selectedKeys={selectedKeys}
            treeData={permissionTreeData}
        />
        </Col>
        )
      })}
       </Row>
    </Fragment>
  );
};

export default Permission;
