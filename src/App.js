//////////////////////////////////////////////////
///
/// Basic Component including three button(Add, edit, delete), one table        
/// Create : From siraj
///
//////////////////////////////////////////////////
import React, {Component} from 'react'
import { withStyles } from '@material-ui/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DataModal from "./DataModal";
import {_storeData, _fetchData} from "./StorageService";

const styles = theme => ({
    table: {
        minWidth: 650,
      },
});

class App extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            modalOpen: false,
            modalData: {},
            datas: [  
            ]
        }

        this.onAddButtonClick = this.onAddButtonClick.bind(this);
        this.onEditButtonClick = this.onEditButtonClick.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.onDataEdited = this.onDataEdited.bind(this);
        this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
        this.fetchData = this.fetchData.bind(this);

        _fetchData(this.fetchData);
    }

    onEditButtonClick(data, index){
        const _data = {...data};
        _data.index = index;
        this.setState({modalOpen: true, modalData: _data});
        
    }

    onAddButtonClick()
    {
        this.setState({modalOpen: true, modalData: {name: "", email: "", phone: ""}});
        
    }

    onDeleteButtonClick(index)
    {
        const _datas = [...this.state.datas];
        _datas.splice(index, 1);
        this.setState({datas: _datas, modalOpen: false});
        _storeData(_datas); 
    }

    onDataEdited(data)
    {   
        const _datas = [...this.state.datas];
        if(data.index === undefined)
        {
            
            _datas.push(data);
            this.setState({datas: _datas, modalOpen: false});
        }
        else{
            _datas[data.index] = data;
            this.setState({datas: _datas, modalOpen: false});
        }

        _storeData(_datas);        
    }

    onCloseModal()
    {
        this.setState({modalOpen: false});
    }

    fetchData(data){
        if(data !== undefined)
        {
            this.setState({
                datas: JSON.parse(data)
            })
        }
    }

    render()
    {
        const {classes} = this.props;
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Phone</TableCell>
                            <TableCell align="left">
                                Add 
                                <span align="right"><IconButton onClick={() => {this.onAddButtonClick()}} color = "primary" aria-label="add"><AddIcon /></IconButton></span>
                            </TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.datas.map((row,index) => (
                            <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="left">{row.email}</TableCell>
                            <TableCell align="left">{row.phone}</TableCell>
                            <TableCell align="left">
                                <IconButton onClick={() => {this.onEditButtonClick(row, index)}} color = "primary" aria-label="edit"><EditIcon /></IconButton>
                                <IconButton onClick={() => {this.onDeleteButtonClick(index)}} color = "primary" aria-label="delete"><DeleteIcon /></IconButton>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <DataModal onDataEdited={this.onDataEdited} data={this.state.modalData} open={this.state.modalOpen} onCloseModal={this.onCloseModal}></DataModal>
            </div>
        );
    }
}

export default withStyles(styles)(App);