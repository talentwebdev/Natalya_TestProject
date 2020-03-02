//////////////////////////////////////////////////
///
/// Modal Dialog to display when button such as add, edit and delete clicked
/// Create : From siraj
///
//////////////////////////////////////////////////
import React, {Component} from "react";
import Modal from '@material-ui/core/Modal';
import { withStyles, TextField, Button } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import TabPanel from './TabPanel';

  
function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  

// define madal style
function getModalStyle() {
    return {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };
  }
// define paper, textfied and button style 
  const useStyles = theme => ({
    paper: {
      position: 'absolute',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    textField: {
        width: '100%',
        marginTop: '10px',
    },
    button: {
        margin: theme.spacing(1),
      },
  });
// create class for Modal dialog
  class DataModal extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            name: this.props.data.name, 
            email: this.props.data.email,
            phone: this.props.data.phone,
            index: this.props.data.index,
            value: 0,
        }

        this.handleChange = this.handleChange.bind(this);
    }   

    handleChange (event, newValue){
        this.setState({value: newValue});
      };    

    componentDidUpdate(prevProps, prevState) {
        // only update chart if the data has changed
        if (prevProps.data !== this.props.data) {
            this.setState({
                name: this.props.data.name,
                email: this.props.data.email,
                phone: this.props.data.phone,
                index: this.props.data.index,
            })
        }
    }
    
    render(){
        const {classes} = this.props;
        return (
            <Modal aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.props.open}
                    onClose={this.props.onCloseModal}
                    >
                <div style={getModalStyle()} className={classes.paper}>
                    <AppBar position="static">
                        <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example">
                            <Tab label="Name" {...a11yProps(0)} />
                            <Tab label="Email" {...a11yProps(1)} />
                            <Tab label="Phone" {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={this.state.value} index={0}>
                        <div><TextField className={classes.textField} id="standard-basic" onChange={e => {this.setState({name: e.target.value})}} value={this.state.name} label="Name" /></div>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1}>
                        <div><TextField className={classes.textField} id="standard-basic" onChange={e => {this.setState({email: e.target.value})}} value={this.state.email} label="Email" /></div>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={2}>
                        <div><TextField className={classes.textField} id="standard-basic" onChange={e => {this.setState({phone: e.target.value})}} value={this.state.phone}  label="Phone" /></div>
                    </TabPanel>
                    <Button variant='contained' color='primary' size='small' className={classes.button} startIcon={<SaveIcon/>} onClick={() => {this.props.onDataEdited({...this.state})}}>Add/Save</Button>
                    <Button variant='contained' color='secondary' size='small' className={classes.button} startIcon={<CancelIcon/>} onClick={() => {this.props.onCloseModal()}}>Cancel</Button>
                </div>
            </Modal>
        )
    }
}

export default withStyles(useStyles)(DataModal);