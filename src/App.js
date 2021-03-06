import React, { Component } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { Menu, Grid, Input, Button, Statistic } from 'semantic-ui-react'
import fp from 'lodash/fp'

import './App.css'
import { showCompleted, showUnique, toggleShaping, load, search } from './reducers/atlas'
import { decodeHashid } from './utils'
import Shaping from './shaping'
import TriToggle from './tri_toggle_button'
import MapTable from './map_table'

class App extends Component {
    componentWillMount() {
        this.props.load(decodeHashid(queryString.parse(window.location.search.substr(1)).c || ""))
    }

    render() {
        const { completions } = this.props

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
                                onClick={this.props.toggleShaping}
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

                <Grid>
                    <Grid.Row>
                        <Grid.Column width={1} />
                        <Grid.Column width={5}>
                            <Statistic
                                horizontal
                                inverted
                                value={`${fp.sum(completions)} / ${completions.length}`}
                                label='Maps'
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                {this.props.showShaping ? <Shaping /> : <MapTable />}
            </div>
        )
    }
}

const mapState = ({ atlas }) => ({
    query: atlas.search,
    showShaping: atlas.showShaping,
    completed: atlas.showCompleted,
    unique: atlas.showUnique,
    completions: atlas.completion,
})

export default connect(mapState, { showCompleted, showUnique, toggleShaping, search, load })(App)
