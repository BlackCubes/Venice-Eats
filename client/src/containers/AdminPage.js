import React from 'react';
import { connect } from 'react-redux';

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

  const handleDelete = id => deleteOne('admins', id);

  return (
    <div>
      <AdminCustomTable
        thValues={['ID', 'Name', 'Email', 'Role', 'Delete', 'View']}
        trValues={['_id', 'name', 'email', 'role']}
        handleDelete={handleDelete}
        viewPath="users"
        loadingApi={loadingUserApi}
        apiDatas={apiDatas}
      />
    </div>
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
