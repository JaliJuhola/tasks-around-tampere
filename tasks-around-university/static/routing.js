import React from 'react';
import './index.css';
// Currently using react-router-dom might be neccesary to change in native router
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// Here you should be importing all apps needed
import MainApp from './main/components/main';

import TestMiniGame from './test_game/components/test_game';

// Here is route definitions
const Routing = () => (
<BrowserRouter>
    <Switch>
        <Route exact path="/" component={MainApp} />
        <Route path="/mini_games/test"  component={TestMiniGame}/>
    </Switch>
</BrowserRouter>
);

export default Routing;
