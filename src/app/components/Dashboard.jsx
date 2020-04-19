import React from 'react';
import { connect } from 'react-redux';
import TaskList from './TaskList';

export const Dashboard = ({ groups }) => {
  return (
    <div>
      <h2> here is Dashboard</h2>

      {groups.map((group, index) => {
        return <TaskList key={index} id={group.id} name={group.name} />;
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    groups: state.groups,
  };
};

export default connect(mapStateToProps)(Dashboard);
