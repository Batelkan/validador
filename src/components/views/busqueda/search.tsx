/* eslint-disable */
import React, { useState } from 'react';
import {
  Layout,
  Table
} from 'antd';

const mocksource = require('/src/services/mock.json');

const LayoutSearch = () => {
  const columns = [
    {
      title: 'Empresa',
      dataIndex: 'Empresa',
      key: 'Empresa',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'Rfc',
      dataIndex: 'RfcEmpresa',
      key: 'RfcEmpresa',
      width: 150,
    },
    {
      title: 'Folio SAT',
      dataIndex: 'FolioFiscal',
      key: 'FolioFiscal',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'Folio',
      dataIndex: 'Folio',
      key: 'Folio',
      width: 150,
    },
    {
      title: 'Fecha',
      dataIndex: 'Fecha',
      key: 'Fecha',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'Proveedor',
      dataIndex: 'Proveedor',
      key: 'Proveedor',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'Rfc proveedor',
      dataIndex: 'RfcProveedor',
      key: 'RfcProveedor',
      width: 150,
    },
    {
      title: 'Importe',
      dataIndex: 'Importe',
      key: 'Importe',
      width: 150,
    },
    {
      title: 'Estatus',
      dataIndex: 'EstatusPago',
      key: 'EstatusPago',
      ellipsis: true,
      width: 150,
    },
  ];

  return (
    <Layout style={{ background: '#fff', overflow: 'auto' }}>
      <Table size="small" columns={columns} dataSource={mocksource} />
    </Layout>
  );
};

export default LayoutSearch;
