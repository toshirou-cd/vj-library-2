import React, { useMemo } from 'react';
import { Modal } from 'semantic-ui-react';

import { useSelector, useFetchApi } from '@app/hooks';
import SimpleForm from '@app/components/simple-form';
import { FormField } from '@app/models/form-field';
import { UserCM } from '@admin/user-management/user/user.model';
import userService from '@admin/user-management/user/user.service';

interface Props {
  open: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

const UserModal: React.FC<Props> = (props) => {
  const { open, onClose, onRefresh } = props;
  const { fetch, fetching } = useFetchApi();
  const { getUsersLoading } = useSelector(
    (state) => state.admin.userManagement.user,
  );
  const formFields = useMemo(
    (): FormField<UserCM>[] => [
      {
        name: 'username',
        label: 'Tên đăng nhập',
      },
      {
        name: 'password',
        label: 'Mật khẩu',
        inputType: 'password',
      },
      {
        name: 'fullName',
        label: 'Họ và tên',
      },
      {
        name: 'email',
        label: 'Email',
      },
      {
        name: 'phoneNumber',
        label: 'SĐT',
      },
    ],
    [],
  );
  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>Tạo người dùng</Modal.Header>
      <Modal.Content>
        <SimpleForm
          loading={fetching || getUsersLoading}
          formFields={formFields}
          onSubmit={async (d): Promise<void> => {
            await fetch(userService.createUser(d));
            onRefresh();
            onClose();
          }}
        />
      </Modal.Content>
    </Modal>
  );
};

export default UserModal;
