import React, { useMemo } from 'react';
import { Modal } from 'semantic-ui-react';

import { useFetchApi, useSelector } from '@app/hooks';
import { FormField } from '@app/models/form-field';
import SimpleForm from '@app/components/simple-form';

import groupService from '@admin/user-management/group/group.service';

interface Props {
  isRole?: boolean;
  open: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

interface FormFields {
  ids: string[];
  userIds: string[];
}

const AddUserRoleToGroupModal: React.FC<Props> = (props) => {
  const { open, onClose, onRefresh, isRole } = props;
  const {
    selectedGroup,
    getRolesOfGroupLoading,
    getUsersOfGroupLoading,
  } = useSelector((state) => state.admin.userManagement.group);
  const { roleList, getRolesLoading } = useSelector(
    (state) => state.admin.userManagement.role,
  );
  const { userList, getUsersLoading } = useSelector(
    (state) => state.admin.userManagement.user,
  );
  const formFields = useMemo(
    (): FormField<FormFields>[] => [
      {
        name: 'ids',
        type: 'select',
        required: true,
        label: 'Tên vai trò',
        options: roleList.map((r) => ({
          key: r.id,
          text: r.name,
          value: r.id,
        })),
        multiple: true,
        hidden: !isRole,
      },
      {
        name: 'userIds',
        type: 'select',
        required: true,
        label: 'Tên người dùng',
        options: userList.map((r) => ({
          key: r.id,
          text: r.username,
          value: r.id,
        })),
        multiple: true,
        hidden: isRole,
      },
    ],
    [isRole, userList, roleList],
  );
  const { fetch, fetching } = useFetchApi();
  const handleSubmit = async (d: FormFields): Promise<void> => {
    if (selectedGroup) {
      await fetch(
        isRole
          ? groupService.addRolesToGroup(d.ids, selectedGroup.id)
          : groupService.addUsersToGroup(d.userIds, selectedGroup.id),
      );
      onRefresh();
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>{`Thêm ${isRole ? 'vai trò' : 'người dùng'}`}</Modal.Header>
      <Modal.Content>
        <SimpleForm
          formFields={formFields}
          loading={
            getUsersLoading ||
            getRolesLoading ||
            getUsersOfGroupLoading ||
            getRolesOfGroupLoading ||
            fetching
          }
          onSubmit={handleSubmit}
        />
      </Modal.Content>
    </Modal>
  );
};

export default AddUserRoleToGroupModal;
