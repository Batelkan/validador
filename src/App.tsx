/* eslint-disable prettier/prettier */
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {layoutVerfication as Verification} from './components/views/validacion';
import './App.global.css';


const validacion = () => {
  return (
     <Verification></Verification>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={validacion} />
      </Switch>
    </Router>
  );
}
