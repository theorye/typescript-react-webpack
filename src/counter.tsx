import * as React from 'react';
import { hot } from 'react-hot-loader';

interface State {
    count: number;
}

class Counter extends React.Component<{},State> {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }

    climb() {
        this.setState({
            count: this.state.count + 1
        })
    }

    render() {
        return (
            <div onClick={this.climb.bind(this)}>
                <h1>Counting: {this.state.count}</h1>
            </div>
            
        )
    }
}

export default hot(module)(Counter);