import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Counter from './counter';

ReactDOM.render(
    <Counter />,
    document.getElementById('react-root') as HTMLElement
);