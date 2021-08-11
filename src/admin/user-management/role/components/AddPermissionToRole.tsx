import React, { useMemo } from 'react';
import { Modal } from 'semantic-ui-react';

import { useFetchApi, useSelector } from '@app/hooks';
import { FormField } from '@app/models/form-field';
import SimpleForm from '@app/components/simple-form';

import { Permission } from '@admin/user-management/permission/permission.model';
import permissionService from '@admin/user-management/permission/permission.service';
import {
  methodList,
  permissionTypeList,
} from '@admin/user-management/utils/helpers';

interface Props {
  open: boolean;
  onClose: () => void;
  onRefresh: () => void;
  isPermissionUI?: boolean;
  isPermissionResource?: boolean;
}

const AddPermissionToRoleModal: React.FC<Props> = (props) => {
  const {
    open,
    onClose,
    onRefresh,
    isPermissionUI,
    isPermissionResource,
  } = props;
  const { selectedRole } = useSelector(
    (state) => state.admin.userManagement.role,
  );
  const formFields = useMemo((): FormField<Permission>[] => {
    return [
      {
        name: 'name',
        label: 'Tên quyền',
      },
      {
        name: 'code',
        label: 'Mã',
        hidden: isPermissionResource,
      },
      {
        name: 'method',
        type: 'select',
        required: true,
        label: 'Giao thức',
        options: methodList.map((m) => ({
          text: m.text,
          value: m.value,
          label: {
            color: m.color,
            empty: true,
            circular: true,
          },
        })),
        hidden: isPermissionUI,
      },
      {
        name: 'url',
        label: 'Đường dẫn',
        hidden: isPermissionUI,
      },
      {
        name: 'permissionType',
        type: 'select',
        required: true,
        label: 'Loại quyền',
        options: permissionTypeList,
      },
      {
        name: 'description',
        label: 'Miêu tả',
      },
    ];
  }, [isPermissionResource, isPermissionUI]);
  const { fetch, fetching } = useFetchApi();
  const handleSubmit = async (d: Permission): Promise<void> => {
    if (selectedRole) {
      await fetch(
        permissionService.createPermission({
          permission: d,
          holderId: selectedRole.id,
          isRole: true,
          isPermissionUI,
          isPermissionResource,
        }),
      );
      onRefresh();
      onClose();
    }
  };

  const title = useMemo(() => {
    if (isPermissionUI) {
      return 'Thêm quyền UI';
    }
    if (isPermissionResource) {
      return 'Thêm quyền API';
    }
    return '';
  }, [isPermissionUI, isPermissionResource]);
  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        <SimpleForm
          formFields={formFields}
          loading={fetching}
          onSubmit={handleSubmit}
        />
      </Modal.Content>
    </Modal>
  );
};

export default AddPermissionToRoleModal;
