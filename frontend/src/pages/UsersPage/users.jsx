import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Modal from "@mui/material/Modal";
import "./users.css";
import PopAddUser from "../../components/addusers/addusers";

import APIdataUsers from "../../services/API/user.api";
import AppHeader from "../../components/header/app-header";
const USERS_URL = "/users";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 0,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const UsersPage = () => {
  const [users, setUsers] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  APIdataUsers(setUsers, USERS_URL, setLoading);

  return (
    <>
      <AppHeader />

      <div className="title">
        <div className="row">
          <h2 className="col">
            Users <b>Management</b>
          </h2>
          <div className="col wrapper">
            <i
              className="add_users"
              title="ADD USERS"
              data-toggle="tooltip"
              onClick={handleOpen}
            >
              <i className="material-icons">add_circle</i>
            </i>
            <i
              className="exp_xcel"
              title="Export to Excel"
              data-toggle="tooltip"
            >
              <i className="material-icons">insert_drive_file</i>
            </i>
          </div>
        </div>
      </div>
      <div className="table">
        <TableContainer>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">#</StyledTableCell>
                <StyledTableCell align="left">FIRST NAME</StyledTableCell>
                <StyledTableCell align="left">LAST NAME</StyledTableCell>
                <StyledTableCell align="center">USERNAME</StyledTableCell>
                <StyledTableCell align="center">ROLE</StyledTableCell>
                <StyledTableCell align="center">STATUS</StyledTableCell>
                <StyledTableCell align="center">CREATED DATE</StyledTableCell>
                <StyledTableCell align="center">ACTION</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <StyledTableCell colSpan={8} align="center">
                    Loading...
                  </StyledTableCell>
                </TableRow>
              ) : (
                users.map((users, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="center">
                      <h5>{index + 1}</h5>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <h6>{users.f_name}</h6>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <h6>{users.l_name}</h6>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <h6>{users.username}</h6>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <h6>{users.role === 0 ? <b>Admin</b> : "Users"}</h6>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {users.status === 1 ? (
                        <span className="status text-success">&#8226;</span>
                      ) : (
                        <span className="status text-danger">&#8226;</span>
                      )}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <h6>{users.date}</h6>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <i
                        className="edit"
                        title="Edit Users"
                        data-toggle="tooltip"
                      >
                        <i className="material-icons">edit</i>
                      </i>
                      <i
                        className="delete"
                        title="Delete Users"
                        data-toggle="tooltip"
                      >
                        <i className="material-icons">delete</i>
                      </i>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className="modal">
          <PopAddUser /> {/* Render the PopAddUser component here */}
          {/* <h2>Add User</h2> Remove or move this line */}
        </div>
      </Modal>
    </>
  );
};

export default UsersPage;
