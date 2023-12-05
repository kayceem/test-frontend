import { Avatar, Card, Col, Row } from 'antd';
import { HeartOutlined, CommentOutlined, BookOutlined, EllipsisOutlined } from '@ant-design/icons';
import BlogDetail from './components/BlogDetail';

export default function Blog() {
  return (
    <>
      <div className='container mx-auto px-4 pb-20 pt-40'>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={6} lg={6} xl={6} className='max-h-full relative'>
            <Card className=''>
              {/* Blog col 1 */}
              <div className='flex'>
                <div className='flex mb-4 flex-col mr-12'>
                  <div>
                    <div className='inline text-3xl'>Kha</div>
                    <hr className='my-3' />
                  </div>
                  <div className='flex items-center'>
                    <HeartOutlined className='text-2xl mr-2' /> 16
                    <CommentOutlined className='text-2xl ml-4 mr-2' /> 3
                  </div>
                </div>
                {/* Blog col 1 */}
                {/* Blog col 2 */}
              </div>
            </Card>
          </Col>
          {/* Col 2 */}
          <Col xs={24} sm={24} md={18} lg={18} xl={18} className='max-h-full'>
            <Card>
              <div className='flex mb-4 flex-col mr-4'>
                <div className='ml-12'>
                  <h1 className='blog_Name text-6xl font-bold mb-12'>Authentication & Authorization in ReactJS</h1>
                  <div className='blog_user'>
                    <div className='blog_Avatar flex justify-between'>
                      <div className='blog_Avatar-user'>
                        <Avatar src='path_to_avatar_image' className='w-16 h-16' />
                        <div className='inline ml-3 text-3xl'>Kha</div>
                        <div className='text-gray-500 text-1xl mb-4'>2 months ago • 9 min read</div>
                      </div>
                      <div className='blog_Avatar-icon'>
                        <div className='bookOutLine inline mr-4'>
                          <BookOutlined className='text-3xl hover:opacity-60 cursor-pointer' />
                        </div>
                        <div className='ellipsisOutlined inline'>
                          <EllipsisOutlined className='text-3xl hover:opacity-60 cursor-pointer' />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Blog_Detail */}
                  <div className='blog_Detail'>
                    <div className='blog_Detail-content'>
                      <p className='title my-4 text-3xl opacity-90'>
                        Authentication và Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp
                        chúng ta xác thực và phân quyền người dùng trước khi cho người dùng truy cập vào tài nguyên của
                        ứng dụng. Trong bài viết này sẽ hướng dẫn các ReactJS thủ 🤣 cách implement Authentication và
                        Authorization. A chị nào biết rồi giả bộ đọc hết bài viết rồi so sánh với cách đang dùng xem thế
                        nào ha :)) Nẹt bô rồi gẹt gô thôi ReactJS thủ 🤣
                      </p>
                      <BlogDetail title='1.Đặt vấn đề' content='Authentication & Authorization in ReactJS' />
                      <BlogDetail title='2.Ý tưởng' content='Authentication & Authorization in ReactJS' />
                      <BlogDetail title='3.Triển khai' content='Authentication & Authorization in ReactJS' />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          {/* Col 2 */}
        </Row>
      </div>
    </>
  );
}
