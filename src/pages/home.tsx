import * as React from 'react';
import { hot } from 'react-hot-loader';

import Todos from '../features/todos/components/main';

export const Home = () => (
  <React.Fragment>
    <h1>Welcome to "typesafe actions" todo-app!</h1>
    <Todos />
  </React.Fragment>
);

export default hot(module)(Home);