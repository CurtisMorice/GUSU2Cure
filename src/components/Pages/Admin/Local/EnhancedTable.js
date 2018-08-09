// import React from 'react';
// import { connect } from 'react-redux';
// import {compose} from 'redux';

// import { ADMIN_ACTIONS } from '../../../../redux/actions/adminActions';
// import classNames from 'classnames';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
// import TableRow from '@material-ui/core/TableRow';
// import TableSortLabel from '@material-ui/core/TableSortLabel';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';
// import IconButton from '@material-ui/core/IconButton';
// import Tooltip from '@material-ui/core/Tooltip';
// import DeleteIcon from '@material-ui/icons/Delete';
// import FilterListIcon from '@material-ui/icons/FilterList';
// import { lighten } from '@material-ui/core/styles/colorManipulator';

// const mapStateToProps = state => ({
//     adminReducer :state.adminReducer.newArticles,
// })

// let counter = 0;
// function createData(date_posted, research_title, research_type, research_phase, institution_name,
//   institution_url,founding_source, research_date,username, email) {
//   counter += 1;
//   return { id: counter, date_posted, research_title, research_type, research_phase, institution_name ,
//     institution_url,founding_source, research_date, username, email};
// }

// function getSorting(order, orderBy) {
//   return order === 'asc' ? (a, b) => b[orderBy] - a[orderBy] : (a, b) => a[orderBy] - b[orderBy];
// }
// //sets Header Data 
// const columnData = [
//   { id: 'date_posted', numeric: true, disablePadding: false, label: 'Date Posted' },
//   { id: 'research_title', numeric: true,  disablePadding: false, label: 'Research Title' },
//   { id: 'research_type', numeric: true, disablePadding: false, label: 'Research Type' },
//   { id: 'research_phase', numeric: true, disablePadding: false, label: 'Research Phase' },
//   { id: 'institution_name', numeric: true, disablePadding: false, label: 'Institution Name' },
//   { id: 'institution_url', numeric: true, disablePadding: false, label: 'Institution URL' },
//   { id: 'founding_source',numeric: true,  disablePadding: false, label: 'Founding Source' },
//   { id: 'research_date', numeric: true, disablePadding: false, label: 'Research Date' },
//   { id: 'username', numeric: true, disablePadding: false, label: 'User Name' },
//   { id: 'email',numeric: true,  disablePadding: false, label: 'Email' },
//   { id: 'approve', numeric: true, disablePadding: false, label: 'Approve' },
//   { id: 'reject', numeric: true, disablePadding: false, label: 'Reject' },
// ];

// class EnhancedTableHead extends React.Component {
 
//   createSortHandler = property => event => {
//     this.props.onRequestSort(event, property);
//   };

//   render() {
//     const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

//     return (
//       <TableHead>
//         <TableRow>
//           <TableCell padding="checkbox">
//             <Checkbox
//               indeterminate={numSelected > 0 && numSelected < rowCount}
//               checked={numSelected === rowCount}
//               onChange={onSelectAllClick}
//             />
//           </TableCell>
//           {columnData.map(column => {
//             return (
//               <TableCell
//                 key={column.id}
//                 numeric={column.numeric}
//                 padding={column.disablePadding ? 'none' : 'default'}
//                 sortDirection={orderBy === column.id ? order : false}
//               >
//                 <Tooltip
//                   title="Sort"
//                   placement={column.numeric ? 'bottom-end' : 'bottom-start'}
//                   enterDelay={300}
//                 >
//                   <TableSortLabel
//                     active={orderBy === column.id}
//                     direction={order}
//                     onClick={this.createSortHandler(column.id)}
//                   >
//                     {column.label}
//                   </TableSortLabel>
//                 </Tooltip>
//               </TableCell>
//             );
//           }, this)}
//         </TableRow>
//       </TableHead>
//     );
//   }
// }

// EnhancedTableHead.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.string.isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

