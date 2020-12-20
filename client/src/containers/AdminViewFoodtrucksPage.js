import React from 'react';
import { connect } from 'react-redux';

import { getAll, deleteOne } from './../actions/handlerFactory';

import AdminCustomTable from './../components/Tables/AdminCustomTable';

const AdminViewFoodtrucksPage = ({
  apiDatas,
  apiError,
  getAll,
  deleteOne,
  loadingFoodtruckApi
}) => {
  React.useEffect(() => {
    getAll('foodtrucks');
  }, [getAll]);

  const handleDelete = id => deleteOne('foodtrucks', id);

  return (
    <div>
      {!apiDatas ? (
        <h3>There are not Foodtrucks yet. Add one!</h3>
      ) : (
        <AdminCustomTable
          thValues={['ID', 'Name', 'Delete', 'View']}
          trValues={['_id', 'name']}
          handleDelete={handleDelete}
          viewPath="foodtrucks"
          loadingApi={loadingFoodtruckApi}
          apiDatas={apiDatas}
        />
      )}
    </div>
  );
};

export default connect(
  state => ({
    apiDatas: state.apiFoodtruck.datas,
    apiError: state.apiError.error,
    loadingFoodtruckApi: state.apiFoodtruck.isLoading
  }),
  { getAll, deleteOne }
)(AdminViewFoodtrucksPage);
