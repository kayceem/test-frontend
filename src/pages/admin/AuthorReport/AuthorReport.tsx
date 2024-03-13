import { Breadcrumb, Button, Col, Form, Input, Row, Select, Statistic, Table, TablePaginationConfig, TableProps } from 'antd';
import { ColumnsType, FilterValue } from 'antd/es/table/interface';
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../store/store';
import { CalendarOutlined, ClockCircleOutlined, DollarOutlined, FolderOpenOutlined, ReadOutlined, RedoOutlined, RetweetOutlined, SearchOutlined, UserOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { useGetSummaryReportsQuery, useGetCoursesReportByAuthorQuery } from '../report.service';
import { selectPreviousDays, showChart } from '../report.slice';
import Chart from '../Dashboard/components/Chart';
import { DatePicker, Space } from 'antd';
import dayjs, {Dayjs} from 'dayjs';
const { RangePicker } = DatePicker;
const statisticItemStyle = {};
enum Access {
  PAID = 'PAID',
  FREE = 'FREE',
  DRAFT = 'DRAFT',
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE'
}

interface IAuthorReport {
  courseName: string;
  leanders: number;
  createdAt: string;
  totalRevenue: number;
  isDeleted?: boolean;
}
const { Search } = Input;
interface DataCourseType {
  key: React.Key;
  courseName: string;
  learners: number;
  createdAt: string; // Convert to date: Example: 18 jun 2023
  totalRevenue: number;
  actions?: any;
  render: (_: IAuthorReport, record: IAuthorReport) => JSX.Element
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const AuthorReport = () => {
  const [form] = Form.useForm();
  const adminId = useSelector((state: RootState) => state.auth.adminId);
  const [currentParams, setCurrentParams] = useState({dateStart: '', dateEnd: ''});
  const { data, isFetching, refetch } = useGetCoursesReportByAuthorQuery(currentParams, {
    skip: !currentParams.dateStart || !currentParams.dateEnd
  });
 

  const dispatch = useDispatch();

  const { data: summaryReportsData } = useGetSummaryReportsQuery();

  const chartName = useSelector((state: RootState) => state.report.chartName);

  const handleChange = (value: string) => {

    dispatch(selectPreviousDays(Number(value)));
  };

  const showNewUserSignupsChart = () => {

    dispatch(showChart('new-signups'));
  };

  const showRevenuesChart = () => {
    dispatch(showChart('revenues'));
  };

  const showCourseSalesChart = () => {
    dispatch(showChart('course-sales'));
  };


  const columns: ColumnsType<DataCourseType> = [
    {
      title: 'Course Name',
      dataIndex: 'courseName',
      key: 'courseName',
      ellipsis: true
    },
    {
      title: 'Learners',
      dataIndex: 'learners',
      key: 'learners',
      ellipsis: true
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      ellipsis: true
    },
    {
      title: 'Total Earning ($)',
      dataIndex: 'totalEarnings',
      key: 'totalEarnings',
      ellipsis: true
    },
    {
      title: 'Status',
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      render: (_: IAuthorReport, record: IAuthorReport) => <span>{record.isDeleted ? 'Inactive' : 'Active'}</span>
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: IAuthorReport, record: IAuthorReport) => (
        <Space size='middle'>
          {/* <Button icon={<EditOutlined style={{ color: '#1890ff' }} />} onClick={() => handleUpdate(record._id)} />
          <Button icon={<EyeOutlined style={{ color: '#1890ff' }} />} onClick={() => handleViewDetails(record._id)} />
          <Button
            icon={<HistoryOutlined style={{ color: '#1890ff' }} />}
            onClick={() => handleViewHistory(record._id)}
          />
          {record.isDeleted ? (
            <Popconfirm
              title='Are you sure you want to activate this coupon type?'
              placement='topRight'
              onConfirm={() => handleUpdateStatus(record._id)}
              okText='Yes'
              cancelText='No'
            >
              <Button icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />} />
            </Popconfirm>
          ) : (
            <Popconfirm
              title='Are you sure you want to deactivate this coupon type?'
              placement='topRight'
              onConfirm={() => handleUpdateStatus(record._id)}
              okText='Yes'
              cancelText='No'
            >
              <Button icon={<StopOutlined style={{ color: '#ff4d4f' }} />} danger />
            </Popconfirm>
          )} */}
        </Space>
      )
    }
  ];

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 12
    }
  });

  const onChange: TableProps<DataCourseType>['onChange'] = (pagination, filters, sorter, extra) => {

    setTableParams({
      pagination
    });
  };

  const hangeChangeRangeDate = (dates: [Dayjs, Dayjs], dateStrings: [string, string]) => {
    console.log('From: ', dates[0].format('DD/MM/YYYY'), 'To: ', dates[1].format('DD/MM/YYYY'));
    setCurrentParams({
      dateStart: dateStrings[0],
      dateEnd: dateStrings[1]
    })
  }

  const searchData = () => {
    console.log('search data', currentParams);
    console.log("form", form.getFieldsValue())
    refetch().then(() => {
      console.log('data', data);
    
    }).catch((err) => {
      console.log('err', err);
    })
  }

  const resetData = () => {
    form.resetFields();
  }

  return (
    <Fragment>
      {/* Breadcrumb play */}
      <div className='breakcrumb'>
        <Breadcrumb
          items={[
            {
              title: 'Author Report'
            },
            {
              title: <Link to='#'>Author Report</Link>
            }
          ]}
        />
      </div>
      {/* Filter section */}
          <div className="filter-section">
          <Form layout="inline" form={form}>
            <Form.Item name="rangeDate" label="Select Range of Date">
        <RangePicker onChange={hangeChangeRangeDate} />
        </Form.Item  >
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

      {/* Author report content */}
      <div className='author-report-content mt-8'>
        <Table columns={columns} dataSource={data?.reports ?? []} onChange={onChange} pagination={tableParams.pagination} />
        </div>
      {/* Chart report! */}
      <div className='dashboard'>
      <div className='dashboard__summary'>
        <Row className='dashboard__summary-row'>
          <Col className='dashboard__summary-col' md={16}>
            <div className='dashboard__chart'>
              <div className='dashboard__chart-header'>
                <div className='dashboard__chart-header-logo'>
                  <CalendarOutlined className='dashboard__chart-header-logo-icon' />
                  <span className='dashboard__chart-header-logo-text'>Your Academy</span>
                </div>
                <div className='dashboard__chart-header-nav'>
                  <Button
                    type={chartName === 'new-signups' ? 'primary' : 'default'}
                    ghost={chartName === 'new-signups' ? true : false}
                    className='dashboard__chart-header-nav-item'
                    onClick={showNewUserSignupsChart}
                  >
                    New signups
                  </Button>
                  <Button
                    type={chartName === 'revenues' ? 'primary' : 'default'}
                    ghost={chartName === 'revenues' ? true : false}
                    className='dashboard__chart-header-nav-item'
                    onClick={showRevenuesChart}
                  >
                    Revenue
                  </Button>
                  <Button
                    type={chartName === 'course-sales' ? 'primary' : 'default'}
                    ghost={chartName === 'course-sales' ? true : false}
                    className='dashboard__chart-header-nav-item'
                    onClick={showCourseSalesChart}
                  >
                    Course sales
                  </Button>
                  <Select
                    className='dashboard__chart-header-nav-item dashboard__chart-header-nav-item--select'
                    defaultValue='7'
                    style={{ width: 120, backgroundColor: '#EBEBEB' }}
                    onChange={handleChange}
                    options={[
                      { value: '7', label: 'Last 7 days' },
                      { value: '30', label: 'Last 30 days' },
                      { value: '60', label: 'Last 60 days' },
                      { value: 'all', label: 'All' }
                    ]}
                  />
                </div>
              </div>

              <div className='dashboard__chart-body'>
                <Chart />
              </div>
            </div>
          </Col>
          <Col className='dashboard__summary-col' md={8}>
            <div className='dashboard__statistic'>
              <Row className='dashboard__statistic-row'>
                <Col md={8}>
                  <Link to='/author/users'>
                    <Statistic
                      className='dashboard__statistic-item'
                      valueStyle={statisticItemStyle}
                      title='All Users'
                      value={summaryReportsData?.reports.users}
                      prefix={<UsergroupAddOutlined />}
                    />
                  </Link>
                </Col>
                <Col md={8}>
                  <Statistic
                    className='dashboard__statistic-item'
                    valueStyle={statisticItemStyle}
                    title='Conversation'
                    value={`${summaryReportsData?.reports.conversions || 0}%`}
                    prefix={<RetweetOutlined />}
                  />
                </Col>
                <Col md={8}>
                  <Link to='/author/orders?days=30'>
                    <Statistic
                      className='dashboard__statistic-item'
                      valueStyle={statisticItemStyle}
                      title='30 days sales'
                      value={summaryReportsData?.reports.saleOf30days}
                      prefix={<DollarOutlined />}
                    />
                  </Link>
                </Col>
                <Col md={8}>
                  <Statistic
                    className='dashboard__statistic-item'
                    valueStyle={statisticItemStyle}
                    title='Avg time'
                    value={`${summaryReportsData?.reports.avgTimeLearningPerUser || 0} min`}
                    prefix={<ClockCircleOutlined />}
                  />
                </Col>
                <Col md={8}>
                  <Link to='/author/courses'>
                    <Statistic
                      className='dashboard__statistic-item'
                      valueStyle={statisticItemStyle}
                      title='Courses'
                      value={summaryReportsData?.reports.courses}
                      prefix={<ReadOutlined />}
                    />
                  </Link>
                </Col>
                <Col md={8}>
                  <Link to='/author/categories'>
                    <Statistic
                      className='dashboard__statistic-item'
                      valueStyle={statisticItemStyle}
                      title='Course categories'
                      value={summaryReportsData?.reports.categories}
                      prefix={<FolderOpenOutlined />}
                    />
                  </Link>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>

 
    </div>
    </Fragment>
  );
};

export default AuthorReport;
