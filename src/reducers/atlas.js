import fp from 'lodash/fp'
import Hashids from 'hashids'

import { maps as atlas } from '../maps.json'
import { makeActionCreator } from '../utils'

const MAP_NAMES = Object.keys(atlas)

const toggleTriState = (v) => {
    switch (v) {
        case true:
            return false
        case false:
            return null
        default:
            return true
    }
}

const hashid = new Hashids(
    'poeatlas',
    0,
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_.-~',
)

const encodeHashid = (arr) => hashid.encode(arr)
const decodeHashid = (arr) => hashid.decode(arr)

const encodeCompletions = (completions) =>
    encodeHashid(
        Object.keys(
            fp.pickBy((v, k) => v)(completions)
        ).map(name => atlas[name].id)
    )

// ACTIONS

export const SEARCH = 'atlas/SEARCH'
export const TOGGLE_COMPLETED = 'atlas/TOGGLE_COMPLETED'
export const SHOW_COMPLETED = 'atlas/SHOW_COMPLETED'
export const SHOW_UNIQUE = 'atlas/SHOW_UNIQUE'

// ACTION CREATORS

export const search = makeActionCreator(SEARCH, 'search')
export const toggleMap = makeActionCreator(TOGGLE_COMPLETED, 'name')
export const showCompleted = makeActionCreator(SHOW_COMPLETED)
export const showUnique = makeActionCreator(SHOW_UNIQUE)

export default (state = {
    search: '',
    showUnique: null,
    showCompleted: null,
    completion: fp.zipObject(
        MAP_NAMES,
        Object.keys(atlas).map(() => false)
    ),
}, action) => {
    switch (action.type) {
        case SEARCH:
            return { ...state, search: action.search }
        case TOGGLE_COMPLETED: {
            let { completion } = state
            completion = { ...completion, [action.name]: !completion[action.name] }
            console.info("ENCODED COMPLETIONS", encodeCompletions(completion))

            return { ...state, completion }
        }
        case SHOW_COMPLETED:
            return { ...state, showCompleted: toggleTriState(state.showCompleted) }
        case SHOW_UNIQUE:
            return { ...state, showUnique: toggleTriState(state.showUnique) }
        default:
            return state
    }
}
