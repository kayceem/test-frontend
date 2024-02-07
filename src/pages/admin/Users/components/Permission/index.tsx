/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { Fragment, Key, useEffect, useRef, useState } from 'react';
import './Permission.scss';
import { Button, Col, Row, Select, Skeleton, TreeDataNode, notification } from 'antd';
import { Tree } from 'antd';
import { useGetPermissionsQuery, useGetUsersSelectQuery, useUpdatePermissionMutation } from '../../user.service';
import { DownloadOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons';
import { TreeNode } from '../../../../../types/treeNode.type';
import { objectTreeHelper } from '../../../../../utils/objectTreeHelper';
interface ICheckedKeysMap {
  [treeIndex: number]: string[]
}
const Permission: React.FC = () => {

  // ... (other state and logic)
  
  const [permissionQuery, setPermissionQuery] = useState({})
  const [selectUser, setSelectedUser] = useState<string>();
  // Fetch permission data list
  const { data: permissionResponse, isFetching: isPermissionFetching, refetch } = useGetPermissionsQuery(permissionQuery);
  const { data: usersSelectRes, isFetching: isUsersSelectFetching } = useGetUsersSelectQuery({})
  const [updatePermission, updatePermissionResult] = useUpdatePermissionMutation();
  const listPermission = permissionResponse?.listPermission;
  const listUserSelect = usersSelectRes?.users;

  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const initialCheckedKeys: React.Key[][] = []
  const initialExpandedKeys: React.Key[][] = []
  listPermission?.forEach((treePermissionData, index) => {
     initialCheckedKeys[index] = objectTreeHelper.getInitialCheckedKeys(treePermissionData)
     
  })

  const [checkedKeysMap, setCheckedKeysMap] = useState<React.Key[][]>(initialCheckedKeys );
  
  useEffect(() => {
    setCheckedKeysMap(initialCheckedKeys)
  },[])

  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  // const onCheck = (checkedKeysValue: React.Key[], e: {checked: boolean, checkedNodes: any, node: {key: string}} ) => {
  //   console.log("checkedKeysValue", checkedKeysValue)
  //   console.log("e", e)

  //   console.log("checkedKeysObj", checkedKeysObj)
    
  //   if(e.checked) {
  //     console.log("checked true")

  //     setCheckedKeys((prev) => [...prev, ...checkedKeysValue]);
  //   }else {
  //     console.log("checked false")
  //     console.log("checkedKeysValue", checkedKeysValue)

  //     const restKeys = checkedKeys.filter((key) => !checkedKeysValue.includes(key));
  //     console.log("res", restKeys)

  //     setCheckedKeys(restKeys);
      
  //   }
  // };
  const onCheck = (checkedKeys: React.Key[], info: any, index: number) => {


    console.log("checkedKeys", checkedKeys);
    // setCheckedKeys((prev) => [...prev, ...checkedKeys]);
    const newCheckedKeysMap = [...checkedKeysMap];
    newCheckedKeysMap[index] = checkedKeys;
    setCheckedKeysMap(newCheckedKeysMap);
  };

  // Selection box section
  const onChangeUserSelect = (value: string) => {
    setSelectedUser(value);
  };
  
  const onSearchUserSelect = (value: string) => {
    console.log('search:', value);
  };

  const searchPermissionData = () => {
    setPermissionQuery({userId: selectUser})
    refetch().then((res: any) => {
      console.log("res", res)
    }).catch((err: any) => {
      console.log("error", err)
    })
  }

  const saveData = () => {

    const result = listPermission?.map((permissionTreeData, index) => {
      const treeData = permissionTreeData.map((node) => objectTreeHelper.createNodeData(node, checkedKeysMap[index]));
      return treeData;
    });

    if(selectUser) {
      updatePermission({
        userId: selectUser,
        listPermission: result
      })
      .unwrap()
      .then((res: any) => {
        console.log("res")
      }).catch((err: any) => {
        console.log("error", err)
      })
    }else {
      notification.warning({
        message: "Please select user first!",
      });
    }


    console.log(result);
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
      <Button type="primary" icon={<SaveOutlined />} onClick={saveData}>
            Save
      </Button>

    </div>

      {isPermissionFetching && <Skeleton/>}
  
       <Row className="mt-4" gutter={[16, 16]}>
       {listPermission?.map((permissionTreeData, index) => {
        const currentKey = permissionTreeData[0].key;

        return (
          <Col key={currentKey} span={6}>
          <Tree
            checkable
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onCheck={(checkedKeys, info) => onCheck(checkedKeys, info, index)}
            checkedKeys={checkedKeysMap[index]}
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
