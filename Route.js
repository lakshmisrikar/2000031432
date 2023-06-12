import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Number from '../firstquestion/src/Number';
import TrainsList from './TrainsList';

const Routes = () => {
  return (
    <Router>
     
        <Route exact path="/">
          <TrainsList />
            <Number></Number>
        </Route>
       
   
    </Router>
  );
};

export default Routes;