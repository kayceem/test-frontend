
import {  Skeleton} from 'antd';
import {  useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useGetCoursesQuery } from '../client.service';
import CourseList from '../components/CourseList';

const WishlistPage = () => {

  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const userId = useSelector((state: RootState) => state.auth.userId);

  const [backendParams, setBackendParams] = useState({
    _limit: 4,
    _page: 1,
    _topic: ['646781266859a50acfca8e93'], // backend,
    userId: userId
  });
  const { data: backendData, isFetching: isBackendFetching } = useGetCoursesQuery(backendParams);

  const isBackendLoadMore = (backendData?.pagination._totalRows || 0) > (backendData?.courses.length || 0);

  // Backend courses
  const backendCourses = backendData?.courses;

  const backendLoadMoreHandler = () => {
    setBackendParams({
      ...backendParams,
      _limit: (backendParams._limit || 0) + 4
    });
  };

  useEffect(() => {
    if (isAuth) {
      setBackendParams({
        ...backendParams,
        userId: userId
      });
    }
  }, [isAuth]);

  return (
    <div>
      <div className='our-courses container spacing-h-sm'>
        <h2 className='our-courses__title'>Backend</h2>
        {isBackendFetching ? (
          <Skeleton />
        ) : (
          <CourseList
            courseState='notOrdered'
            isLoadMore={isBackendLoadMore}
            onLoadMore={backendLoadMoreHandler}
            courses={backendCourses}
            className='our-courses__wrapper'
          />
        )}
      </div>
    </div>
  );
};

export default WishlistPage ;
