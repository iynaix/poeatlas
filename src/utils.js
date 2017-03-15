import React from 'react'
import MediaQuery from 'react-responsive'
import Hashids from 'hashids'

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

const hashid = new Hashids(
    'poeatlas',
    0,
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_.-~',
)

export const encodeHashid = (arr) => hashid.encode(arr)
export const decodeHashid = (arr) => hashid.decode(arr)
