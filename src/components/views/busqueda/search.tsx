/* eslint-disable */
import React, { useState } from 'react';
import {
  Layout,
  Table,
  Menu,
  Button,
  Upload,
  message,
  Form,
  Input,
  Radio,
  InputNumber,
  Row,
  Col,
  Switch,
  Divider,
  Select,
} from 'antd';

const LayoutSearch = () => {
  const columns = [
    {
      title: 'Empresa',
      dataIndex: 'Empresa',
      key: 'Empresa',
    },
    {
      title: 'Rfc',
      dataIndex: 'RfcEmpresa',
      key: 'RfcEmpresa',
    },
    {
      title: 'Folio SAT',
      dataIndex: 'FolioFiscal',
      key: 'FolioFiscal',
    },
    {
      title: 'Folio',
      dataIndex: 'Folio',
      key: 'Folio',
    },
    {
      title: 'Fecha',
      dataIndex: 'Fecha',
      key: 'Fecha',
    },
    {
      title: 'Proveedor',
      dataIndex: 'Proveedor',
      key: 'Proveedor',
    },
    {
      title: 'Rfc proveedor',
      dataIndex: 'RfcProveedor',
      key: 'RfcProveedor',
    },
    {
      title: 'Importe',
      dataIndex: 'Importe',
      key: 'Importe',
    },
    {
      title: 'Estatus',
      dataIndex: 'EstatusPago',
      key: 'EstatusPago',
    },
  ];

  return (
    <>
      <Layout>
        <Table columns={columns} />
      </Layout>
    </>
  );
};

export default LayoutSearch;
