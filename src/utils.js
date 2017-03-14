import React from 'react'
import MediaQuery from 'react-responsive'

export const makeActionCreator = (type, ...argNames) =>
    (...args) => {
        const action = { type }
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index]
        })
        return action
    }

const MOBILE_BREAKPOINT = 768

export const Mobile = ({
    yes = () => null,
    no = () => null,
    ...props
}) => (
    <MediaQuery
        minDeviceWidth={MOBILE_BREAKPOINT}
        {...props}
    >
        {(match) => (match ? yes() : no())}
    </MediaQuery>
)
