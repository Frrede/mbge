import React from 'react';
import { Box } from '@material-ui/core';
import { GamePage } from './components/GamePage';

function App() {

  return (
    <Box p={4} height="100%" overflow="auto" bgcolor="primary.main">
      <GamePage/>
    </Box>
  );
}

export default App;
