import DataTable from '@app/components/data-table';
import { Column } from '@app/components/data-table/types';
import React from 'react';
import request from '@app/assets/mock/requests.json';
import { Request } from '@app/models/request';
import './OngoingRequest.less';

const OngoingRequest: React.FC = () => {

  const tableColumns = React.useMemo(
    (): Column<Request>[] => [
      {
        header: 'ID',
        accessor: 'id',
      },
      {
        header: 'Received At',
        accessor: 'receivedAt',
      },
      {
        header: 'From',
        accessor: 'from',
      },
      {
        header: 'Reason',
        accessor: 'reason',
      },
      {
        header: 'Status',
        accessor: 'status'
      }
    ],
    []
  );
  
  const tableData = React.useMemo(
    (): Request[] => request.map((r) => ({
      id: r.id,
      receivedAt: r.receivedAt,
      from: r.from,
      reason: r.reason,
      status: r.status,
    })),
    []
  );

  return (
    <React.Fragment>
      <div className="table-title">
        Ongoing Request
      </div>
      <DataTable
        columns={tableColumns}
        data={tableData}
        striped
        search
      />
    </React.Fragment>
  );
};

export default OngoingRequest;