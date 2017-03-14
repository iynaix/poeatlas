import fp from 'lodash/fp'

import { maps as atlas } from '../maps.json'
import { makeActionCreator } from '../utils'

const MAPNAMES = fp.zipObject(
    Object.keys(atlas),
    Object.keys(atlas).map(() => false)
)

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
    completion: MAPNAMES,
}, action) => {
    switch (action.type) {
        case SEARCH:
            return { ...state, search: action.search }
        case TOGGLE_COMPLETED: {
            const { completion } = state
            return {
                ...state,
                completion: { ...completion, [action.name]: !completion[action.name] },
            }
        }
        case SHOW_COMPLETED:
            return { ...state, showCompleted: toggleTriState(state.showCompleted) }
        case SHOW_UNIQUE:
            return { ...state, showUnique: toggleTriState(state.showUnique) }
        default:
            return state
    }
}
