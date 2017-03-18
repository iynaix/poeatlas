import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Checkbox, Header } from 'semantic-ui-react'

import { atlas } from './maps.json'
import { toggleMap, toggleMapRange } from './reducers/atlas'
import Map from './map'
import MapList from './map_list'

// NOTE: test regex here:
// https://www.debuggex.com/?flavor=javascript
// map tier: group 2
// tier operation: group 3
const TIERS_RE = /\bt(ier)?\s*:?\s*(\d{1,2})([+-]?)/i

const normalizeText = (s) =>
    s.replace("ö", "o").replace(",", "").replace("'", "").replace('"', "")

const filterAtlas = ({
    search,
    showCompleted,
    showUnique,
    completion,
}) => {
    /* search = 'tier: 11+'*/
    search = normalizeText(search.trim())

    let [,, tierSearch, tierOpSearch] = TIERS_RE.exec(search) || []
    if (tierSearch) {
        tierSearch = parseInt(tierSearch, 10)
    }

    // second regex removes the + or - as it is not included in the word boundary
    search = search.replace(TIERS_RE, '').replace(/[+-]/g, '')
    // replace multiple spaces with single space
    search = search.replace(/\s\s+/g, ' ').trim()

    const query = new RegExp(search.trim(), "i")

    return atlas.filter(({ name, tier, isUniqueMap }) => {
        // handle filtering of uniques
        if (showUnique === true && !isUniqueMap) { return false }
        if (showUnique === false && isUniqueMap) { return false }

        // handle filtering of map completions
        if (showCompleted === true && !completion[name]) { return false }
        if (showCompleted === false && completion[name]) { return false }

        // handle searching of map tiers
        if (tierSearch) {
            // handle + and - for >= and <= respectively
            if (tierOpSearch === "+") {
                if (tier < tierSearch) { return false }
            }
            else if (tierOpSearch === "-") {
                if (tier > tierSearch) { return false }
            }
            else if (tier !== tierSearch) {
                return false
            }
        }

        // finally handle the searching of maps
        if (!query.test(normalizeText(name))) { return false }

        return true
    })
}

class MapTable extends Component {
    state = { lastChecked: null }

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
                </Table.Row>
            </Table.Header>
        )
    }

    renderRow = (mapData) => {
        const {
            id,
            name,
            tier,
            upgradeTo,
            upgradeFrom,
            linkedTo,
            sextants,
        } = mapData

        return (
            <Table.Row key={name} verticalAlign="top">
                <Table.Cell verticalAlign="middle">
                    <Checkbox
                        checked={this.props.completion[id]}
                        onClick={(e) => {
                            const shiftPressed = e.shiftKey

                            this.setState((prevState) => {
                                if (shiftPressed) {
                                    // shift pressed, do the toggle for the checkboxes in between
                                    this.props.toggleMapRange(prevState.lastChecked, id)
                                } else {
                                    // simple toggle of the individual id
                                    this.props.toggleMap(id)
                                }

                                return {
                                    ...prevState,
                                    // toggle the lastChecked
                                    lastChecked: prevState.lastChecked ? null : id,
                                }
                            })
                        }}
                    />
                </Table.Cell>
                <Table.Cell>
                    <Map id={id} />
                </Table.Cell>
                <Table.Cell>{tier}</Table.Cell>
                <Table.Cell>
                    {upgradeFrom && <Map id={upgradeFrom} />}
                </Table.Cell>
                <Table.Cell>
                    {upgradeTo && <Map id={upgradeTo} />}
                </Table.Cell>
                <Table.Cell>{<MapList maps={linkedTo} />}</Table.Cell>
                <Table.Cell>{<MapList maps={sextants} />}</Table.Cell>
            </Table.Row>
        )
    }

    render() {
        const filteredMaps = filterAtlas(this.props)

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

export default connect(mapState, { toggleMap, toggleMapRange })(MapTable)
