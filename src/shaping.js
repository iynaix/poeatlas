import React, { Component } from 'react'
import { Grid, Dropdown } from 'semantic-ui-react'
import fp from 'lodash/fp'

import { maps as atlas, shaperOrbs } from './maps.json'
import Map from './map'

const SHAPEABLE_MAPS = fp.flow(
    // no unique maps
    fp.pickBy(m => !m.isUniqueMap),
    fp.values,
    fp.groupBy(m => m.tier),
    fp.mapValues(fp.map("name")),
)(atlas)

class Shaping extends Component {
    renderOrb = ([mapName, orbTier]) => {
        const options = SHAPEABLE_MAPS[orbTier].map(m => ({ text: m, value: m }))

        return (
            <Grid.Row key={mapName} columns={2}>
                <Grid.Column>
                    <Map name={mapName} />
                </Grid.Column>
                <Grid.Column>
                    <Dropdown
                        fluid
                        search
                        selection
                        options={[{text: "", value: null}, ...options]}
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

export default Shaping
