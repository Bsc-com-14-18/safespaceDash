import { useState, useEffect, useContext } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../../pages/auth/auth';
import db from '../../firebase';
import { auth } from '../../firebase';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.MuiTableCell-head': {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  '&.MuiTableCell-body': {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const [caseType, setCaseType] = useState('');
  
  const [matchingCases, setMatchingCases] = useState([]);
  console.log(matchingCases);

  useEffect(() => {
    const fetchHandlerCaseType = async () => {
      try {
        const handlerId = auth.currentUser.uid;

        const q = query(collection(db, 'hanlderCaseType'), where('handlerId', '==', handlerId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log('No matching documents.');
          return;
        }
        const handlerCaseType = querySnapshot.docs[0].data().caseTypeId;
        setCaseType(handlerCaseType);

      // Retrieve cases with matching caseTypeId, assignedTo, and other conditions
      const casesQuery = query(collection(db, 'cases'), 
        where('type', '==', caseType.trim())
        // Add more conditions if needed
      );

      const casesSnapshot = await getDocs(casesQuery);
      const cases = casesSnapshot.docs.map(doc => doc.data());
      setMatchingCases(cases);
      console.log('Cases:', cases);
      } catch (error) {
        console.error('Error fetching handler case type:', error);
      }
    }; 

    fetchHandlerCaseType();
  }, []);


  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 70 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {/* <StyledTableCell>Name</StyledTableCell> */}
            <StyledTableCell align="right">Description</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {matchingCases.map((caseItem) => (
            <StyledTableRow key={caseItem.client_id}>
              {/* <StyledTableCell component="th" scope="row">
                {caseItem.name}
              </StyledTableCell> */}
              <StyledTableCell align="right">{caseItem.description}</StyledTableCell>
              <StyledTableCell align="right">{caseItem.status}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
