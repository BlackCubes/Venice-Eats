import React from 'react';
import { connect } from 'react-redux';
import { Table, Row, Col, Button, Spinner } from 'react-bootstrap';

import { getAll, deleteOne } from './../actions/handlerFactory';

import AdminCustomTable from './../components/Table/AdminCustomTable';

const AdminPage = ({
  apiDatas,
  apiError,
  getAll,
  deleteOne,
  loadingUserApi
}) => {
  React.useEffect(() => {
    getAll('admins');
  }, [getAll]);

  const handleDelete = id => deleteOne('admin', id);

  return (
    <AdminCustomTable
      thValues={['ID', 'Name', 'Email', 'Role']}
      trValues={['_id', 'name', 'email', 'role']}
      loadingApi={loadingUserApi}
      apiDatas={apiDatas}
    />
  );
};

export default connect(
  state => ({
    apiDatas: state.apiUser.datas,
    apiError: state.apiUser.error,
    loadingUserApi: state.apiUser.isLoading
  }),
  { getAll, deleteOne }
)(AdminPage);
