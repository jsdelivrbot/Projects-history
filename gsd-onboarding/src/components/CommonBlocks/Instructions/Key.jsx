import React from 'react';
import Paper from 'material-ui/Paper';

export const Key = () => {
  const style = {
    padding: 20,
  };
  return (
  	<div className="table-instruction key-instructions">
      <Paper zDepth={1} style={style}>
        <h6>Key</h6>
        <p>User Defined</p>
        <p>Dropdown</p>
        <div className="coloured-boxes">
          <div></div>
          <div></div>
        </div>
      </Paper>
    </div>
  );
};



