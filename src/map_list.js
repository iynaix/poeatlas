import React from 'react'
import fp from 'lodash/fp'

import { Mobile } from './utils'
import Map from './map'

export default ({ maps }) => (
    <Mobile
        yes={() =>
            <div>{fp.map(m => <Map key={m} id={m} style={{ paddingBottom: "0.5em" }} />)(maps)}</div>
        }
        no={() =>
            <span>{(maps.length ? maps : []).join(', ')}</span>
        }
    />
)
