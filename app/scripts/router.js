import React from 'react';
import {Router, Route, hashHistory} from 'react-router';
import game from './game';





  const router = (
    <Router history ={hashHistory}>
      <Route path = "/" component = {game}/>

    </Router>

  )

export default router;
