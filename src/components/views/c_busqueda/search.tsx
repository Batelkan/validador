/* eslint-disable */
// NOTE Imports
import React, { useState, useEffect } from 'react';
import {Cdocumento} from '../../../types/types';
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
  Col,
  notification
} from 'antd';
import { DownloadOutlined,DislikeTwoTone,ReloadOutlined } from '@ant-design/icons';


const ipcrender = require('electron').ipcRenderer;

const {Sider,Content} = Layout;
const { Search } = Input;
const {Option} =  Select;

interface Ijsonobject {
    jsonDoc: any;
}



// NOTE funcion del componente de busqueda

const LayoutSearch = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataDocSource,setDataDocSource] = useState([]);
  const [jsonDoc, setjsonDoc] = useState<Cdocumento>();
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
   const [Updatejson, setUpdatejson] = useState<Cdocumento>();
   useEffect(()=>{ },[Updatejson])

  // NOTE Operaciones del compontente

  const showModal = (doc:Cdocumento) => {
    setjsonDoc(doc);
  };

  const handleOk = () => {
     ipcrender.invoke('c_actualizarDocumento',Updatejson).then((res)=>{
       if(!isNaN(res))
       {
            notification.success({
              message: 'Registro guardado',
              description:'Registro guardado con exito',
              duration:2

            });
       }else{
             Modal.error({
                 content: `No fue posible actualizar el registro`,
                 bodyStyle:{background:'#fff'},
                  className:"modalNotification",
                 width:100,
                  style: {
                  marginTop: '20vh',
                  },
              });
       }
     });
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
    await ipcrender.invoke('c_obtenertodos', '10').then((result) => {
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
    await ipcrender.invoke('c_obtenerPorFolio', folio).then((result) => {
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
    await ipcrender.invoke('c_obtenerPorRfc', rfc).then((result) => {
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
      title: 'UUID',
      dataIndex: 'c_UUID',
      key: 'c_UUID',
      width: 400,
      ellipsis: true,
    },
    {
      title: 'Estatus',
      dataIndex: 'c_Complemento',
      key: 'c_Complemento',
      width: 150,
    },
    {
      title: 'Factura',
      dataIndex: 'c_id_factura',
      key: 'c_id_factura',
      width: 150,
    },
     {
      title: 'Observaciones',
      dataIndex: 'c_Observaciones',
      key: 'c_Observaciones',
      width: 300,
    }
  ];

// NOTE tags del componente
 //
  return (
    <Layout style={{ background: '#fff', width:'100%' }}>
         <Space style ={{margin:'10px'}}>
            <Tooltip placement="bottom" title={'Descargar recientes'}>
             <Button type="primary" onClick={()=>shearchDataFromDb()} shape="circle" icon={<ReloadOutlined />} size={'large'} />
            </Tooltip>
             <span>     </span>
          <Tooltip placement="bottom" title={'Folio Fiscal del Complemetno'}>
           <Search
           size="small"
            placeholder="Folio uuid complemento"
              allowClear
              enterButton="Buscar"
              onSearch={onSearchByFolio}
            />
          </Tooltip>
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
