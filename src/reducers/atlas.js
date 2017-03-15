import fp from 'lodash/fp'
import queryString from 'query-string'

import { maps as atlas } from '../maps.json'
import { makeActionCreator, encodeHashid } from '../utils'

// current version of the poe maps, update this number and handle different json dumps when GGG changes maps
const MAP_JSON_VERSION = 1
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

const encodeCompletions = (completions) =>
    encodeHashid(
        Object.keys(
            fp.pickBy((v, k) => v)(completions)
        ).map(name => atlas[name].id)
    )

const stateForUrl = (completions) => ({
    // completions
    c: encodeCompletions(completions),
    // version
    v: MAP_JSON_VERSION,
})

// ACTIONS

export const LOAD = 'atlas/LOAD'
export const SEARCH = 'atlas/SEARCH'
export const TOGGLE_COMPLETED = 'atlas/TOGGLE_COMPLETED'
export const SHOW_COMPLETED = 'atlas/SHOW_COMPLETED'
export const SHOW_UNIQUE = 'atlas/SHOW_UNIQUE'

// ACTION CREATORS

export const load = makeActionCreator(LOAD, 'initialData')
export const search = makeActionCreator(SEARCH, 'search')
export const toggleMap = makeActionCreator(TOGGLE_COMPLETED, 'name')
export const showCompleted = makeActionCreator(SHOW_COMPLETED)
export const showUnique = makeActionCreator(SHOW_UNIQUE)

export default (state = {
    search: '',
    showUnique: null,
    showCompleted: null,
    completion: null,
}, action) => {
    switch (action.type) {
        case LOAD:
            return {
                ...state,
                completion: fp.zipObject(
                    MAP_NAMES,
                    fp.map((name) => action.initialData.indexOf(atlas[name].id) !== -1)(MAP_NAMES),
                ),
            }
        case SEARCH:
            return { ...state, search: action.search }
        case TOGGLE_COMPLETED: {
            let { completion } = state
            completion = { ...completion, [action.name]: !completion[action.name] }

            const urlParams = stateForUrl(completion)
            window.history.replaceState(urlParams, null, `/?${queryString.stringify(urlParams)}`)

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
