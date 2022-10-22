import React, { Component } from 'react'

const LazyLoad = (importedFunc) => {
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount = () => {
            importedFunc().then((result) => {
                this.setState({ component: result.default })
            })
        }

        render(){
            const C=this.state.component
            return C?<C {...this.props}/>:null
        }
    }
}

export default LazyLoad