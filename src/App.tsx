/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import {
  Layout,
  Menu,
  Tooltip
} from 'antd';
import { FileSearchOutlined, FileAddTwoTone} from '@ant-design/icons';
import { HashRouter as Router, Route, Link} from 'react-router-dom';
import LayoutVerificacion from './components/views/validacion';
import  LayoutSearch  from './components/views/busqueda';
import ClayoutSearch  from './components/views/c_busqueda';
import ClayoutVerfication from './components/views/c_validacion';
import './App.global.css';

const { Sider, Content } = Layout;

const fValidacion = () => {
  return (
     <LayoutVerificacion />
  );
};

const fBusqueda = () =>{
  return(
   <LayoutSearch />
  )
}

const cValidacion = () => {
  return (
     <ClayoutVerfication/>
  );
};

const cBusqueda = () =>{
  return(
   <ClayoutSearch  />
  )
}


export default function App() {

  return (
    <Router>
      <Layout>
        <Sider width={150}>
          <Menu defaultOpenKeys={['gl']} defaultSelectedKeys={["1"]}>
            <Menu.ItemGroup key="g1"  title='Facturas'>
                <Menu.Item key="1" icon={<FileAddTwoTone style={{ fontSize: '22px' }} />}>
                  <Link  to="/"/>
                  Validar
              </Menu.Item>
              <Menu.Item key="2" icon={<FileSearchOutlined style={{ fontSize: '22px' }}/>}>
                  <Link to="/fbuscar"/>
                  Buscar
              </Menu.Item>
            </Menu.ItemGroup>
           <Menu.ItemGroup key="g2" title='Complementos'>
                <Menu.Item key="3" icon={<FileAddTwoTone style={{ fontSize: '22px' }} />}>
                  <Link to="/complemento"/>
                  Validar
              </Menu.Item>
              <Menu.Item key="4" icon={<FileSearchOutlined style={{ fontSize: '22px' }}/>}>
                <Link to="/cbuscar"/>
                  Buscar
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu>
        </Sider>
        <Content style={{ height: '100%' }}>
          <Route exact path="/" component={fValidacion} />
          <Route exact path="/fbuscar" component={fBusqueda} />
           <Route exact path="/complemento" component={cValidacion} />
          <Route exact path="/cbuscar" component={cBusqueda} />
        </Content>
      </Layout>
    </Router>
  );
}
