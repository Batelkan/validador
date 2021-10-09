/* eslint-disable */
// NOTE Imports
import React, { useState, useEffect } from 'react';
import {FormUpdate} from './form';
import {Viewerjson} from './viewerjson';
import { EditOutlined,EyeFilled } from '@ant-design/icons';
import {
  Layout,
  Table,
  Button,
  Tooltip,
  Modal,
  Input,
  Space,
  DatePicker,
  Select,
  Row,
  Col
} from 'antd';
import { DownloadOutlined,DislikeTwoTone,ReloadOutlined } from '@ant-design/icons';
import Grid from 'antd/lib/card/Grid';
import moment from 'moment';

const ipcrender = require('electron').ipcRenderer;

const mocksource = ()=>{
  //require('/src/services/mock.json');
}
const {Sider,Content} = Layout;
const { Search } = Input;
const {Option} =  Select;

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
  const [dataDocSource,setDataDocSource] = useState([]);
  const [jsonDoc, setjsonDoc] = useState<Documento>();
  const [rangeDates,setRangeDates] = useState([])
  const [loading,setLoading]= useState(false)

  let locale = {
  emptyText:(
      <span>
      <p>
        <DislikeTwoTone twoToneColor="#E5E4E2" style={{fontSize:'3em'}}/>
        <br/>
         Sin Resultados
      </p>
      <Button type="dashed" onClick={()=>shearchDataFromDb()} >Recargar</Button>
    </span>
  ),
  };

  useEffect(() => {
  /*   if(dataDocSource.length == 0)
    {
      shearchDataFromDb();
    } */

   if(jsonDoc !== undefined )
      {
          setIsModalVisible(true);
      }
  });

  useEffect(() => {
   if(jsonDoc !== undefined )
      {
          setUpdatejson(jsonDoc);
      }
  },[jsonDoc]);

  // Documento nuevo actualizado
   const [Updatejson, setUpdatejson] = useState<Documento>();
   useEffect(()=>{ },[Updatejson])

  // NOTE Operaciones del compontente

  const showModal = (doc:Documento) => {
    setjsonDoc(doc);
  };

  const handleOk = () => {
    console.log(Updatejson);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setjsonDoc(undefined);
  };

   const handleUpdateFields = (e) => {
           let tempObj = {... Updatejson, [e.name] : e.value}
           setUpdatejson(tempObj);
  }

  async function shearchDataFromDb (){
    setLoading(true);
    await ipcrender.invoke('obtenertodos', '10').then((result) => {
      if(result.length > 0){
            console.log('getResponse invocation returned: ',result)
            setDataDocSource(result);
      }
       else{
               setDataDocSource([]);
             }
      setLoading(false);
    });

  }

  async function shearchDataByFolio(folio){
    setLoading(true);
    await ipcrender.invoke('obtenerPorFolio', folio).then((result) => {
      if(result.length > 0){
            console.log('getResponse invocation returned: ',result)
            setDataDocSource(result);
             }
             else{
               setDataDocSource([]);
             }
      setLoading(false);
        });
  }

   async function shearchDataByRfc(rfc){
     setLoading(true);
    await ipcrender.invoke('obtenerPorRfc', rfc).then((result) => {
      if(result.length > 0){
            console.log('getResponse invocation returned: ',result)
            setDataDocSource(result);
             }
              else{
               setDataDocSource([]);
             }
      setLoading(false);
        });
  }

  async function shearchDataByDates(dates){
    setLoading(true);
    await ipcrender.invoke('obtenerPorFecha', dates).then((result) => {
      if(result.length > 0){
            console.log('getResponse invocation returned: ',result)
            setDataDocSource(result);
             }
              else{
               setDataDocSource([]);
             }
      setLoading(false);
        });
  }

/*
  ipcrender.once('obtenertodos', (event: any, xmlsload: any[]) => {
  console.log(xmlsload);
  ipcrender.removeAllListeners('obtenertodos');
  }); */

  const onSearchByFolio = value => shearchDataByFolio(value);
  const onSearchByRfc = value => shearchDataByRfc(value);

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
      render: Fecha => `${Fecha.toLocaleDateString()}`,
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
 //
  return (
    <Layout style={{ background: '#fff', overflow: 'auto' }}>
         <Space style ={{margin:'10px'}}>
            <Tooltip placement="bottom" title={'Descargar recientes'}>
             <Button type="primary" onClick={()=>shearchDataFromDb()} shape="circle" icon={<ReloadOutlined />} size={'large'} />
            </Tooltip>
             <span>     </span>
          <Tooltip placement="bottom" title={'Folio de SAT'}>
           <Search
            placeholder="Folio SAT"
              allowClear
              enterButton="Buscar"
              onSearch={onSearchByFolio}
            />
          </Tooltip>
          <Input.Group>
           <Tooltip placement="bottom" title={'RFC Proveedor'}>
             <Search
            placeholder="RFC Proveedor"
              allowClear
              enterButton="Buscar"
              onSearch={onSearchByRfc}

            />
            </Tooltip>
          </Input.Group>
          <Row style={{ width: '800px'}} >
            <Col span={24}>
            <DatePicker.RangePicker
            style={{ width: '70%',borderRadius:0 }}
            placeholder={['Fecha Inicio','Fecha Final']}
            format={'YYYY/MM/DD'}
            onChange={(dt,dts) => {
            setRangeDates(dts)
            console.log(rangeDates);
            }}/>
            <Button type="primary" onClick={()=>shearchDataByDates(rangeDates)} style={{ borderRadius:0 }}  >
              Buscar
            </Button>
            </Col>
          </Row>
         </Space>
      <Table size="small" locale={locale} loading={loading} columns={columns} dataSource = {dataDocSource.length > 0 ? dataDocSource : null}  />
    <Modal
      title='Documento'
      centered
      width='350'
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Actualizar"
      cancelText="Cancelar">
       <Layout>
          <Sider width={400}>
              <Layout style={{ overflow: 'auto', background: '#3E4652', paddingRight:'10px', maxHeight:'600px' }}>
                <FormUpdate handleUpdateFields={handleUpdateFields} jsonDoc={jsonDoc}/>
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