// const toolbarStyles = theme => ({
//   root: {
//     paddingRight: theme.spacing.unit,
//   },
//   highlight:
//     theme.palette.type === 'light'
//       ? {
//           color: theme.palette.secondary.main,
//           backgroundColor: lighten(theme.palette.secondary.light, 0.50),
//         }
//       : {
//           color: theme.palette.text.primary,
//           backgroundColor: theme.palette.secondary.dark,
//         },
//   spacer: {
//     flex: '1 1 100%',
//   },
//   actions: {
//     color: theme.palette.text.secondary,
//   },
//   title: {
//     flex: '0 0 auto',
//   },
// });

// let EnhancedTableToolbar = props => {
//   const { numSelected, classes } = props;

//   return (
//     <Toolbar
//       className={classNames(classes.root, {
//         [classes.highlight]: numSelected > 0,
//       })}
//     >
//       <div className={classes.title}>
//         {numSelected > 0 ? (
//           <Typography color="inherit" variant="subheading">
//             {numSelected} selected
//           </Typography>
//         ) : (
//           <Typography variant="display3" id="tableTitle">
//             New Articles
//           </Typography>
//         )}
//       </div>
//       <div className={classes.spacer}/>
//       <div className={classes.actions}>
//         {numSelected > 0 ? (
//           <Tooltip title="Delete">
//             <IconButton aria-label="Delete">
//               <DeleteIcon />
//             </IconButton>
//           </Tooltip>
//         ) : (
//           <Tooltip title="Filter list">
//             <IconButton aria-label="Filter list">
//               <FilterListIcon />
//             </IconButton>
//           </Tooltip>
//         )}
//       </div>
//     </Toolbar>
//   );
// };

// EnhancedTableToolbar.propTypes = {
//   classes: PropTypes.object.isRequired,
//   numSelected: PropTypes.number.isRequired,
// };

// EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

// const styles = theme => ({
//   root: {
//     width: '100%',
//     marginTop: theme.spacing.unit * 3,
//   },
//   table: {
//     minWidth: 1020,
//   },
//   tableWrapper: {
//     overflowX: 'auto',
//   },
// });

// class EnhancedTable extends React.Component {
//   constructor(props) {
//     super(props);
      
//     this.state = {
//       order: 'asc',
//       orderBy: `'date_posted', 'research_title', 'research_type', 'research_phase', 'institution_name',
//       'institution_url','founding_source', 'research_date', 'username', 'email'`,
//       selected: [],
//       data: this.props.adminReducer,
//       page: 0,
//       rowsPerPage: 5,
//       approved: 2,
//       rejected: 3,
//       selected:[]
//     };
//   }
  
//   componentDidMount(){
//     this.fetchNewArticles();
//   };

//   fetchNewArticles = () => {
//     console.log('hello, is it me your looking for ');
//     this.props.dispatch({type: ADMIN_ACTIONS.FETCH_NEW_ARTICLE});
//   };

//   handleRequestSort = (event, property) => {
//     const orderBy = property;
//     let order = 'desc';

//     if (this.state.orderBy === property && this.state.order === 'desc') {
//       order = 'asc';
//     }

//     this.setState({ order, orderBy });
//   };

//   handleSelectAllClick = (event, checked) => {
//     if (checked) {
//       this.setState(state => ({ selected: state.data.map(n => n.id) }));
//       return;
//     }
//     this.setState({ selected: [] });
//   };

//   handleClick = (event, id) => {
//     const { selected } = this.state;
//     const selectedIndex = selected.indexOf(id);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, id);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1),
//       );
//     }

//     this.setState({ selected: newSelected });
//   };

//   handleChangePage = (event, page) => {
//     this.setState({ page });
//   };

//   handleChangeRowsPerPage = event => {
//     this.setState({ rowsPerPage: event.target.value });
//   };

//   isSelected = id => this.state.selected.indexOf(id) !== -1;

//   approveNewArticle = (id) => {   
//     let approved = this.state.approved
//     console.log('in approve click', approved);
//     let newObj = {approved: approved, id: id};
//     console.log('NEW', newObj)
//      const action =({
//          type: ADMIN_ACTIONS.APPROVED_ARTICLE,
//          payload: newObj
//      })
//      this.props.dispatch(action);
//      this.fetchNewArticles();
     
