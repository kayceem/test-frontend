import type { TabsProps } from 'antd';
import { Button, Tabs, Form, Skeleton, Table, Select } from 'antd';
import './CourseIngishts.scss';
import AllCourses from './components/AllCourses';
import Insights from './components/Insights';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { DatePicker, Space } from 'antd';
import dayjs, {Dayjs} from 'dayjs';
import { useState } from 'react';
import { RedoOutlined, SearchOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { useGetReportsCourseInsightsQuery } from '../../../report.service';
import { formatVideoLengthToHours } from '../../../../../utils/functions';
import moment from 'moment';
const { RangePicker } = DatePicker;

interface DataType {
  key: string;
  name: string;
  learners: number;
  avgStudyTime: string;
  views: number;
  socialInteractions?: number;
  totalVideosLength: string;
  lessons: number;
  numberOfWishlist: number;
  numberOfRatings: number;
  avgRatings: number;
}

interface Params {
  dateStart: string;
  dateEnd: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'All Courses',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <Link to={`?tab=123`}>{text}</Link>
  },
  {
    title: 'Learners',
    dataIndex: 'learners',
    key: 'learners'
  },
  {
    title: 'Ratings',
    dataIndex: 'numberOfRatings',
    key: 'numberOfRatings'
  },
  {
    title: 'Avg ratings',
    dataIndex: 'avgRatings',
    key: 'avgRatings'
  },
  {
    title: 'Avg. Study time',
    dataIndex: 'avgStudyTime',
    key: 'avgStudyTime'
  },
  {
    title: 'Views',
    dataIndex: 'views',
    key: 'views'
  },
  {
    title: 'Wishlist',
    dataIndex: 'numberOfWishlist',
    key: 'numberOfWishlist'
  },
  {
    title: 'Total durations',
    dataIndex: 'totalVideosLength',
    key: 'totalVideosLength'
  },
  {
    title: 'Lessons',
    dataIndex: 'lessons',
    key: 'lessons'
  }
];

