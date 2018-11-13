import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 1,
    maxWidth: theme.spacing.unit * 100,
    overflowX: 'auto',
  },
  table: {
    overflowX: 'auto',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  tableCell: {
    maxWidth: theme.spacing.unit * 10
  }
});

function formatMoney(n, c, d, t) {
  var c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;

  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + "";
};

function TableSheet(props) {
  const { classes, data } = props;

  return (
    <div className={classes.root}>
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                <TableCell numeric className={classes.tableCell}>Amount</TableCell>
                <TableCell numeric className={classes.tableCell}>Total</TableCell>
                <TableCell numeric className={classes.tableCell}>Approved</TableCell>
                <TableCell numeric className={classes.tableCell}>Waiting</TableCell>
                <TableCell numeric className={classes.tableCell}>Rejected</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                <TableRow key={data.id}>
                <TableCell component="th" scope="row" className={classes.tableCell}>
                    ${formatMoney(data.amount, 2)}
                </TableCell>
                <TableCell numeric className={classes.tableCell}>{data.approved}</TableCell>
                <TableCell numeric className={classes.tableCell}>{data.total}</TableCell>
                <TableCell numeric className={classes.tableCell}>{data.waiting}</TableCell>
                <TableCell numeric className={classes.tableCell}>{data.rejected}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
  );
}

TableSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TableSheet);
