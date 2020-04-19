import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import * as mutations from '../store/mutations';

const TaskList = (props) => {
  const { tasks, name, id, requestTaskCreation } = props
  const createNewTask = () => {
    requestTaskCreation(id);
  };
  return (
    <div style={{ backgroundColor: "lightblue" }}>
      <h3>{name}</h3>
      <div>
        {tasks.map(task => (
          <Link to={`/task/${task.id}`} key={task.id}><div >{task.name}</div> </Link>
        ))}
        <button onClick={() => createNewTask(id)}>Add</button>
        <hr />
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  let groupID = ownProps.id;

  return {
    name: ownProps.name,
    id: groupID,
    tasks: state.tasks.filter((task) => task.group === groupID),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    requestTaskCreation: (taskID) => dispatch(mutations.requestTaskCreation(taskID)),
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
