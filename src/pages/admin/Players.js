import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { players } from '@/fakeData/players'

const Players = () => {

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>LastName</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>BirthDay</TableCell>
            <TableCell>Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player, index) => (
            <TableRow key={index}>
              <TableCell>{player.nombre}</TableCell>
              <TableCell>{player.apellido}</TableCell>
              <TableCell>{player.equipo}</TableCell>
              <TableCell>{player.fechaNacimiento}</TableCell>
              <TableCell>
                <img src={player.imagen} alt={`${player.nombre} ${player.apellido}`} style={{ width: '50px', height: '50px' }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Players