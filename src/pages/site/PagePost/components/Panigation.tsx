import { Pagination } from 'antd';

interface PaginationProps {
  page: number;
  pageSize: number;
}

const Panigation = ({ page, pageSize }: PaginationProps) => {
  const onchange = () => {
    console.log(page, pageSize);
  };

  return (
    <div>
      <Pagination
        defaultCurrent={1}
        total={50} // tổng số item, bạn cần thay đổi con số này theo dữ liệu của bạn
        onChange={onchange}
        pageSize={5} // số lượng item trên mỗi trang
        showSizeChanger={false} // ẩn chức năng thay đổi số lượng item trên mỗi trang nếu bạn không cần
      />
    </div>
  );
};

export default Panigation;
