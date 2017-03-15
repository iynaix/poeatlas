import React from 'react'

import { maps as atlas } from './maps.json'

const RED = "#db2828"
const RARE = "#A3A314"
const UNIQUE = "#AF6025"

export default ({ name }) => {
    const { tier, isUniqueMap } = atlas[name]

    let color
    if (tier >= 10) { color = RED }
    else if (tier < 10 && tier >= 6) { color = RARE }
    else { color = "inherit" }

    if (isUniqueMap) { color = UNIQUE }

    return <span style={{ color }}>{name}</span>
}
