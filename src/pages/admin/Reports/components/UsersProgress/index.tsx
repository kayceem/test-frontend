import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select } from 'antd';
import './UsersProgress.scss';
import UsersProgressTable from './components/UserProgressTable';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { RedoOutlined, SearchOutlined } from '@ant-design/icons';
import dayjs, {Dayjs} from 'dayjs';
import moment from 'moment';
const { RangePicker } = DatePicker;

const UsersProgress = () => {

  const [form] = Form.useForm();
  const [isSearch, setIsSearch] = useState(true);
  const [currentParams, setCurrentParams] = useState({dateStart: '', dateEnd: ''});


  const selectCourseChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const courseSearchChange = (value: string) => {
    console.log('search:', value);
  };

  const avgScoreSelectChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const progressSelectChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const avgScorePercentChange = (value: number | null) => {
    console.log('changed', value);
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

  const hangeChangeRangeDate = (dates: [Dayjs, Dayjs], dateStrings: [string, string]) => {
    setIsSearch(false);
    setCurrentParams({
      dateStart: dates[0].format('DD/MM/YYYY'),
      dateEnd: dates[1].format('DD/MM/YYYY')
    })
  }

  const searchData = () => {
    setIsSearch(true)
  }

  const resetData = () => {
    form.resetFields();
    // refetch().then((res)=> {
    //   console.log('res', res)
    // }).catch((error) => {
    //   console.log("error", error)
    // })
  }

  return (
    <div className='users-progress'>
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
              title: <Link to='#'>User Progress</Link>
            }
          ]}
        />
      </div>
      <div className='users-progress__wrap'>
        <Row className='users-progress__row' gutter={16}>
          <Col className='users-progress__col users-progress__select-course' md={12}>
            <h3 className='users-progress__select-course-title'>Select a course</h3>
            {/* Select course */}
            <Row className='users-progress__select-course-row'>
              <Col md={6}>Select a course</Col>
              <Col md={12}>
                <Select
                  showSearch
                  placeholder='Select a course'
                  optionFilterProp='children'
                  onChange={selectCourseChange}
                  onSearch={courseSearchChange}
                  filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                  options={[
                    {
                      value: 'jack',
                      label: 'Jack'
                    },
                    {
                      value: 'lucy',
                      label: 'Lucy'
                    },
                    {
                      value: 'tom',
                      label: 'Tom'
                    }
                  ]}
                />
              </Col>
            </Row>

            {/* With average score */}
            <Row className='users-progress__select-course-row'>
              <Col md={6}>With average score</Col>
              <Col md={12} className='users-progress__select-course-row-item'>
                <Select
                  defaultValue='lucy'
                  style={{ width: 120 }}
                  onChange={avgScoreSelectChange}
                  options={[
                    { value: 'jack', label: 'Jack' },
                    { value: 'lucy', label: 'Lucy' },
                    { value: 'Yiminghe', label: 'yiminghe' },
                    { value: 'disabled', label: 'Disabled', disabled: true }
                  ]}
                />
                <InputNumber min={0} max={100} defaultValue={3} onChange={avgScorePercentChange} />
              </Col>
            </Row>

            {/* With progress */}
            <Row className='users-progress__select-course-row'>
              <Col md={6}>With progress</Col>
              <Col md={12} className='users-progress__select-course-row-item'>
                <Select
                  defaultValue='more than'
                  style={{ width: 120 }}
                  onChange={progressSelectChange}
                  options={[
                    { value: 'jack', label: 'Jack' },
                    { value: 'lucy', label: 'Lucy' },
                    { value: 'Yiminghe', label: 'yiminghe' },
                    { value: 'disabled', label: 'Disabled', disabled: true }
                  ]}
                />
                <InputNumber
                  placeholder='Ex: 80%'
                  min={0}
                  max={100}
                  defaultValue={0}
                  onChange={avgScorePercentChange}
                />
              </Col>
            </Row>

            {/* Is Completed */}

            <Row className='user-pgoress__select-course-row'>
              <Col md={6}>Is Completed</Col>
              <Col md={12} className='users-progress__select-course-row-item'>
                <Select
                  style={{ width: 200 }}
                  onChange={progressSelectChange}
                  options={[
                    { value: 'jack', label: 'Completed ' },
                    { value: 'lucy', label: 'Not Completed' },
                    { value: 'Yiminghe', label: 'yiminghe' }
                  ]}
                />
              </Col>
            </Row>
          </Col>
          <Col className='users-progress__col users-progress__select-user' md={12}>
            <h3 className='users-progress__select-user-title'>Select users</h3>
            <Row className='user-progress__select-user-row'>
              <Col md={6}>Email contains</Col>
              <Col md={12} className='users-progress__select-course-row-item'>
                <Input placeholder='Enter email (min 3 charcter)' />
              </Col>
            </Row>
            {/* User name contains */}
            <Row className='user-progress__select-user-row'>
              <Col md={6}>User name contains</Col>
              <Col md={12} className='users-progress__select-course-row-item'>
                <Input placeholder='Ex: user name' />
              </Col>
            </Row>

            {/* have tag */}

            <Row className='user-progress__select-user-row'>
              <Col md={6}>Have tag</Col>
              <Col md={12} className='users-progress__select-course-row-item'>
                <Select
                  options={[
                    { value: 'jack', label: 'Jack' },
                    { value: 'lucy', label: 'Lucy' },
                    { value: 'Yiminghe', label: 'yiminghe' }
                  ]}
                  placeholder='Ex: tag'
                />
              </Col>
            </Row>
            {/* Registered */}
            <Row className='user-progress__select-user-row'>
              <Col md={6}>Have tag</Col>
              <Col md={12} className='users-progress__select-course-row-item'>
                <Select
                  options={[
                    { value: 'jack', label: 'Jack' },
                    { value: 'lucy', label: 'Lucy' },
                    { value: 'Yiminghe', label: 'yiminghe' }
                  ]}
                  placeholder='Exactly'
                />
              </Col>
            </Row>
          </Col>

          {/* Apply filters - reset filters */}

          <div className='users-progress__btns'>
            <Button className='users-progress__btns-filter btn-wrap'>Apply filters</Button>
            <Button className='users-progress__btns-reset btn-wrap'>Reset filters</Button>
          </div>
        </Row>

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

        {/* Showing results of table */}
        <div className='users-progress__filter-result'>Showing 1 to 2 users out of 2</div>

        <div className='users-progress__table'>
          <UsersProgressTable />
        </div>
      </div>
    </div>
  );
};

export default UsersProgress;
