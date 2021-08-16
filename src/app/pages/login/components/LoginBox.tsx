import React, { Dispatch, FormEvent, useState } from 'react';
import './LoginBox.less';
import { useHistory } from 'react-router-dom';
import Logo from '../../../assets/images/Logo.png'
import { SubmitHandler } from 'react-hook-form';
import authService from '@app/services/auth/authService';
import { useDispatch } from 'react-redux';
import { LoginFail, LoginSuccess } from '@app/store/actions/authActions';
import { Button } from 'semantic-ui-react';
import {decodeToken, isExpired}  from 'react-jwt'


const LoginBox: React.FC = () => {
  const history = useHistory();
  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)

  const dispatch:Dispatch<any> = useDispatch()
  

  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true)
    
      authService.login(username!,password!).then(
        (data) => {
          const token = data.data
          const decodedToken = decodeToken(token)
          dispatch(LoginSuccess(data.user,"user"))
          console.log("ok" , data.user , "token is expired :" ,decodedToken)

          history.push("/patron")
        }
        ).catch((err) => {
          dispatch(LoginFail())
          setLoading(false)
          console.log("login fail",err )
        })
  };




  return (
    <div className="ui tight grid middle aligned sub-container">
      <div className="login-box column">
        <div className="upper-part">
          <div className="logo">
            <div className="image-wrapper">
              <img src={Logo} />
            </div>
            <h1 className="title-text align-center">Library Management</h1>
          </div>
          <div className="greeting-box">
            <h1 className="title-text greeting">Good morning</h1>
            <p className="greeting">
              Please sign in using your company email and password
            </p>
          </div>
          <form onSubmit={handleLogin}>

            
          <input type="text" className="login-textfield" placeholder="Email"
                value={username}
                onChange={ (e) => setUsername(e.currentTarget.value)}
                />
          <input
            type="password"
            className="login-textfield"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            
            />
          
        <Button disabled={loading} type="submit" className="login-button">
          Sign in
        </Button>
            </form>

        </div>
      </div>
    </div>
  );
};

export default LoginBox;
function setLoading(arg0: boolean) {
  throw new Error('Function not implemented.');
}


