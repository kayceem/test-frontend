type ParamsType = {
  _q: string;
  _page: number;
  _limit: number;
  _status?: string;
};

const Welcome = () => {

  return (
    <div className='welcome'>
     <h1>Welcome to the admin page</h1>
    </div>
  );
};

export default Welcome;
