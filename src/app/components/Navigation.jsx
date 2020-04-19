import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  return (
    <div>
      <Link to='/'>Main Board</Link>
      <Link to='/dashboard'>
        <h2>My Application</h2>
      </Link>
    </div>
  );
};

export default connect((state) => state)(Navigation);
