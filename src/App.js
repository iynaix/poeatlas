import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu, Input, Button } from 'semantic-ui-react'

import './App.css'
import { showCompleted, showUnique } from './reducers/atlas'
import TriToggle from './tri_toggle_button'
import MapTable from './map_table'

class App extends Component {
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
                            <TriToggle value={this.props.completed} onClick={this.props.showCompleted}>
                                Completed
                            </TriToggle>
                        </div>
                        <div className="ui item">
                            <TriToggle value={this.props.unique} onClick={this.props.showUnique}>
                                Unique
                            </TriToggle>
                        </div>
                    </Menu.Menu>
                </Menu>
                <MapTable />
            </div>
        )
    }
}

const mapState = ({ atlas }) => ({
    completed: atlas.showCompleted,
    unique: atlas.showUnique,
})

export default connect(mapState, { showCompleted, showUnique })(App)
