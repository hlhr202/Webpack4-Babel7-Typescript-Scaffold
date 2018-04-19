import '@babel/polyfill'
import {Map} from 'immutable'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'

OfflinePluginRuntime.install({
	onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
	onUpdated: () => {
		localStorage.clear()
		/* todo:dev:start */
		location.reload()
		/* todo:dev:end */
	}
})

class Root extends React.PureComponent {
	readonly state = {
		fuck: 'fuck'
	}
	render() {
		return <div>Hello World! {this.state.fuck}</div>
	}
}

ReactDOM.render(<Root />, document.getElementById('root'))
