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

      <div className="welcome-box">
      <div className="activity">
                <div className="title">
                    <span className="text">Recent activity</span>
                </div>

                <div className="activity-data">
                    <div className="data names">
                        <span className="data-title">First and last name</span>
                        <span className="data-list data-list-name">Prem Shahi</span>
                        <span className="data-list data-list-name">Deepa Chand</span>
                        <span className="data-list data-list-name">Manisha Chand</span>
                        <span className="data-list data-list-name">Pratima Shahi</span>
                        <span className="data-list data-list-name">Man Shahi</span>
                    </div>
                    <div className="data email">
                        <span className="data-title">Email</span>
                        <span className="data-list data-list-mail">premshahi@gmail.com</span>
                        <span className="data-list data-list-mail">deepachand@gmail.com</span>
                        <span className="data-list data-list-mail">prakashhai@gmail.com</span>
                        <span className="data-list data-list-mail">manishachand@gmail.com</span>
                        <span className="data-list data-list-mail">pratimashhai@gmail.com</span>
                    </div>
                    <div className="data joined">
                        <span className="data-title">Join</span>
                        <span className="data-list">2022-02-12</span>
                        <span className="data-list">2022-02-12</span>
                        <span className="data-list">2022-02-13</span>
                        <span className="data-list">2022-02-13</span>
                        <span className="data-list">2022-02-14</span>
                    </div>
                    <div className="data type">
                        <span className="data-title">Type</span>
                        <span className="data-list">New</span>
                        <span className="data-list">Member</span>
                        <span className="data-list">Member</span>
                        <span className="data-list">New</span>
                        <span className="data-list">Member</span>
                    </div>
                    <div className="data status">
                        <span className="data-title">Status</span>
                        <span className="data-list">Active</span>
                        <span className="data-list">Active</span>
                        <span className="data-list">Active</span>
                        <span className="data-list">Active</span>
                        <span className="data-list data-list-red">UnActive</span>
                    </div>
                </div>
            </div>
      </div>
    </div>
  );
};

export default Welcome;
