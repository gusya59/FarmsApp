import React, { Component } from "react";
import Container from '@material-ui/core/Container';
import Farm from './Farm'
import { ListSubheader } from '@material-ui/core';
import './FarmsList.css'
export default class FarmsList extends Component {
    state = {
        open: true,
        fields: []
    };

    render() {
        return (
            <Container maxWidth="md">
                <div className="farmListHeader">
                    <ListSubheader >
                     {<div className="subText">Farms</div>}
                    </ListSubheader>
                </div>
                <Farm />
            </Container>
        );
    }
}