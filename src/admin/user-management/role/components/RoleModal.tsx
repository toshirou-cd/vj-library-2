import React, { useMemo } from 'react';
import { Modal } from 'semantic-ui-react';

import SimpleForm from '@app/components/simple-form';
import { FormField } from '@app/models/form-field';
import { useFetchApi, useSelector } from '@app/hooks';

import { Role } from '@admin/user-management/role/role.model';
import roleService from '@admin/user-management/role/role.service';

interface Props {
  open: boolean;
  onClose: () => void;
  onRefresh: () => void;
  data?: Role;
}
const RoleModal: React.FC<Props> = (props) => {
  const { open, onClose, onRefresh, data } = props;
  const { fetch, fetching } = useFetchApi();
  const { getRolesLoading } = useSelector(
    (state) => state.admin.userManagement.role,
  );
  const formFields = useMemo(
    (): FormField<Role>[] => [
      {
        name: 'id',
        hidden: true,
      },
      {
        name: 'name',
        label: 'Tên role',
      },
      {
        name: 'description',
        label: 'Miêu tả',
      },
    ],
    [],
  );

  const handleSubmit = async (d: Role): Promise<void> => {
    await fetch(d.id ? roleService.updateRole(d) : roleService.createRole(d));
    onRefresh();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>
        {data ? 'Sửa ' : 'Tạo '}
        vai trò
      </Modal.Header>
      <Modal.Content>
        <SimpleForm
          defaultValues={data}
          loading={fetching || getRolesLoading}
          formFields={formFields}
          onSubmit={handleSubmit}
        />
      </Modal.Content>
    </Modal>
  );
};

export default RoleModal;
