import type { TabsProps } from 'antd';
import { Button, Tabs, Form, Skeleton, Table, Select, Row, Col } from 'antd';
import './CourseIngishts.scss';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { DatePicker, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { DownloadOutlined, RedoOutlined, SearchOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { useGetReportsCourseInsightsQuery } from '../../../report.service';
import { formatVideoLengthToHours } from '../../../../../utils/functions';
import moment from 'moment';
import { read, utils, writeFileXLSX } from 'xlsx';
import * as XLSX from 'xlsx';
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
  const [currentParams, setCurrentParams] = useState({ dateStart: '', dateEnd: '' });

  const {
    data: courseInsightsData,
    isFetching,
    refetch
  } = useGetReportsCourseInsightsQuery(
    {
      dateStart: currentParams.dateStart,
      dateEnd: currentParams.dateEnd
    },
    {
      skip: !isSearch
    }
  );

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
    });
  };

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
  };

  const handleFilterByQuarterOfYear = (value: string) => {
    switch (value) {
      case '1':
        {
          const { dateStart, dateEnd } = getQuarterDates(1);

          setCurrentParams({
            dateStart: moment(dateStart).format('DD/MM/YYYY'),
            dateEnd: moment(dateEnd).format('DD/MM/YYYY')
          });
        }
        break;
      case '2':
        {
          const { dateStart, dateEnd } = getQuarterDates(2);
          setCurrentParams({
            dateStart: moment(dateStart).format('DD/MM/YYYY'),
            dateEnd: moment(dateEnd).format('DD/MM/YYYY')
          });
        }
        break;
      case '3':
        {
          const { dateStart, dateEnd } = getQuarterDates(3);
          setCurrentParams({
            dateStart: moment(dateStart).format('DD/MM/YYYY'),
            dateEnd: moment(dateEnd).format('DD/MM/YYYY')
          });
        }
        break;
      case '4':
        {
          const { dateStart, dateEnd } = getQuarterDates(4);
          setCurrentParams({
            dateStart: moment(dateStart).format('DD/MM/YYYY'),
            dateEnd: moment(dateEnd).format('DD/MM/YYYY')
          });
        }
        break;
    }
  };

  const searchData = () => {
    setIsSearch(true);
  };

  const resetData = () => {
    form.resetFields();
    refetch()
      .then((res) => {
        console.log('res', res);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const exportToExcel = () => {
    // Prepare the data
    const worksheet = XLSX.utils.json_to_sheet(reportData);

    // Create a new Workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Course Insights');

    // Generate file buffer
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Trigger download
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const fileURL = window.URL.createObjectURL(data);

    const link = document.createElement('a');
    link.href = fileURL;
    link.download = 'CourseInsights.xlsx';
    link.click();
  };

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
        <div className='filter-section'>
          <Form layout='inline' form={form} className='bg-white p-4'>
            <Row>
              <Col span={12} className='mb-4'>
                <Form.Item name='rangeDate' label='Select Range of Date'>
                  <RangePicker onChange={hangeChangeRangeDate} />
                </Form.Item>
              </Col>
              <Col span={12} className='mb-4'>
                {/* Filter by quarter */}
                <Form.Item name='filterByQuarterOfYear' label='Filter By Quarter of Year'>
                  <Select
                    style={{ width: 240 }}
                    allowClear
                    onChange={handleFilterByQuarterOfYear}
                    options={[
                      { value: '1', label: 'The first quarter' },
                      { value: '2', label: 'Second quarter' },
                      { value: '3', label: 'Third quarter' },
                      { value: '4', label: 'Fourth quarter' }
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col span={12} className='mb-4'>
                {/* Filter by author */}
                <Form.Item name='filterByAuthor' label='Filter By Author'>
                  <Select
                    style={{ width: 240 }}
                    allowClear
                    onChange={handleFilterByQuarterOfYear}
                    options={[
                      { value: '1', label: 'The first quarter' },
                      { value: '2', label: 'Second quarter' },
                      { value: '3', label: 'Third quarter' },
                      { value: '4', label: 'Fourth quarter' }
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label='Filter'>
                  <Button className="mr-2" type='primary' icon={<SearchOutlined />} onClick={searchData}>
                    Search
                  </Button>
                  <Button className='mr-2' type='primary' icon={<RedoOutlined />} onClick={resetData}>
                    Reset
                  </Button>
                  <Button className='mr-2' type='primary' icon={<DownloadOutlined />} onClick={exportToExcel}>
                    Export to Excel
                  </Button>
                </Form.Item>
              </Col>
            </Row>
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
