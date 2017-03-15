import fp from 'lodash/fp'
import queryString from 'query-string'

import { atlas } from '../maps.json'
import { makeActionCreator, encodeHashid } from '../utils'

// current version of the poe maps, update this number and handle different json dumps when GGG changes maps
const MAP_JSON_VERSION = 1

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

const encodeCompletions = (completions) => {
    let arr = []
    completions.forEach((v, i) => {
        if (v) { arr.push(i) }
    })
    return encodeHashid(arr)
}

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
export const toggleMap = makeActionCreator(TOGGLE_COMPLETED, 'id')
export const showCompleted = makeActionCreator(SHOW_COMPLETED)
export const showUnique = makeActionCreator(SHOW_UNIQUE)

export default (state = {
    search: '',
    showUnique: null,
    showCompleted: null,
    completion: fp.fill(0, atlas.length, false, Array(atlas.length)),
}, action) => {
    switch (action.type) {
        case LOAD: {
            const tmp = state.completion.slice()

            action.initialData.forEach(id => { tmp[id] = !tmp[id] })
            return { ...state, completion: tmp }
        }
        case SEARCH:
            return { ...state, search: action.search }
        case TOGGLE_COMPLETED: {
            const tmp = state.completion.slice()
            tmp[action.id] = !tmp[action.id]

            const urlParams = stateForUrl(tmp)
            window.history.replaceState(urlParams, null, `/?${queryString.stringify(urlParams)}`)

            return { ...state, completion: tmp }
        }
        case SHOW_COMPLETED:
            return { ...state, showCompleted: toggleTriState(state.showCompleted) }
        case SHOW_UNIQUE:
            return { ...state, showUnique: toggleTriState(state.showUnique) }
        default:
            return state
    }
}
