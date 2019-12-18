import React, { Component } from "react";
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import StarBorder from '@material-ui/icons/StarBorder';
import { getFieldsData } from '../services/getData'
import './Fields.css'

export default class Field extends Component {
    state = {
        fields: []
    };
    //get fields data
    componentWillMount = async () => {
        try {
            let result = await getFieldsData(this.props.data);
            this.setState({ fields: result });
        } catch (error) {
            return {
                "error": {
                    message: error.response.data.error,
                    status: error.response.data.status
                }
            }
        }
    }
    render() {
        const fieldList = this.state.fields.map((category, key) => {
            return <ListItem key={key}>
                <div className="fieldIcon">
                    <ListItemIcon>
                        <StarBorder />
                    </ListItemIcon>
                </div>
                <div className="fields">
                    <ListItemText primary={category.name} />
                </div>
            </ListItem>
        })
        return (
            <List component="div" disablePadding>
                {fieldList}
            </List>
        );
    }
}