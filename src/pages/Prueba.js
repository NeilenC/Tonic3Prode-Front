import { Paper } from '@mui/material';
import Image from 'next/image';

const Prueba = () => {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <div style={{ position: 'relative' }}>
        <Paper style={{ zIndex: 1, maxWidth: 500 }}>Metrics</Paper>
      </div>
    </div>
  );
};

export default Prueba;