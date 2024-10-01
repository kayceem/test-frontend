import { Layout, theme } from 'antd';
import { useLocation } from 'react-router-dom';
import './Header.scss';
import DashboardHeader from './components/DashboardHeader';
import WelcomeHeader from './components/WelcomeHeader';
import AdminCommonHeader from './components/AdminHeader';

const { Header } = Layout;
const AdminHeader = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const location = useLocation();
  const path = location.pathname;

  return (
    <Header className='admin-header' style={{ padding: 0, background: colorBgContainer }}>
      {path === '/author/dashboard' && <DashboardHeader />}
      {path === '/author/welcome' && <WelcomeHeader />}
      {path === '/author/author-report' && <AdminCommonHeader title={'Author Report'} />}
      {path === '/author/categories' && <AdminCommonHeader title={'Categories'} />}
      {path === '/author/courses' && <AdminCommonHeader title={'Courses'} />}
      {path === '/author/courses-notes' && <AdminCommonHeader title={'Courses Notes'} />}
      {path === '/author/discuss' && <AdminCommonHeader title={'Discuss'} />}
      {path === '/author/users' && <AdminCommonHeader title={'Users'} />}
      {path === '/author/users/permission' && <AdminCommonHeader title={'Users permission'} />}
      {path === '/author/orders' && <AdminCommonHeader title={'Orders'} />}
      {path === '/author/reports/users-progress' && <AdminCommonHeader title={'User Progress'} />}
      {path === '/author/reports/course-insights' && <AdminCommonHeader title={'Course Insights'} />}
      {path === '/author/reports/reviews-center' && <AdminCommonHeader title={'Reviews Center'} />}
      {path === '/author/blog' && <AdminCommonHeader title={'Blog'} />}
      {path === '/author/blog-category' && <AdminCommonHeader title={'Blog Category'} />}
      {path === '/author/blog-comments' && <AdminCommonHeader title={'Blog Comments'} />}
      {path === '/author/feedbacks/list' && <AdminCommonHeader title={'Feedbacks'} />}
      {path === '/author/reviews' && <AdminCommonHeader title={'Reviews'} />}
      {path === '/author/transaction' && <AdminCommonHeader title={'Transactions'} />}
      {path === '/author/change-password' && <AdminCommonHeader title={'Change Password'} />}
      {path === '/author/settings' && <AdminCommonHeader title={'Settings'} />}
      {path === '/author/subscribe' && <AdminCommonHeader title={'Subscribe'} />}
      {path === '/author/marketing/coupons' && <AdminCommonHeader title={'Coupons'} />}
    </Header>
  );
};

export default AdminHeader;
