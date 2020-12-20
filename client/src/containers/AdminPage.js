import React from 'react';
import { connect } from 'react-redux';

const AdminPage = ({ currentUser }) => {
  return (
    <div>
      <h3>
        Hello {currentUser ? currentUser.name : JSON.stringify(currentUser)}!
        Sadly, nothing here yet.
      </h3>
    </div>
  );
};

export default connect(state => ({
  currentUser: state.auth.user
}))(AdminPage);
