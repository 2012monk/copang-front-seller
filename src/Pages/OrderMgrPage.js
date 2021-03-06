import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import axios from "axios";
import { USER_SERVER } from "../Pages/Config.js";
import { getOrderList } from "../_actions/seller_actions.js";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

// {
//     "message" : "success",
//     "data" : [ {
//       "sellerOrderId" : 3,
//       "client" : {
//         "clientId" : 5,
//         "phone" : "010-9090-9090",
//         "realName" : "길동홍"
//       },
//       "orderItems" : [ {
//         "itemId" : 1,
//         "itemDetailId" : 0,
//         "amount" : 2,
//         "mainImg" : "no image",
//         "itemName" : "감자",
//         "optionName" : "중량",
//         "optionValue" : "0KG",
//         "price" : 2000,
//         "unitTotal" : 4000
//       }, {
//         "itemId" : 1,
//         "itemDetailId" : 1,
//         "amount" : 2,
//         "mainImg" : "no image",
//         "itemName" : "감자",
//         "optionName" : "중량",
//         "optionValue" : "1KG",
//         "price" : 2000,
//         "unitTotal" : 4000
//       } ],
//       "address" : {
//         "addressId" : 1,
//         "address" : "서울",
//         "detail" : "철원 1번지",
//         "receiverName" : "제가 받는사람이에요",
//         "receiverPhone" : "010-8989-9898",
//         "preRequest" : "빨리요제발"
//       },
//       "orderDate" : "2021/07/08-08:50",
//       "totalPrice" : 8000,
//       "totalAmount" : 4
//     } ],
//     "code" : 200
//   }
function createData(
  orderId,
  orderDate,
  name,
  optionName,
  optionValue,
  price,
  amount,
  total,
  address
) {
  return {
    orderId,
    orderDate,
    name,
    optionName,
    optionValue,
    price,
    amount,
    total,
    address,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "orderId", numeric: false, disablePadding: true, label: "주문번호" },
  { id: "orderDate", numeric: false, disablePadding: true, label: "주문일시" },
  { id: "name", numeric: false, disablePadding: true, label: "제품" },
  { id: "optionName", numeric: true, disablePadding: false, label: "옵션명" },
  { id: "optionValue", numeric: true, disablePadding: false, label: "옵션값" },
  { id: "price", numeric: true, disablePadding: false, label: "가격" },
  { id: "amount", numeric: true, disablePadding: false, label: "수량" },
  { id: "total", numeric: true, disablePadding: false, label: "총액" },
  { id: "address", numeric: true, disablePadding: false, label: "주소" },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "center" }
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          주문조회
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable() {
  ///////////////////////////////////// 형준 수정 부분 /////////////////////////////////////////

  const [trackingNumber, setTrackingNumber] = useState("640865871414");
  const [logisticCode, setLogisticCode] = useState("CJGLS");
  const [orderItemId, setOrderItemId] = useState(0);
  //   const trackingHandler = (e) => {
  //     setTrackingNumber(e.target.value);
  //   };

  const SubmitShipmentHandler = async (orderId) => {
    setOrderItemId(orderId);
    const dataToSubmit = [
      {
        orderItemId: orderId,
        trackingNumber: trackingNumber,
        logisticCode: logisticCode,
      },
    ];
    console.log(typeof dataToSubmit);
    await axios.post("https://alconn.co/api/orders/shipments", dataToSubmit);
    handleClose();
  };

  const [open, setOpen] = useState(-1);

  const handleClickOpen = (index) => {
    setOpen(index);
  };

  const handleClose = () => {
    setOpen(-1);
  };
  ///////////////////////////////////// 형준 수정 부분 /////////////////////////////////////////
  let rowarray = [];
  // let rows = [createData("노트북", "ram", "8gb", 100000, 3, 400000, "성남시")];
  // rows.push(createData("노트북", "ram", "32gb", 100000, 3, 400000, "서울시"));
  const classes = useStyles();
  const [rows, setRows] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("option");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const getOrderList = async () => {
    console.log("getOrderList Called");
    const request = await axios.get(`${USER_SERVER}/orders/seller`);
    const data = await request.data.data;

    console.log(data);
    // function createData(name, option, optionValue, price, amount, total) {
    //     return { name, option, optionValue, price, amount, total };
    // }

    data.map((row, index) => {
      console.log("data map");
      console.log(row);
      // console.log(row.orderItems);
      console.log(row.sellerOrderId);
      rowarray.push(
        createData(
          row.orderItems[0].orderItemId,
          row.orderDate,
          row.orderItems[0].itemName,
          row.orderItems[0].optionName,
          row.orderItems[0].optionValue,
          row.orderItems[0].price,
          row.totalAmount,
          row.totalPrice,
          row.address.address
        )
      );

      console.log(rowarray);
    });

    setRows(rowarray);
  };
  useEffect(() => {
    getOrderList();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, orderId) => {
    const selectedIndex = selected.indexOf(orderId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, orderId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, { rows }.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  console.log("table map start!");
                  console.log(row);
                  const isItemSelected = isSelected(row.orderId);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.orderId}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, row.orderId)}
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.orderId}
                      </TableCell>
                      <TableCell align="right">{row.orderDate}</TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.optionName}</TableCell>
                      <TableCell align="right">{row.optionValue}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">{row.amount}</TableCell>
                      <TableCell align="right">{row.total}</TableCell>
                      <TableCell align="right">{row.address}</TableCell>
                      <TableCell align="right">
                        <button
                          className="btn btn-primary"
                          key={row.orderId}
                          onClick={() => {
                            handleClickOpen(index);
                          }}
                        >
                          송장 보내기
                        </button>
                      </TableCell>
                      {/* =============================== 송장보내기 모달 띠우기 =============================== */}
                      <Dialog
                        open={open == index}
                        onClose={handleClose}
                        aria-labelledby="form-dialog-title"
                      >
                        <DialogTitle id="form-dialog-title">
                          Send Tracking Information
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            송장을 보내려면 상품 아이디 번호, 송장번호, 택배사
                            코드 순으로 입력하세요
                          </DialogContentText>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="orderItemId"
                            type="text"
                            fullWidth
                            value={row.orderId}
                          />
                          <TextField
                            autoFocus
                            margin="dense"
                            id="trackingNumber"
                            type="text"
                            fullWidth
                            value={trackingNumber}
                          />
                          <TextField
                            autoFocus
                            margin="dense"
                            id="logisticCode"
                            type="text"
                            fullWidth
                            value={logisticCode}
                          />
                        </DialogContent>
                        <DialogActions>
                          <button
                            onClick={handleClose}
                            className="btn btn-danger"
                            style={{ width: "110px" }}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              SubmitShipmentHandler(row.orderId);
                            }}
                            className="btn btn-primary"
                            style={{ width: "110px" }}
                          >
                            Send
                          </button>
                        </DialogActions>
                      </Dialog>
                      {/* =============================== 송장보내기 모달 띠우기 =============================== */}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            /> */}
    </div>
  );
}
