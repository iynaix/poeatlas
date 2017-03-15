import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'

import './index.css'
import initStore from './store'

const store = initStore()

class AppContainer extends Component {
    state = { rehydrated: false }

    componentWillMount() {
         this.setState({ rehydrated: true })

        /* persistStore(store, {
         *     whitelist: ["atlas"],
         * }, () => {
         *     this.setState({ rehydrated: true })
         * })*/
    }

    render() {
        if (!this.state.rehydrated) {
            return null
        }

        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}

ReactDOM.render(
    <AppContainer />,
    document.getElementById('root')
)
