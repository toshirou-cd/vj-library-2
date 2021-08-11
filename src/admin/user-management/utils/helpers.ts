import { deburr } from '@app/utils/helpers';
import { PermissionType, PermissionDataType } from './constants';

interface Option {
  value: string;
  text: string;
}

const permissionTypeList = [
  { value: PermissionType.ALLOW, text: 'Cho phép' },
  { value: PermissionType.DENY, text: 'Từ chối' },
];

const permissionDataTypeList = [
  { value: PermissionDataType.READ, text: 'Đọc' },
  { value: PermissionDataType.WRITE, text: 'Ghi' },
];

const methodList = [
  { value: 'GET', text: 'GET', color: 'blue' },
  { value: 'POST', text: 'POST', color: 'green' },
  { value: 'PUT', text: 'PUT', color: 'yellow' },
  { value: 'DELETE', text: 'DELETE', color: 'red' },
];

const searchWithDeburr = (options: Option[], query: string) => {
  return (options || []).filter((option: Option) =>
    deburr(option?.text ?? '').includes(deburr(query)),
  );
};

export {
  permissionTypeList,
  permissionDataTypeList,
  methodList,
  searchWithDeburr,
};
