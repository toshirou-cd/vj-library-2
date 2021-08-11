import React, { useMemo } from 'react';
import { Modal } from 'semantic-ui-react';

import { useFetchApi, useSelector } from '@app/hooks';
import { FormField } from '@app/models/form-field';
import SimpleForm from '@app/components/simple-form';
import roleService from '@admin/user-management/role/role.service';

interface Props {
  open: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

interface FormFields {
  userIds: string[];
}

const AddUserToRoleModal: React.FC<Props> = (props) => {
  const { open, onClose, onRefresh } = props;
  const { selectedRole } = useSelector(
    (state) => state.admin.userManagement.role,
  );
  const { userList, getUsersLoading } = useSelector(
    (state) => state.admin.userManagement.user,
  );
  const formFields = useMemo(
    (): FormField<FormFields>[] => [
      {
        name: 'userIds',
        type: 'select',
        required: true,
        label: 'Tên User',
        options: userList.map((r) => ({
          key: r.id,
          text: r.username,
          value: r.id,
        })),
        multiple: true,
      },
    ],
    [userList],
  );
  const { fetch, fetching } = useFetchApi();
  const handleSubmit = async (d: FormFields): Promise<void> => {
    if (selectedRole) {
      await fetch(roleService.addUsersToRole(d.userIds, selectedRole.id));
      onRefresh();
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>Thêm người dùng</Modal.Header>
      <Modal.Content>
        <SimpleForm
          formFields={formFields}
          loading={getUsersLoading || fetching}
          onSubmit={handleSubmit}
        />
      </Modal.Content>
    </Modal>
  );
};

export default AddUserToRoleModal;
