/* eslint-disable */
import React, { useState, useEffect } from 'react';
import {FormUpdate} from './form';
import {Viewerjson} from './viewerjson';
import { EditOutlined,EyeFilled } from '@ant-design/icons';
import {
  Layout,
  Table,
  Button,
  Tooltip,
  Modal
} from 'antd';

const mocksource = require('/src/services/mock.json');
const {Sider,Content} = Layout;

interface Ijsonobject {
    jsonDoc: any;
}

interface Documento{
  ID: string,
  Empresa : string,
  RfcEmpresa : string,
  FolioFiscal : string,
  Folio : string,
  Correo : string,
  Fecha : string,
  Proveedor : string,
  RfcProveedor: string,
  Importe: string,
  CheckRfcProveedor : boolean,
  CheckCP : boolean,
  CheckRegFiscal : boolean,
  CheckRfcCliente: boolean,
  CheckIvaDesglosado: boolean,
  CheckUsoCFDI: boolean,
  CheckMetodoPago : boolean,
  CheckFormaPago : boolean,
  CheckTipoCFDI : boolean,
  CheckUnidad : boolean,
  CheckDescripcion : boolean,
  EstatusPago : string,
  Observaciones : string,
  IvaDesglosado : string,
  ProvicionFactura: string
}

// NOTE funcion del componente de busqueda

const LayoutSearch = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);

 // useEffect(()=>{console.log(isModalVisible);});

  const [jsonDoc, setjsonDoc] = useState<Documento>();
  useEffect(() => {
   if(jsonDoc !== undefined )
      {
          setIsModalVisible(true);
      }
  });

  // NOTE Operaciones del compontente

  const showModal = (doc:Documento) => {
    setjsonDoc(doc);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setjsonDoc(undefined);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setjsonDoc(undefined);
  };

// NOTE columnas de la tabla

  const columns = [
     {
    title: 'Accion',
    key: 'key',
    dataIndex: 'key',
    width:150,
    render: (text, record) =>
      (<>
      <Tooltip title="Ver">
        <Button type="primary" shape="circle" icon={<EyeFilled />} onClick={() => showModal(record)} />
    </Tooltip>
    <span>  </span>
    <Tooltip title="Editar">
        <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => showModal(record)} />
    </Tooltip>
      </>)
    },
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

// NOTE tags del componente

  return (
    <Layout style={{ background: '#fff', overflow: 'auto' }}>
      <Table size="small" columns={columns} dataSource={mocksource} />
    <Modal
      title='Documento'
      centered
      width='350'
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}>
       <Layout>
          <Sider width={400}>
              <Layout style={{ overflow: 'auto', background: '#3E4652', paddingRight:'10px', maxHeight:'600px' }}>
                <FormUpdate jsonDoc={jsonDoc}/>
              </Layout>
          </Sider>
          <Layout style={{ overflow: 'auto',maxHeight:'600px'}}>
            <Content> <Viewerjson isCloseModal={isModalVisible} /></Content>
          </Layout>
       </Layout>
    </Modal>
    </Layout>
  );
};

export default LayoutSearch;
