import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Typography } from "@mui/material";

const CustomTable = (props) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#CAF4FF",
      color: "black",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  return (
    <>
      <TableContainer className="table-container" component={Paper}>
        <Table sx={{ minWidth: 650, mx: "auto" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">
                <Typography style={{ fontWeight: "bold" }} variant="h6">
                  First Name
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography style={{ fontWeight: "bold" }} variant="h6">
                  Last Name
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography style={{ fontWeight: "bold" }} variant="h6">
                  Email
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography style={{ fontWeight: "bold" }} variant="h6">
                  Feedback
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography style={{ fontWeight: "bold" }} variant="h6">
                  Actions
                </Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  <Typography variant="body2">{row.firstName}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{row.lastName}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">{row.email}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">
                    {row.feedback}
                  </Typography>
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    aria-label="edit"
                    color="primary"
                    onClick={() => props.updateIdHandler(row._id)}
                  >
                    <BorderColorIcon />
                  </IconButton>

                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => props.deleteHandler(row._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CustomTable;
