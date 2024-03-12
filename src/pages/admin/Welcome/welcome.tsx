import './welcome.scss';
type ParamsType = {
  _q: string;
  _page: number;
  _limit: number;
  _status?: string;
};
const Welcome = () => {
  return (
    <div className='welcome'>
      <div className='welcome-header'>
        <div className='welcome-header-left'>
          <h3 className='title'>Welcome to Admin! 🎉</h3>
          <div className='desc'>
            Welcome back! Wishing you a productive and enjoyable day working on your admin website. Hope you have great
            experiences and success in all management activities.
          </div>
          <div className='heart'></div>
        </div>
        <div className='welcome-header-right'>
          <img src="https://sneat-vuetify-admin-template.vercel.app/assets/illustration-john-light-0061869a.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
