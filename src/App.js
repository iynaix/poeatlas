import React, { Component } from 'react'
import { Table, Menu, Input, Checkbox, Button } from 'semantic-ui-react'
import fp from 'lodash/fp'
import './App.css'

import atlas from './maps.json'

const WHITE = "black" // TODO: change color
const RED = "#B03060"
// const YELLOW = "#FFD700"
const YELLOW = "#FE9A76" // orange
const BROWN = "#A52A2A"

const Map = ({ name }) => {
    const { tier, isUniqueMap } = atlas[name]

    let color
    if (tier >= 10) { color = RED }
    else if (tier < 10 && tier >= 6) { color = YELLOW }
    else { color = WHITE }

    if (isUniqueMap) { color = BROWN }

    return <span style={{ color }}>{name}</span>
}

const MapList = ({ maps }) => (
    <div>
        {fp.map(m => <p key={m}><Map name={m} /></p>)(maps)}
    </div>
)

class MapTable extends Component {
    renderHeader() {
        return (
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Tier</Table.HeaderCell>
                    <Table.HeaderCell>From</Table.HeaderCell>
                    <Table.HeaderCell>To</Table.HeaderCell>
                    <Table.HeaderCell>Links</Table.HeaderCell>
                    <Table.HeaderCell>Sextants</Table.HeaderCell>

                    {/* <Table.HeaderCell>Data</Table.HeaderCell> */}
                </Table.Row>
            </Table.Header>
        )
    }

    renderRow(mapData) {
        const {
            name,
            tier,
            icon,
            upgradeTo,
            upgradeFrom,
            linkedTo,
            sextants,
        } = mapData

        return (
            <Table.Row key={name} verticalAlign="top">
                <Table.Cell verticalAlign="middle">
                    <Checkbox />
                </Table.Cell>
                <Table.Cell>
                    <p style={{ display: 'flex', alignItems: 'center' }}>
                        <img alt={name} src={icon} style={{ paddingRight: "1em" }}/>
                        <Map name={name}></Map>
                    </p>
                </Table.Cell>
                <Table.Cell>{tier}</Table.Cell>
                <Table.Cell>{upgradeFrom}</Table.Cell>
                <Table.Cell>{upgradeTo}</Table.Cell>
                <Table.Cell>{<MapList maps={linkedTo} />}</Table.Cell>
                <Table.Cell>{<MapList maps={sextants} />}</Table.Cell>

                {/* <Table.Cell>{JSON.stringify(mapData)}</Table.Cell> */}
            </Table.Row>
        )
    }

    render() {
        return (
            <div>
                <Table celled striped compact size="small">
                    {this.renderHeader()}
                    <Table.Body>
                        {Object.values(atlas).map(this.renderRow)}
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

class App extends Component {
    render() {
        return (
            <div>
                <Menu attached="top">
                    <Menu.Menu>
                        <div className="ui aligned search item">
                            <Input icon="search" placeholder="Search" />
                        </div>
                    </Menu.Menu>
                    <Menu.Menu position="right">
                        <div className="ui item">
                            <Button secondary>Shaping</Button>
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

export default App
