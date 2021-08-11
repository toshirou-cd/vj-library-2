import React, { useState, useEffect } from 'react';
import { Card, Image } from 'semantic-ui-react';
import { FiInfo } from 'react-icons/fi';
import styled from 'styled-components';

import { useHistory } from 'react-router-dom';

import SimpleForm from '@app/components/simple-form';

import { useAuth, useSelector } from '@app/hooks';

import packageJson from '../../../package.json';

const StyledCard = styled(Card)`
  width: 450px !important;
  position: absolute !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const StyledImage = styled(Image)`
  background: white !important;
  padding: 16px !important;
`;
const IconWrapper = styled.span`
  margin-right: 8px;
  vertical-align: middle;
`;

interface LoginModel {
  username: string;
  password: string;
  remember: boolean;
}

const LoginPage: React.FC = () => {
  const history = useHistory();
  // const { login } = useAuth();
  // const { loginLoading } = useSelector((state) => state.auth);
  // const [failed, setFailed] = useState(false);

  // const handleLogin = async (data: LoginModel): Promise<void> => {
  //   try {
  //     setFailed(false);
  //     const { username, password, remember } = data;
  //     await login(username, password, remember);
  //     setTimeout(() => history.push('/auth'), 0);
  //   } catch (error) {
  //     setFailed(true);
  //   }
  // };

  // useEffect(() => {
  //   window.document.title = 'PQM';
  // }, []);

  return (
    <StyledCard>
      <Card.Content>
        <SimpleForm
          formFields={[
            {
              name: 'username',
              placeholder: 'Tên đăng nhập',
            },
            {
              name: 'password',
              placeholder: 'Mật khẩu',
              inputType: 'password',
            },
            {
              name: 'remember',
              label: 'Nhớ mật khẩu',
              type: 'checkbox',
            },
          ]}
          // loading={loginLoading}
          confirmButtonLabel="Đăng nhập"
          onSubmit={(
            data: { username: 'abc' } & { password: '123' } & {
              remember: true;
            },
          ) => history.push('/home')}
          // errors={
          //   failed
          //     ? { username: '', password: 'Sai mật khẩu hoặc tên đăng nhập' }
          //     : undefined
          // }
        />
      </Card.Content>
      <Card.Content extra>
        <IconWrapper>
          <FiInfo />
        </IconWrapper>
        {packageJson.version}
      </Card.Content>
    </StyledCard>
  );
};

export default LoginPage;
