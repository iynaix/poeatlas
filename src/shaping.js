import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Dropdown } from 'semantic-ui-react'
import fp from 'lodash/fp'

import { atlas, shaperOrbs } from './maps.json'
import Map from './map'

const SHAPEABLE_MAPS = fp.flow(
    fp.filter(m => !m.isUniqueMap), // no unique maps
    fp.groupBy(m => m.tier),
    fp.mapValues(fp.map("id")),
)(atlas)

class Shaping extends Component {
    renderOrb = ([mapId, orbTier]) => {
        const options = SHAPEABLE_MAPS[orbTier].map(m => ({
            text: atlas[m].name,
            value: m,
            content: <Map id={m} completions={this.props.completions} showCompleted />
        }))

        return (
            <Grid.Row key={mapId} columns={2} verticalAlign="middle">
                <Grid.Column width={2} />
                <Grid.Column textAlign="right" width={4}>
                    <Map id={mapId} completions={this.props.completions} showCompleted />
                </Grid.Column>
                <Grid.Column width={8}>
                    <Dropdown
                        fluid
                        labeled
                        selection
                        options={[
                            {text: "None", value: ""},
                            ...options,
                        ]}
                        onChange={(e, { value }) => {
                            console.info(value)
                        }}
                    />
                </Grid.Column>
            </Grid.Row>
        )
    }

    render() {
        return (
            <Grid divided="vertically">
                {fp.toPairs(shaperOrbs).map(this.renderOrb)}
            </Grid>
        )
    }
}

const mapState = ({ atlas }) => ({
    completions: atlas.completion,
})

export default connect(mapState)(Shaping)
