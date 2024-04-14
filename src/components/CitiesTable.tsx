import React from 'react';
import Table from './Table';
import { Box } from '@mui/material';

const CitiesTable: React.FC = () => {
  return (
    <Box sx={{ backgroundImage: 'linear-gradient(to bottom, white,lightblue)',
    minHeight: '100vh',
    }}>
      <Box 
      sx={{display:'flex',
         justifyContent:'center',
         fontSize:'50px',
         padding:'10px',
         margin:'20px',
          }}>
        City Table 
      </Box>
      <Table />
    </Box>
  );
};

export default CitiesTable;
