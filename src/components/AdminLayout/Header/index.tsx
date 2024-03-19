import { Layout, theme } from 'antd';
import { useLocation } from 'react-router-dom';
import './Header.scss';
import CancelledSales from './components/CancelledSales';
import CategoriesHeader from './components/Categories';
import Certifications from './components/Certifications';
import CourseInsights from './components/CourseInsights';
import CoursesHeader from './components/CoursesHeader';
import DashboardHeader from './components/DashboardHeader';
import InstructorsRevenues from './components/InstructorsRevenues';
import OrdersHeader from './components/Orders';
import ReviewsCenter from './components/ReviewsCenter';
import UsersHeader from './components/UsersHeader';
import UsersProgressHeader from './components/UsersProgress';
import BlogHeader from './components/BlogHeader';

import BlogCategoryHeader from './components/BlogCategory';
import FeedbacksHeader from './components/Feedbacks/Feedbacks';
import ReviewsHeader from './components/Reviews/Reviews';
import TransactionsHeader from './components/Transactions/Transactions';
import CoursesNotes from './components/CourseNotes';
import WelcomeHeader from './components/WelcomeHeader';
import BlogCommentsHeader from './components/BlogCommentsHeader';
import DiscussHeader from './components/DiscussHeader';
import UsersPermissionHeader from './components/UsersPermission';
import SettingHeader from './components/SettingHeader';

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
      {path === '/author/categories' && <CategoriesHeader />}
      {path === '/author/courses' && <CoursesHeader />}
      {path === '/author/courses-notes' && <CoursesNotes />}
      {path === '/author/discuss' && <DiscussHeader />}
      {path === '/author/users' && <UsersHeader />}
      {path === '/author/users/permission' && <UsersPermissionHeader />}
      {path === '/author/orders' && <OrdersHeader />}
      {path === '/author/reports/users-progress' && <UsersProgressHeader />}
      {path === '/author/reports/course-insights' && <CourseInsights />}
      {path === '/author/reports/reviews-center' && <ReviewsCenter />}
      {path === '/author/reports/certifications' && <Certifications />}
      {path === '/author/reports/courses-revenue' && <Certifications />}
      {path === '/author/reports/instructors-revenue' && <InstructorsRevenues />}
      {path === '/author/reports/cancelled-sales' && <CancelledSales />}
      {path === '/author/blog' && <BlogHeader />}
      {path === '/author/blog-category' && <BlogCategoryHeader />}
      {path === '/author/blog-comments' && <BlogCommentsHeader />}
      {path === '/author/feedbacks/list' && <FeedbacksHeader />}
      {path === '/author/reviews' && <ReviewsHeader />}
      {path === '/author/transaction' && <TransactionsHeader />}
      {path === '/author/change-password' && <WelcomeHeader />}
      {path === '/author/settings' && <SettingHeader />}
    </Header>
  );
};

export default AdminHeader;
