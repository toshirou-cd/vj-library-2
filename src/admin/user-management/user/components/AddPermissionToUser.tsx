import React, { useEffect, useMemo } from 'react';
import { Modal } from 'semantic-ui-react';

import { useFetchApi, useDispatch, useSelector } from '@app/hooks';
import { FormField } from '@app/models/form-field';
import SimpleForm from '@app/components/simple-form';

import permissionService from '@admin/user-management/permission/permission.service';
import {
  methodList,
  permissionDataTypeList,
  permissionTypeList,
} from '@admin/user-management/utils/helpers';

interface Props {
  open: boolean;
  onClose: () => void;
  onRefresh: () => void;
  isPermissionUI?: boolean;
  isPermissionResource?: boolean;
  isPermissionData?: boolean;
}
interface Permission {
  name?: string;
  description?: string;
  // Permission UI
  code?: string;
  // Permision API
  url?: string;
  method?: string;
  permissionType?: number;
  // Permission Data
  username?: string;
  provinceId?: string;
  indicatorId?: string;
  type?: number;
}

const AddPermissionToUserModal: React.FC<Props> = (props) => {
  const {
    open,
    onClose,
    onRefresh,
    isPermissionUI,
    isPermissionResource,
    isPermissionData,
  } = props;
  const { selectedUser } = useSelector(
    (state) => state.admin.userManagement.user,
  );

  const dispatch = useDispatch();
  const { fetch, fetching } = useFetchApi();

  const formFields = useMemo((): FormField<Permission>[] => {
    return [
      {
        name: 'name',
        required: true,
        label: 'Tên quyền',
        hidden: isPermissionData,
      },
      {
        name: 'code',
        required: true,
        label: 'Code',
        hidden: isPermissionResource || isPermissionData,
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
        hidden: isPermissionUI || isPermissionData,
      },
      {
        name: 'url',
        label: 'Đường dẫn',
        hidden: isPermissionUI || isPermissionData,
      },
      {
        name: 'permissionType',
        type: 'select',
        required: true,
        label: 'Loại quyền',
        options: permissionTypeList,
        hidden: isPermissionData,
      },
      {
        name: 'type',
        type: 'select',
        required: true,
        label: 'Loại quyền',
        options: permissionDataTypeList,
        hidden: isPermissionUI || isPermissionResource,
      },
      {
        name: 'description',
        label: 'Miêu tả',
        hidden: isPermissionData,
      },
    ];
  }, [
    isPermissionData,
    isPermissionResource,
    isPermissionUI,
  ]);

  const handleSubmit = async (d: Permission): Promise<void> => {
    if (selectedUser) {
      await fetch(
        permissionService.createPermission({
          permission: isPermissionData
            ? { ...d, username: selectedUser?.username ?? '' }
            : d,
          holderId: selectedUser.id,
          isUser: true,
          isPermissionUI,
          isPermissionResource,
          isPermissionData,
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
    if (isPermissionData) {
      return 'Thêm quyền Data';
    }
    return '';
  }, [isPermissionUI, isPermissionResource, isPermissionData]);

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

export default AddPermissionToUserModal;
