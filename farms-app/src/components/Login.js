import React, { Component } from "react";
import {getToken} from '../services/getData'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class Login extends Component {
        state = {
            email: '',
            password: '',
            authorized: false
        }   
    //check if email and password provide an authorized token  
    handleClick = async () => {
        const {
            email,
            password
          } = this.state;
          try{
            await getToken(email, password);
            this.setState({ authorized: true });
            this.props.history.push('/farms'); //if the token is authorized and valid, redirect to the farms data
          }catch(error) {
                    this.setState({ authorized: false });
                    alert("User is unaithorized or invalid.");
          } 
      }

    render() {
        return (
                <MuiThemeProvider >
                    <div className="login">
                        <TextField
                            hintText="Enter your Email"
                            floatingLabelText="Email"
                            onChange={(event, newValue) => this.setState({ email: newValue })}
                        />
                        <br />
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) => this.setState({ password: newValue })}
                        />
                        <br />
                        <RaisedButton label="Send" primary={true} style={style} onClick={this.handleClick} />
                    </div>
                </MuiThemeProvider>
        );
    }
}
const style = {
    margin: 15,
};