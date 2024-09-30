import { BellOutlined, HeartOutlined, MenuOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Badge, Drawer, Dropdown, Input, Modal, Space, notification } from 'antd';
import { useEffect, useState, useMemo, RefObject } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useLogoutMutation } from '../../../pages/auth.service';
import { closeAuthModal, openAuthModal, resetAuthState, setUnauthenticated } from '../../../pages/auth.slice';
import Login from '../../../pages/site/Auth/Login';
import Signup from '../../../pages/site/Auth/Signup';
import { useGetUserQuery } from '../../../pages/site/client.service';
import { setSearchQuery } from '../../../pages/site/client.slice';
import { RootState } from '../../../store/store';
import { IUser } from '../../../types/user.type';
import Button from '../../Button';
import CategoriesNav from './components/CategoriesNav';
import Forgot from '../../../pages/site/Auth/Forgot';
import ChangePassword from '../../../pages/site/Auth/ChangePassword';
import DropDownMenu from './components/Dropdown/Dropdown';
import { io } from 'socket.io-client';
import { BACKEND_URL } from '../../../constant/backend-domain';
import React, { useRef } from 'react';
const { Search } = Input;
import './Header.scss';

const Header = () => {
  // State here
  const [showCategoriesNav, setShowCategoriesNav] = useState(true);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const isOpenAuthModal = useSelector((state: RootState) => state.auth.isOpenAuthModal);
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const [authState, setAuthState] = useState('login');
  const cart = useSelector((state: RootState) => state.client.cart);
  const authStateGlobal = useSelector((state: RootState) => state.auth.authState);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [userData, setUserData] = useState<IUser>();
  const { data } = useGetUserQuery(userId, {
    skip: !userId
  });
  const [logout, logoutResult] = useLogoutMutation();

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPath = location.pathname;

  // useMemo(() => {
  //   const socket = io(`${BACKEND_URL}`);
  //   socket.on('login', (data: any) => {
  //     console.log(data);
  //   });
  // }, []);

  useEffect(() => {
    if (data) {
      setUserData(data.user);
    }
  }, [data]);

  useEffect(() => {
    console.log('authStateGlobal', authStateGlobal);
  }, [authStateGlobal]);

  const menuRef = useRef<HTMLDivElement>(null);
  const menubtnRef = useRef<HTMLSpanElement>(null);
  const closebtnRef = useRef<HTMLSpanElement>(null);

  const openMenu = () => {
    if (menuRef.current && menubtnRef.current && closebtnRef.current) {
      menuRef.current.style.display = 'block';
      menubtnRef.current.style.display = 'none';
      closebtnRef.current.style.display = 'block';
      // overlayRef.current.style.display = 'none';
    }
  };

  const closeMenu = () => {
    if (menubtnRef.current && closebtnRef.current && menuRef.current) {
      menubtnRef.current.style.display = 'block';
      closebtnRef.current.style.display = 'none';
      menuRef.current.style.display = 'none';
      // overlayRef.current.style.display = 'block';
    }
  };
  const userAuthItems: MenuProps['items'] = [
    {
      label: (
        <Link to='/profile'>
          <div>{userData?.name}</div>
          <div>{userData?.email}</div>
        </Link>
      ),
      key: 'profile',
      icon: <Avatar src={userData?.avatar as string} />
    },
    {
      label: <Link to='/start'>My Courses</Link>,
      key: 'mylearning',
      icon: <UserOutlined />
    },
    {
      label: (
        <Link to='/account-settings'>
          <div>Account settings</div>
        </Link>
      ),
      key: 'account-settings',
      icon: <UserOutlined />
    },
    {
      label: (
        <Link to='/purchase-history'>
          <div>Purchase history</div>
        </Link>
      ),
      key: 'purchase-history',
      icon: <UserOutlined />
    },
    {
      label: (
        <Link to='/change-password'>
          <div>Change Password</div>
        </Link>
      ),
      key: 'change-password',
      icon: <UserOutlined />
    },
    {
      label: 'Logout',
      key: 'logout',
      icon: <UserOutlined />,
      danger: true
      // disabled: true
    }
  ];

  const notificationItems: MenuProps['items'] = [];

  const dispatch = useDispatch();

  const handleOk = () => {
    dispatch(resetAuthState());
    dispatch(closeAuthModal());
  };

  const handleCancel = () => {
    dispatch(resetAuthState());
    dispatch(closeAuthModal());
  };

  const signInHandler = () => {
    setAuthState('login');
    dispatch(openAuthModal());
  };

  const signUpHandler = () => {
    setAuthState('signup');
    dispatch(openAuthModal());
  };

  const changeAuthState = (authState: string) => {
    setAuthState(authState);
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'logout') {
      logout()
        .unwrap()
        .then((result) => {
          notification.success({
            message: result.message
          });
        })
        .catch((error) => {
          console.log('error: ', error);
        });
      dispatch(setUnauthenticated());
    }
  };

  const menuUserProps = {
    items: userAuthItems,
    onClick: handleMenuClick
  };
  const menuNotificationsProps = {
    items: notificationItems,
    onClick: handleMenuClick
  };

  const onSearch = (value: string) => {
    dispatch(setSearchQuery(value));
    setSearchParams({ _q: value });
    navigate(`courses?_q=${value}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowCategoriesNav(false);
      } else {
        setShowCategoriesNav(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const onCloseMobileMenu = () => {
    setOpenMobileMenu(false);
  };

  const showMobileMenuHandler = () => {
    setOpenMobileMenu(true);
  };

  return (
    <div className='header'>
      <div className='container'>
        <div className='header__wrapper '>
          {/* <MenuOutlined onClick={showMobileMenuHandler} className='header__menu-mobile font-bold lg:hidden' /> */}
          <Link to='/' className='header__logo'>
            <img src='https://i.imgur.com/NZj5m3U.png' alt='' className='header__logo-img' />
          </Link>

          <div className='header__nav'>
            <ul id='menu' className='header__nav-list' ref={menuRef as unknown as RefObject<HTMLUListElement>}>
              <Link to='/' className='header__logo header__logo-mobile'>
                <img src='https://i.imgur.com/NZj5m3U.png' alt='' className='header__logo-img' />
              </Link>
              {isAuth && (
                <li className='header__nav-item'>
                  <Link to='/start' className='header__nav-link'>
                    My Courses
                  </Link>
                </li>
              )}
              <li className='header__nav-item'>
                <Link to='/' className='header__nav-link'>
                  Home
                </Link>
              </li>
              <li className='header__nav-item '>
                <Link to='/courses' className='header__nav-link'>
                  Courses
                </Link>
              </li>
              <div className='header__auth header__auth-mobile'>
                {!isAuth && (
                  <Space className='item'>
                    <Button onClick={signInHandler} className='btn btn-sm'>
                      Sign in
                    </Button>
                    <Button onClick={signUpHandler} className='btn btn-sm btn-outline-primary'>
                      Sign up
                    </Button>
                  </Space>
                )}
              </div>
            </ul>

            <div className='header-icon'>
            <div className='header__search'>
                <Search
                  style={{ width: '30rem' }}
                  placeholder='Search to find your suitable courses'
                  onSearch={onSearch}
                  enterButton
                />
              </div>
              <div className='header__nav-item header__nav-item--cart'>
                <Link className='header__nav-link' to='/view-cart'>
                  <Badge count={cart?.items?.length || 0}>
                    <ShoppingCartOutlined className='header__nav-link-icon' />
                  </Badge>
                </Link>
              </div>
              {isAuth && (
                <li className='header__nav-item'>
                  <Link className='header__nav-link' to='/wishlist'>
                    <Badge>
                      <HeartOutlined
                        className='header__nav-item-user-icon header__nav-link-icon'
                        style={{ cursor: 'pointer' }}
                        />
                    </Badge>
                  </Link>
                </li>
              )}

              {isAuth && (
                <li className='header__nav-item'>
                  <Dropdown menu={menuNotificationsProps} placement='bottomRight'>
                    <Badge>
                      <BellOutlined
                        className='header__nav-item-notify-icon header__nav-link-icon'
                        style={{ cursor: 'pointer' }}
                      />
                    </Badge>
                  </Dropdown>
                </li>
              )}
              {isAuth && (
                <div className='header__nav-item header__nav-item--user'>
                  <Dropdown menu={menuUserProps} placement='bottomRight'>
                    <Badge>
                      <Avatar className='header__nav-item-user-icon' src={userData?.avatar as string} />
                    </Badge>
                  </Dropdown>
                </div>
              )}
              <div className='header__auth'>
                {!isAuth && (
                  <Space>
                    <Button onClick={signInHandler} className='btn btn-sm'>
                      Sign in
                    </Button>
                    <Button onClick={signUpHandler} className='btn btn-sm btn-outline-primary'>
                      Sign up
                    </Button>
                  </Space>
                )}
              </div>
            </div>
          </div>
          <span className='menubtn' onClick={openMenu} ref={menubtnRef}>
            &#9776;
          </span>
          <span className='closebtn' onClick={closeMenu} ref={closebtnRef}>
            &#9746;
          </span>
        </div>
      </div>
      {currentPath === '/' && showCategoriesNav && <CategoriesNav />}
      <Modal title='' open={isOpenAuthModal} onOk={handleOk} onCancel={handleCancel}>
        {authState === 'login' && <Login onClick={changeAuthState} />}
        {authState === 'signup' && <Signup onClick={changeAuthState} />}
        {authState === 'forgot' && <Forgot onClick={changeAuthState} />}
        {authStateGlobal === 'changePassword' && <ChangePassword onClick={changeAuthState} />}
      </Modal>

      <Drawer
        title='Mobile menu'
        placement={'left'}
        width={300}
        onClose={onCloseMobileMenu}
        open={openMobileMenu}
        extra={
          <Space>
            <Button onClick={onCloseMobileMenu}>Cancel</Button>
            <Button onClick={onCloseMobileMenu}>OK</Button>
          </Space>
        }
      >
      </Drawer>
    </div>
  );
};

export default Header;
