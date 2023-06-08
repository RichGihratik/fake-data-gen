import { observer } from 'mobx-react';
import { usersDataStore as store } from '@/stores';
import { columns } from './columns';
import DataTable from 'react-data-table-component';
import { InfiniteScroll } from '../InfiniteScroll';
import { useEffect, useState } from 'react';

export const UserTable = observer(() => {
  const { data } = store;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <DataTable
        customStyles={{
          responsiveWrapper: {
            style: {
              maxHeight: 'none',
            },
          },
        }}
        theme="dark"
        fixedHeader
        columns={columns}
        data={data.map((user, index) => ({ ...user, id: index + 1 }))}
      />
      <InfiniteScroll
        disabled={loading}
        onShow={() => {
          console.log('Call');
          store.fetchMore();
        }}
      />
    </>
  );
});
