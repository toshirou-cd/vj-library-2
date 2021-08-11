import React from 'react';
import './LoginPage.less';
import LoginBox from './components/LoginBox';

const LoginPage: React.FC = () => {
  return (
    <div className="ui tight grid content">
        <div className="ui tight grid login-picture centered middle aligned">
          <div className="column image-wrapper">
            <img
              src={require('@app/assets/images/person_working_in_warehouse.png')}
              alt="person working in warehouse"
            />
          </div>
        </div>
        <div className="login-box">
          <LoginBox />
        </div>
    </div>
  );
};

export default LoginPage;
