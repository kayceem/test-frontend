import { Outlet } from 'react-router-dom';
import React, { Fragment } from 'react';
import './RootLayout.scss';
import { Layout } from 'antd';
import CreateCourse from '../../pages/admin/Courses/components/CreateCourse';
import SideBar from './SideBar';
import AdminHeader from './Header';
import AdminDrawer from './Drawer';

const { Content, Footer } = Layout;

const RootAdminLayout: React.FC = () => {
  return (
    <Fragment>
      <Layout style={{ minHeight: '100vh' }} className='admin-layout'>
        {/* SideBar component here */}
        <SideBar />
        <Layout className='layout-wrap'>
          {/* Admin Header here */}
          <AdminHeader />
          {/* Change content here */}
          <Content style={{ margin: '0 16px' }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      <AdminDrawer />
    </Fragment>
  );
};

export default RootAdminLayout;
