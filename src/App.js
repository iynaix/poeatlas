import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu, Input, Button } from 'semantic-ui-react'

import './App.css'
import { showCompleted, showUnique, search } from './reducers/atlas'
import Shaping from './shaping'
import TriToggle from './tri_toggle_button'
import MapTable from './map_table'

class App extends Component {
    state = { showShaping: true }

    render() {
        return (
            <div>
                <Menu inverted>
                    <Menu.Item header>
                        ATLAS HELPER
                    </Menu.Item>
                    <Menu.Item style={{ flexGrow: 10 }}>
                        <Input
                            type="search"
                            placeholder="Search"
                            action={{ icon: 'help' }}
                            value={this.props.query}
                            onChange={ev => this.props.search(ev.target.value)}
                        />
                    </Menu.Item>
                    <Menu.Menu position="right">
                        <Menu.Item>
                            <Button
                                primary
                                onClick={() => this.setState((prevState) => ({
                                    ...prevState,
                                    showShaping: !prevState.showShaping,
                                }))}
                            >
                                Shaping
                            </Button>
                        </Menu.Item>
                        <Menu.Item>
                            <TriToggle value={this.props.completed} onClick={this.props.showCompleted}>
                                Completed
                            </TriToggle>
                        </Menu.Item>
                        <Menu.Item>
                            <TriToggle value={this.props.unique} onClick={this.props.showUnique}>
                                Unique
                            </TriToggle>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                {this.state.showShaping ? <Shaping /> : <MapTable />}
            </div>
        )
    }
}

const mapState = ({ atlas }) => ({
    query: atlas.search,
    completed: atlas.showCompleted,
    unique: atlas.showUnique,
})

export default connect(mapState, { showCompleted, showUnique, search })(App)
