import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Modal from "@mui/material/Modal";
import style from "./users.module.css";
import PopAddUser from "../../../components/addusers/addusers";
import ExportFile from "../../../services/fileExport";

import APIdataUsers from "../../../services/API/user.api";
import AppHeader from "../../../components/header/app-header";
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
  const [filterFirstName, setFilterFirstName] = React.useState("");
  const [filterLastName, setFilterLastName] = React.useState("");
  const [filterUsername, setFilterUsername] = React.useState("");
  const [filterRole, setFilterRole] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState("");
  const [filterCreatedDate, setFilterCreatedDate] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Define filteredUsers based on filterFirstName and users state
  const filteredUsers = users.filter((user) => {
    const firstNameMatch = user.f_name
      .toLowerCase()
      .includes(filterFirstName.toLowerCase());
    const lastNameMatch = user.l_name
      .toLowerCase()
      .includes(filterLastName.toLowerCase());
    const usernameMatch = user.username
      .toLowerCase()
      .includes(filterUsername.toLowerCase());
    const roleMatch = filterRole === "" || user.role.toString() === filterRole;
    const statusMatch =
      filterStatus === "" || user.status.toString() === filterStatus;

    return (
      firstNameMatch &&
      lastNameMatch &&
      usernameMatch &&
      roleMatch &&
      statusMatch
    );
  });

  APIdataUsers(setUsers, USERS_URL, setLoading);

  return (
    <>
      <AppHeader />

      <div className={style.title}>
        <div className="row">
          <h2 className="col">
            Users <b>Management</b>
          </h2>
        </div>
      </div>
      

      <div className={style.table}>
        <TableContainer>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">#</StyledTableCell>
                <StyledTableCell align="left">
                  FIRST NAME
                  <br />
                  <input
                    style={{ width: "100px" }}
                    type="text"
                    title="Filter by Firstname"
                    value={filterFirstName}
                    onChange={(e) => setFilterFirstName(e.target.value)}
                  />
                </StyledTableCell>
                <StyledTableCell align="left">
                  LAST NAME
                  <br />
                  <input
                    style={{ width: "100px" }}
                    type="text"
                    title="Filter by Lastname"
                    value={filterLastName}
                    onChange={(e) => setFilterLastName(e.target.value)}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  USERNAME
                  <br />
                  <input
                    style={{ width: "100px" }}
                    type="text"
                    title="Filter by Username"
                    value={filterUsername}
                    onChange={(e) => setFilterUsername(e.target.value)}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  ROLE
                  <br />
                  <input
                    style={{ width: "100px" }}
                    type="text"
                    title="(0 = Admin , 1 = Users)"
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  STATUS
                  <br />
                  <input
                    style={{ width: "100px" }}
                    type="text"
                    title="(0 = Deactive , 1 = Active)"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">CREATED DATE</StyledTableCell>
                <StyledTableCell align="center">
                <i
              className={style.add_users}
              title="ADD USERS"
              data-toggle="tooltip"
              onClick={handleOpen}
            >
              <i className="material-icons">add_circle</i>
            </i>
            <ExportFile
              excelData={users}
              fileName="Users"
              classIcon={style.exp_xcel}
            ></ExportFile>

                </StyledTableCell>
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
                filteredUsers.map((user, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="center">
                      <h5>{index + 1}</h5>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <h6>{user.f_name}</h6>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <h6>{user.l_name}</h6>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <h6>{user.username}</h6>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <h6>{user.role === 0 ? <b>{"Admin"}</b> : "Users"}</h6>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <h6>
                        {user.status === 1 ? (
                          <span
                            className={`${style.status} ${style.textsuccess}`}
                          >
                            &bull;
                          </span>
                        ) : (
                          <span
                            className={`${style.status} ${style.textdanger}`}
                          >
                            &bull;
                          </span>
                        )}
                      </h6>
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <h6>{user.date}</h6>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <i
                        className={style.edit}
                        title="Edit Users"
                        data-toggle="tooltip"
                      >
                        <i className="material-icons">edit</i>
                      </i>
                      <i
                        className={style.delete}
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
        <div className={style.modal}>
          <PopAddUser />
        </div>
      </Modal>
    </>
  );
};

export default UsersPage;
