import React from 'react'
import { Image } from 'semantic-ui-react'

import { maps as atlas } from './maps.json'

const RED = "#db2828"
const RARE = "#A3A314"
const UNIQUE = "#AF6025"

export default ({ name, showIcon=true }) => {
    const { tier, isUniqueMap, icon } = atlas[name]

    let color
    if (tier >= 10) { color = RED }
    else if (tier < 10 && tier >= 6) { color = RARE }
    else { color = "inherit" }

    if (isUniqueMap) { color = UNIQUE }

    if (showIcon) {
        return (
            <div>
                <Image alt={name} src={icon} avatar style={{ marginRight: '1em' }} />
                <span style={{ color }}>{name}</span>
            </div>
        )
    }
    return <span style={{ color }}>{name}</span>
}
