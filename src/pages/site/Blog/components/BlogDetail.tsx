interface BlogDetailProps {
  title: string;
  content: string;
}

function BlogDetail({ title, content }: BlogDetailProps) {
  return (
    <>
      <div className='main_content'>
        <h1 className='text-4xl my-8'>{title}</h1>
        <ul className='my-4 opacity-90 pl-10'>
          <li className='text-2xl list-disc my-2'>{content}</li>
        </ul>
      </div>
    </>
  );
}

export default BlogDetail;
