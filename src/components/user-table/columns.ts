import { TableColumn } from 'react-data-table-component';
import { User, UserField } from '@/model';

interface UserWithId extends User {
  id: number;
}

export const columns = [
  {
    name: 'Id',
    selector: (item) => item.id,
    width: '70px',
  },
  {
    name: 'UUID',
    selector: (item) => item[UserField.Uuid],
  },
  {
    name: 'Email',
    selector: (item) => item[UserField.Email],
  },
  {
    name: 'Full name',
    selector: (item) => item[UserField.FullName],
  },
  {
    name: 'Address',
    selector: (item) => item[UserField.Address],
  },
] satisfies TableColumn<UserWithId>[];