//  }
//  rejectNewArticle = (id) => {
//      console.log('rejectNewArticle ',action);
//      let rejected = this.state.rejected
//      console.log('in approve click');
//     let newObj = {rejected: rejected, id: id};
//     console.log('NEW', newObj)
//      const action =({
//          type: ADMIN_ACTIONS.REJECTED_ARTICLE,
//          payload: newObj
//      })
//      this.props.dispatch(action);
//      this.fetchNewArticles();
     
//  }

//   render() {
//     const { classes } = this.props;
//     const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
//     const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

//     return (
//       <Paper className={classes.root}>
//         <EnhancedTableToolbar numSelected={selected.length} />
//         <div className={classes.tableWrapper}>
//           <Table className={classes.table} aria-labelledby="tableTitle">
//             <EnhancedTableHead
//               numSelected={selected.length}
//               order={order}
//               orderBy={orderBy}
//               onSelectAllClick={this.handleSelectAllClick}
//               onRequestSort={this.handleRequestSort}
//               rowCount={data.length}
//               />
//             <TableBody>
//               {data
//                 .sort(getSorting(order, orderBy))
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map(n => {
//                   const isSelected = this.isSelected(n.id);
//                   return (
//                     <TableRow
//                       hover
//                       onClick={event => this.handleClick(event, n.id)}
//                       role="checkbox"
//                       aria-checked={isSelected}
//                       tabIndex={-1}
//                       key={n.id}
//                       selected={isSelected}
//                     >
//                       <TableCell padding="checkbox">
//                         <Checkbox checked={isSelected} />
//                       </TableCell>
//                       <TableCell component="th" scope="row" numeric>{n.date_posted}</TableCell>
//                       <TableCell component="th" scope="row" numeric>{n.research_title}</TableCell> 
//                       <TableCell component="th" scope="row" numeric>{n.type}</TableCell>
//                       <TableCell component="th" scope="row" numeric>{n.phase}</TableCell> 
//                       <TableCell component="th" scope="row" numeric>{n.institution_name}</TableCell>
//                       <TableCell component="th" scope="row" numeric>{n.institution_url}</TableCell>
//                       <TableCell component="th" scope="row" numeric>{n.funding_source}</TableCell>
//                       <TableCell component="th" scope="row" numeric>{n.research_date}</TableCell>
//                       <TableCell component="th" scope="row" numeric>{n.username}</TableCell>
//                       <TableCell component="th" scope="row" numeric>{n.email}</TableCell>
//                       <TableCell> 
//                         <Tooltip title="Approved">
//                          <IconButton aria-label="Approved" color="primary" onClick={()=>this.approveNewArticle(n.id)}>
//                           <i className="material-icons">
//                             thumb_up
//                           </i>
//                          </IconButton>
//                         </Tooltip> 
//                        </TableCell>
//                        <TableCell> 
//                          <Tooltip id="rejected" title="Rejected">
//                           <IconButton aria-label="Rejected" color="primary" value="2" onClick={()=>this.rejectNewArticle(n.id)}>
//                            <i className="material-icons" style={{color: "red"}}>
//                             thumb_down
//                            </i>
//                           </IconButton>
//                          </Tooltip>
//                         </TableCell>
//                         </TableRow>
//                       );
//                     })}
//                     {emptyRows > 0 && (
//                       <TableRow style={{ height: 56 * emptyRows }}>
//                         <TableCell colSpan={12} />
//                       </TableRow>
//                     )}
//             </TableBody>
//           </Table>
//         </div>
//         <TablePagination
//           component="div"
//           count={data.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           backIconButtonProps={{
//             'aria-label': 'Previous Page',
//           }}
//           nextIconButtonProps={{
//             'aria-label': 'Next Page',
//           }}
//           onChangePage={this.handleChangePage}
//           onChangeRowsPerPage={this.handleChangeRowsPerPage}/>
//       </Paper>
//     );
//   }
// }

// EnhancedTable.propTypes = {
//   classes: PropTypes.object.isRequired,
// };


// export default compose(withStyles(styles),connect(mapStateToProps))(EnhancedTable);