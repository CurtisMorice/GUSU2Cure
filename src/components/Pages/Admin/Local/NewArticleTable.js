import React from 'react';
import { connect } from 'react-redux';
import {compose} from 'redux';

import { ADMIN_ACTIONS } from '../../../../redux/actions/adminActions';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//table imports
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';


const mapStateToProps = state => ({
    adminReducer :state.adminReducer.newArticles,
})

const actionsStyles = theme => ({
    root: {
      flexShrink: 0,
      color: theme.palette.text.secondary,
      marginLeft: theme.spacing.unit * 2.5,
    },
  });

class NewArticleTable extends React.Component{
  
    handleFirstPageButtonClick = event => {
        this.props.onChangePage(event, 0);
      };

    componentDidMount(){
            this.fetchNewArticles();
    };

    fetchNewArticles = () => {
            console.log('hello, is it me your looking for ');
            this.props.dispatch({type: ADMIN_ACTIONS.FETCH_NEW_ARTICLE});
    };

    handleBackButtonClick = event => {
        this.props.onChangePage(event, this.props.page - 1);
    };

    handleNextButtonClick = event => {
        this.props.onChangePage(event, this.props.page + 1);
    };

    handleLastPageButtonClick = event => {
        this.props.onChangePage(
        event,
        Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
        );
    };


    render(){
        const { classes, count, page, rowsPerPage, theme } = this.props;

        return(
            <div className={classes.root}>
            
            <IconButton
              onClick={this.handleFirstPageButtonClick}
              disabled={page === 0}
              aria-label="First Page"
            >
              {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
              onClick={this.handleBackButtonClick}
              disabled={page === 0}
              aria-label="Previous Page"
            >
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
              onClick={this.handleNextButtonClick}
              disabled={page >= Math.ceil(count / rowsPerPage) - 1}
              aria-label="Next Page"
            >
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
              onClick={this.handleLastPageButtonClick}
              disabled={page >= Math.ceil(count / rowsPerPage) - 1}
              aria-label="Last Page"
            >
              {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
          </div>         
        );
    }
}

    NewArticleTable.propTypes = {
        classes: PropTypes.object.isRequired,
        count: PropTypes.number.isRequired,
        onChangePage: PropTypes.func.isRequired,
        page: PropTypes.number.isRequired,
        rowsPerPage: PropTypes.number.isRequired,
        theme: PropTypes.object.isRequired,
    };

    const TablePaginationActionsWrapped = compose(connect(mapStateToProps),withStyles(actionsStyles, { withTheme: true }))(
        NewArticleTable,
      );
      
      let counter = 0;
      function createData(name, calories, fat) {
        counter += 1;
        return { id: counter, name, calories, fat };
      }
      
      const styles = theme => ({
        root: {
          width: '100%',
          marginTop: theme.spacing.unit * 3,
        },
        table: {
          minWidth: 500,
        },
        tableWrapper: {
          overflowX: 'auto',
        },
      });
      
      class NewArticleTableBody extends React.Component {
        constructor(props) {
          super(props);
      
          this.state = {
            page: 0,
            rowsPerPage: 5,
          };
        }
      
        handleChangePage = (event, page) => {
          this.setState({ page });
        };
      
        handleChangeRowsPerPage = event => {
          this.setState({ rowsPerPage: event.target.value });
        };
      
        render() {
          const { classes } = this.props;
          const { data, rowsPerPage, page } = this.state;
          const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.adminReducer.length - page * rowsPerPage);
      
          return (
            <Paper className={classes.root}>
              <div className={classes.tableWrapper}>
              {/* {JSON.stringify(this.props.adminReducer)} */}
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell> Date Posted </TableCell>
                    <TableCell> Research Title </TableCell>
                    <TableCell> Research Type </TableCell>
                    <TableCell> Institution Name </TableCell>
                    <TableCell> Institution URL </TableCell>
                    <TableCell> Funding Source</TableCell>
                    <TableCell> Research Date </TableCell>
                    <TableCell> User Name </TableCell>
                    <TableCell> User Email </TableCell>
                </TableRow>
            </TableHead>
        <TableBody>
                    {this.props.adminReducer.map(newArticle => {
                      return (
                        <TableRow key={newArticle.id}>

                          <TableCell component="th" scope="row">{newArticle.research_date}</TableCell>
                          <TableCell component="th" scope="row">{newArticle.research_title}</TableCell> 
                          <TableCell component="th" scope="row">{newArticle.type}</TableCell> 
                          <TableCell component="th" scope="row">{newArticle.institution_name}</TableCell>
                          <TableCell component="th" scope="row">{newArticle.institution_url}</TableCell>
                          <TableCell component="th" scope="row">{newArticle.funding_source}</TableCell>
                          <TableCell component="th" scope="row">{newArticle.research_date}</TableCell>
                          <TableCell component="th" scope="row">{newArticle.username}</TableCell>
                          <TableCell component="th" scope="row">{newArticle.email}</TableCell>
                  
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 48 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        colSpan={9}
                        count={this.props.adminReducer.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActionsWrapped}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            </Paper>
          );
        }
      }
      
      NewArticleTableBody.propTypes = {
        classes: PropTypes.object.isRequired,
      };
      
export default compose(withStyles(styles),connect(mapStateToProps))(NewArticleTableBody);