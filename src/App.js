import React, { Component } from 'react'
import { Menu, Input, Checkbox, Button } from 'semantic-ui-react'
import MapTable from './map_table'
import './App.css'

export default class extends Component {
    render() {
        return (
            <div>
                <Menu attached="top" style={{ backgroundColor: '#333' }}>
                    <Menu.Menu>
                        <div className="ui aligned search item">
                            <Input icon="search" placeholder="Search" />
                        </div>
                    </Menu.Menu>
                    <Menu.Menu position="right">
                        <div className="ui item">
                            <Button primary>Shaping</Button>
                        </div>
                        <div className="ui item">
                            <Checkbox toggle label="Complete" />
                        </div>
                        <div className="ui item">
                            <Checkbox toggle label="Unique" />
                        </div>
                    </Menu.Menu>
                </Menu>
                <MapTable />
            </div>
        )
    }
}
