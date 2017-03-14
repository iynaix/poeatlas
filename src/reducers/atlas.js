import { maps as atlas } from '../maps.json'
import fp from 'lodash/fp'

const mapNames = fp.zipObject(
    Object.keys(atlas),
    Object.keys(atlas).map(() => false)
)
console.info(mapNames)

export default (state = mapNames, action) => {
    switch (action.type) {
        default:
            return state
    }
}