const CourseInsights = () => {

  const [form] = Form.useForm();
  const [isSearch, setIsSearch] = useState(true);
  const [currentParams, setCurrentParams] = useState({dateStart: '', dateEnd: ''});

  const { data: courseInsightsData, isFetching, refetch } = useGetReportsCourseInsightsQuery({
    dateStart: currentParams.dateStart,
    dateEnd: currentParams.dateEnd,
  }, {
    skip: !isSearch
  });

  const userProgressReports = courseInsightsData?.reports || [];

  const reportData: DataType[] = userProgressReports.map((report) => {
    const reportTemplateItem = {
      key: report._id,
      name: report.name,
      learners: report.learners,
      avgStudyTime: formatVideoLengthToHours(+report.avgStudyTime),
      views: report.views,
      // socialInteractions: report.socialInteractions,
      totalVideosLength: formatVideoLengthToHours(+report.totalVideosLength),
      lessons: report.lessons,
      numberOfWishlist: report.numberOfWishlist,
      numberOfRatings: report.numberOfRatings,
      avgRatings: report.avgRatings
    };
    return reportTemplateItem;
  });

  const hangeChangeRangeDate = (dates: [Dayjs, Dayjs], dateStrings: [string, string]) => {
    setIsSearch(false);
    setCurrentParams({
      dateStart: dates[0].format('DD/MM/YYYY'),
      dateEnd: dates[1].format('DD/MM/YYYY')
    })
  }

  const getQuarterDates = (quarter: number) => {
    if (quarter < 1 || quarter > 4) {
      throw new Error('Invalid quarter number. Please provide a number between 1 and 4.');
    }
  
    const now = moment();
    const currentYear = now.year();
  
    // Calculate the start month of the quarter  
    const quarterStartMonth = (quarter - 1) * 3; 
  
    // Create the start and end dates
    const quarterStart = moment([currentYear, quarterStartMonth, 1]);
    const quarterEnd = quarterStart.clone().endOf('quarter');
  
    return {
      dateStart: quarterStart.toDate(),
      dateEnd: quarterEnd.toDate()
    };
  }

  const handleFilterByQuarterOfYear = (value: string) => {

    switch (value) {
      case '1':
       {
        const {dateStart, dateEnd} = getQuarterDates(1)

        setCurrentParams({
          dateStart: moment(dateStart).format('DD/MM/YYYY'),
          dateEnd: moment(dateEnd).format('DD/MM/YYYY')
        })
       }
        break;
      case '2':
       {
        const {dateStart, dateEnd} = getQuarterDates(2)
        setCurrentParams({
          dateStart: moment(dateStart).format('DD/MM/YYYY'),
          dateEnd: moment(dateEnd).format('DD/MM/YYYY')
        })
       }
        break;
      case '3':
        {
          const {dateStart, dateEnd} = getQuarterDates(3)
          setCurrentParams({
            dateStart: moment(dateStart).format('DD/MM/YYYY'),
            dateEnd: moment(dateEnd).format('DD/MM/YYYY')
          })
        }
        break;
      case '4':
        {
          const {dateStart, dateEnd} = getQuarterDates(4)
          setCurrentParams({
            dateStart: moment(dateStart).format('DD/MM/YYYY'),
            dateEnd: moment(dateEnd).format('DD/MM/YYYY')
          })
        }
        break;
    }

  }



  const searchData = () => {
    setIsSearch(true)
  }

  

  const resetData = () => {
    form.resetFields();
    refetch().then((res)=> {
      console.log('res', res)
    }).catch((error) => {
      console.log("error", error)
    })
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `All Courses`,
      children: <AllCourses />
    },
    {
      key: '2',
      label: `Insights`,
      children: <Insights />
    }
  ];

  return (
    <div className='course-insights'>
      <div className='breakcrumb'>
        <Breadcrumb
          items={[
            {
              title: 'Reports Center'
            },
            {
              title: 'User Analytics'
            },
            {
              title: <Link to='#'>Course Insights</Link>
            }
          ]}
        />
      </div>
      <div className='course-insights__wrap'>
              {/* Filter section */}
              <div className="filter-section">
          <Form layout="inline" form={form}>
            <Form.Item name="rangeDate" label="Select Range of Date">
            <RangePicker onChange={hangeChangeRangeDate} />
            </Form.Item  >
            {/* Filter by quarter */}
          <Form.Item name="filterByQuarterOfYear" label="Filter By Quarter of Year">
            <Select
                style={{ width: 240 }}
                allowClear
                onChange={handleFilterByQuarterOfYear}
                options={[
                  { value: '1', label: 'The first quarter' },
                  { value: '2', label: 'Second quarter' },
                  { value: '3', label: 'Third quarter' },
                  { value: '4', label: 'Fourth quarter' },
                ]}
              />
          </Form.Item>
                {/* Filter by author */}
          <Form.Item name="filterByAuthor" label="Filter By Author">
            <Select
                style={{ width: 240 }}
                allowClear
                onChange={handleFilterByQuarterOfYear}
                options={[
                  { value: '1', label: 'The first quarter' },
                  { value: '2', label: 'Second quarter' },
                  { value: '3', label: 'Third quarter' },
                  { value: '4', label: 'Fourth quarter' },
                ]}
              />
          </Form.Item>

              <Form.Item label="Filter">
              <Button type="primary" icon={<SearchOutlined />} onClick={searchData}>
                Search
              </Button>
              <Button className="ml-2" type="primary" icon={<RedoOutlined />} onClick={resetData}>
                Reset
              </Button>
              </Form.Item>
          </Form>
          </div>

        {/* <Tabs defaultActiveKey='1' items={items} onChange={onChange} /> */}

        <div className='users-progress__table-section'>
      {isFetching && <Skeleton />}
      {!isFetching && <Table scroll={{ x: 'max-content' }} columns={columns} dataSource={reportData} />}
    </div>
      </div>
    </div>
  );
};

export default CourseInsights;
