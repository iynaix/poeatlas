import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Checkbox, Header, Item } from 'semantic-ui-react'
import fp from 'lodash/fp'

import { maps as atlas } from './maps.json'
import { toggleMap } from './reducers/atlas'

const normalizeText = (s) =>
    s.replace("ö", "o").replace(",", "").replace("'", "").replace('"', "")

const filterAtlas = (mapsArr, {
    search,
    showCompleted,
    showUnique,
    completion,
}) => {
    const query = new RegExp(normalizeText(search), "i")

    return fp.filter(({ name, isUniqueMap }) => {
        // handle filtering of uniques
        if (showUnique === true && !isUniqueMap) { return false }
        if (showUnique === false && isUniqueMap) { return false }

        // handle filtering of map completions
        if (showCompleted === true && !completion[name]) { return false }
        if (showCompleted === false && completion[name]) { return false }

        // handle the searching of maps
        if (!query.test(normalizeText(name))) { return false }

        return true
    })(mapsArr)
}

const RED = "#db2828"
const RARE = "#A3A314"
const UNIQUE = "#AF6025"

const Map = ({ name }) => {
    const { tier, isUniqueMap } = atlas[name]

    let color
    if (tier >= 10) { color = RED }
    else if (tier < 10 && tier >= 6) { color = RARE }
    else { color = "inherit" }

    if (isUniqueMap) { color = UNIQUE }

    return <span style={{ color }}>{name}</span>
}

const MapList = ({ maps }) => (
    <div>
        {fp.map(m => <p key={m}><Map name={m} /></p>)(maps)}
    </div>
)

class MapTable extends Component {
    renderHeader() {
        const headerStyle = { textAlign: "center", textTransform: "uppercase", color: "white", fontWeight: 'bold' }

        return (
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell style={headerStyle} />
                    <Table.HeaderCell style={headerStyle}>Name</Table.HeaderCell>
                    <Table.HeaderCell style={headerStyle}>Tier</Table.HeaderCell>
                    <Table.HeaderCell style={headerStyle}>From</Table.HeaderCell>
                    <Table.HeaderCell style={headerStyle}>To</Table.HeaderCell>
                    <Table.HeaderCell style={headerStyle}>Links</Table.HeaderCell>
                    <Table.HeaderCell style={headerStyle}>Sextants</Table.HeaderCell>

                    {/* <Table.HeaderCell>Data</Table.HeaderCell> */}
                </Table.Row>
            </Table.Header>
        )
    }

    renderRow = (mapData) => {
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
                    <Checkbox
                        checked={this.props.completion[name]}
                        onClick={() => this.props.toggleMap(name)}
                    />
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
        const filteredMaps = filterAtlas(Object.values(atlas), this.props)

        return (
            <Table inverted celled striped size="small">
                {this.renderHeader()}
                <Table.Body>
                    {filteredMaps.length ?
                     filteredMaps.map(this.renderRow) : (
                        <Table.Row>
                            <Table.Cell
                                verticalAlign="middle"
                                textAlign="center"
                                colSpan={100}
                            >
                                <Header
                                    inverted
                                    size="large"
                                    color="red"
                                    style={{ paddingTop: '2em', paddingBottom: '2em' }}
                                >
                                    No maps found.
                                </Header>
                            </Table.Cell>
                        </Table.Row>
                     )}
                </Table.Body>
            </Table>
        )
    }
}

const mapState = ({ atlas }) => atlas

export default connect(mapState, { toggleMap })(MapTable)
