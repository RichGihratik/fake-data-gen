import { writeFile, utils } from 'xlsx';
import { type User } from './types';

export function downloadData(users: User[]) {
  const wb = utils.book_new();
  utils.book_append_sheet(wb, utils.json_to_sheet(users));
  writeFile(wb, 'fake_data.csv');
}
