/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Layout,
  Menu,
  Tooltip
} from 'antd';
import { ProfileTwoTone, FileAddTwoTone} from '@ant-design/icons';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import LayoutVerificacion from './components/views/validacion';
import  LayoutSearch  from './components/views/busqueda';
import './App.global.css';

const { Sider, Content } = Layout;

const validacion = () => {
  return (
     <LayoutVerificacion />
  );
};

const busqueda = () =>{
  return(
   <LayoutSearch />
  )
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Sider width={60}>
          <Menu
            defaultSelectedKeys={['1']}
            mode="vertical"
            theme="dark"
          >
            <Menu.Item key="1">
              <Tooltip placement="right" title="Capturar Facturas">
                <Link to="/">
                  <FileAddTwoTone style={{ fontSize: '22px' }} />
                </Link>
              </Tooltip>
            </Menu.Item>
            <Menu.Item key="2">
              <Tooltip placement="right" title="Buscar Facturas">
                <Link to="/search">
                  <ProfileTwoTone style={{ fontSize: '22px' }} />
                </Link>
              </Tooltip>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ height: '100%' }}>
          <Route exact path="/" component={validacion} />
          <Route exact path="/search" component={busqueda} />
        </Content>
      </Layout>
    </Router>
  );
}
