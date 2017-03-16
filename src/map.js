import React from 'react'
import { Image, Icon } from 'semantic-ui-react'

import { atlas } from './maps.json'

const RED = "#db2828"
const RARE = "#A3A314"
const UNIQUE = "#AF6025"

export default ({ id, style={}, showIcon=true, showCompleted=false, completions=[] }) => {
    const { name, tier, isUniqueMap, icon } = atlas[id]

    let color
    if (tier >= 11) { color = RED }
    else if (tier <= 10 && tier >= 6) { color = RARE }
    else { color = "inherit" }

    if (isUniqueMap) { color = UNIQUE }

    const iconProps = { inverted: false, style: { marginLeft: '1em' } }
    const completedIcon = !!(completions[id]) ? (
        <Icon name="checkmark" color="green" {...iconProps} />
    ) : (
        <Icon name="remove" color="red" {...iconProps} />
    )

    if (showIcon) {
        return (
            <div style={style}>
                <Image alt={name} src={icon} avatar style={{ marginRight: '1em' }} />
                <span style={{ color }}>{name}</span>
                {showCompleted && completedIcon}
            </div>
        )
    }
    return (
        <div>
            <span style={{ color }}>{name}</span>
            {showCompleted && completedIcon}
        </div>
    )
}
