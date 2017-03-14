import React from 'react'
import { Button } from 'semantic-ui-react'

export default ({ value=null, children, ...props }) => {
    let content = "All"
    let extraProps = {}

    switch (value) {
        case true:
            content = "Yes"
            extraProps.positive = true
            break
        case false:
            content = "No"
            extraProps.negative = true
            break
        default:
            content = "All"
            extraProps.secondary = true
            break
    }

    return (
        <Button
            content={content}
            label={{ basic: true, pointing: 'right', content: children }}
            labelPosition="left"
            compact
            inverted
            {...props}
            {...extraProps}
        />
    )
}
