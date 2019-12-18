import React, { Component } from "react";
import { getFarmsData } from '../services/getData'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Fields from './Fields'
import './Farm.css'
export default class Farm extends Component {
    state = {
        farms: []
    };
    //update if farm's fields details are displayed or not
    handleClick = (id, op) => {
        let arr = this.state.farms;
        var commentIndex = arr.findIndex(function (f) {
            return f.id === id;
        });
        arr[commentIndex].open = op;
        this.setState({
            farms: arr
        })
    };
    //getFarmsData
    componentWillMount = async () => {
        try {
            let result = await getFarmsData(451);
            this.setState({ farms: result });
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
        const farmList = this.state.farms.map((category, key) => {
            return <List key={key}>
                <div className="farms">
                    <ListItem button onClick={() => this.handleClick(category.id, !category.open)}>
                        <ListItemText primary={category.name} />
                        {category.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                </div>
                <Collapse in={category.open} timeout="auto" unmountOnExit>
                    <Fields data={category.id} />
                </Collapse>
            </List>
        })
        return (
            <List>{farmList}</List>
        )
    }
}