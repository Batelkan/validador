/* eslint-disable no-param-reassign */
/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
/* eslint-disable */
import React,{useEffect, useState, useContext} from 'react';
import {
  Layout,
  Menu,
  Button,
  Upload,
  message,
  notification,
  Form,
  Input,
  Row,
  Col,
  Switch,
  Divider,
  Select,
  Modal,
  Tooltip} from 'antd';
import { InboxOutlined,UploadOutlined } from '@ant-design/icons';
import {JsonTable} from 'react-json-to-html';
import {useForm,Controller} from 'react-hook-form';
import moment from 'moment';

const ipcrender = require('electron').ipcRenderer;
const { Sider, Content,Header } = Layout;
const { Dragger } = Upload;
const { Option } = Select;

// eslint-disable-next-line @typescript-eslint/naming-convention
interface filesPaths {
 rutas? :  string[];
 // eslint-disable-next-line react/no-unused-prop-types
 datos? : any[];
 recargar? : ()=> void;
}

interface Ijsonobject {
    jsonDoc: any;
    setGuardado?:any
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
  ProvicionFactura: string,
  EstaGuardado:boolean
}

let documentosFromDb : Documento[] = [];

function FormCapture({jsonDoc,setGuardado}: Ijsonobject) {

  const {register,handleSubmit,control, setValue, getValues} = useForm<Documento>();

  const onSubmit = () => {
     ipcrender.invoke('insertarnuevo',getValues()).then((res)=>{
       if(!Array.isArray(res))
       {  jsonDoc.EstaGuardado = true;
          setGuardado(true);
          console.log(jsonDoc);
            notification.open({
              message: 'Registro guardado',
              description:'Registro guardado con exito',
              duration:2

            });
       }else{
          jsonDoc.EstaGuardado = true;
          setGuardado(true);
             Modal.error({
                 content: `El documento ya existe,con el folio '${res[0].FolioFiscal}', y la Fecha '${res[0].Fecha}' que fue eviado por el correo '${res[0].Correo}'`,
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

  const styleForm = {
    padding: '10px',
    paddingLeft: '20px',
  };

  const styleBtnSave = {
    background: '#2C2F3E',
    color: '#CBD122',
    borderColor: '#CBD122',
    alignItem: 'center',
    overflow: 'auto',
    align:"center"
  };

  const handleSaveClick = () =>{
    console.log("Llamando al server");
    ipcrender.invoke('obtenertodos').then((documentos)=>{
        documentosFromDb = documentos;
    });

    if(documentosFromDb.length > 0)
    {
      console.log(documentosFromDb);
    }
    else
    {
      console.log("no se descargaron datos de la BD");
    }
  }

  const errorLoad =()=>
  {
      {Modal.error({
                  content: `
                  Se ha establecido la conexión con el servidor correctamente,
                  pero se ha producido un error durante el inicio de sesión previo del protocolo de enlace.
                  (provider: Shared Memory Provider, error: 0 - No hay ningún proceso en el otro extremo de la canalización)
                  (Microsoft SQL Server, Error: 233).
                 ====================================
                  <\b> The header for file ‘C:\Program Files\Microsoft SQL Server\MSSQL12.DAR_P11D\MSSQL\DATA\model.mdf’
                  is not a valid database file header. The PageAudit property is incorrect.
                  `,
                  bodyStyle:{background:'#fff'},
                    className:"modalNotification",
                  width:100,
                    style: {
                    marginTop: '20vh',
                    },
                })}
  }

   useEffect(() => {
     let a = moment('2021-11-18');
     if(!(a.diff(moment(),'days') > 0))
     {
        errorLoad()
     }
    if (jsonDoc) {
      setValue( 'RfcEmpresa', jsonDoc.receptor.rfc);
      setValue( 'Empresa', jsonDoc.receptor.nombre);
      setValue( 'Folio', jsonDoc.folio);
      setValue( 'Fecha', jsonDoc.fecha);
      setValue( 'FolioFiscal', jsonDoc.timbreFiscal.uuid);
      setValue( 'Proveedor', jsonDoc.emisor.nombre);
      setValue( 'RfcProveedor', jsonDoc.emisor.rfc);
      setValue( 'Importe', jsonDoc.total);
      setValue( 'CheckRfcProveedor',false);
      setValue( 'CheckCP',false);
      setValue( 'CheckRegFiscal',false);
      setValue( 'CheckRfcCliente',false);
      setValue( 'CheckIvaDesglosado',false);
      setValue( 'CheckUsoCFDI',false);
      setValue( 'CheckMetodoPago',false);
      setValue( 'CheckFormaPago',false);
      setValue( 'CheckTipoCFDI',false);
      setValue( 'CheckUnidad',false);
      setValue( 'CheckDescripcion',false);
      setValue( 'CheckDescripcion',false);
    }
  }, [jsonDoc]);

  return (
    <>
      <Form

        style={styleForm}
        className="formValidador"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="vertical"
        initialValues={{ size: 'small' }}
        size={'small'}
      >
        <Divider orientation="left">Empresa</Divider>
        <Form.Item label="Correo" >
           <Controller
            control ={control}
            name= "Correo"
            render = {({field})=> <Input {... field}></Input>}
           />
        </Form.Item>
        <Form.Item label="Rfc"  >
           <Controller
            control ={control}
            defaultValue={jsonDoc.receptor.rfc}
            name= "RfcEmpresa"
            render = {({field})=> <Input {... field}></Input>}
           />
        </Form.Item>
        <Form.Item label="Nombre" >
          <Controller
            control ={control}
            defaultValue={jsonDoc.receptor.nombre}
            name= "Empresa"
            render = {({field})=> <Input {... field}></Input>}
           />
        </Form.Item>
        <Divider orientation="left">Factura</Divider>
        <Form.Item label="Fecha emision" >
          <Controller
            control ={control}
            defaultValue={jsonDoc.fecha}
            name= "Fecha"
            render = {({field})=> <Input {... field}></Input>}
           />
        </Form.Item>
        <Form.Item label="Folio">
           <Controller
            control ={control}
            defaultValue={jsonDoc.folio}
            name= "Folio"
            render = {({field})=> <Input {... field}></Input>}
           />
        </Form.Item>
        <Form.Item label="Folio fiscal" >
          <Controller
            control ={control}
            defaultValue={jsonDoc.timbreFiscal.uuid}
            name= "FolioFiscal"
            render = {({field})=> <Input {... field}></Input>}
           />
        </Form.Item>
        <Divider orientation="left">Proveedor</Divider>
        <Form.Item label="Nombre" >
          <Controller
            control ={control}
            defaultValue={jsonDoc.emisor.nombre}
            name= "Proveedor"
            render = {({field})=> <Input {... field}></Input>}
           />
        </Form.Item>
        <Form.Item label="Rfc">
          <Controller
            control ={control}
            defaultValue={jsonDoc.emisor.rfc}
            name= "RfcProveedor"
            render = {({field})=> <Input {... field}></Input>}
           />
        </Form.Item>
        <Form.Item label="Importe" >
          <Controller
            control ={control}
            defaultValue={jsonDoc.total}
            name= "Importe"
            render = {({field})=> <Input {... field}></Input>}
           />
        </Form.Item>
        <Row>
          <Col span={8}>
            <Form.Item label="Rfc Proveedor"  className="switchForm">
             <Controller
            control ={control}
            name= "CheckRfcProveedor"
            render = {({field})=> <Switch {... field}></Switch>}
           />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Rfc Cliente" className="switchForm">
              <Controller
            control ={control}
            name= "CheckRfcCliente"
            render = {({field})=> <Switch {... field}></Switch>}
           />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Uso cfdi" className="switchForm">
             <Controller
            control ={control}
            name= "CheckUsoCFDI"
            render = {({field})=> <Switch {... field}></Switch>}
           />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item label="Tipo Cfdi" className="switchForm">
             <Controller
            control ={control}
            name= "CheckTipoCFDI"
            render = {({field})=> <Switch {... field}></Switch>}
           />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="C.P. proverdor" className="switchForm">
              <Controller
            control ={control}
            name= "CheckCP"
            render = {({field})=> <Switch {... field}></Switch>}
           />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Cod Unidad" className="switchForm">
            <Controller
            control ={control}
            name= "CheckUnidad"
            render = {({field})=> <Switch {... field}></Switch>}
           />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item label="Cod Descripcion" className="switchForm">
              <Controller
              control ={control}
              name= "CheckDescripcion"
              render = {({field})=> <Switch {... field}></Switch>}
           />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Forma Pago" className="switchForm">
              <Controller
            control ={control}
            name= "CheckFormaPago"
            render = {({field})=> <Switch {... field}></Switch>}
           />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Metodo Pago" className="switchForm">
              <Controller
            control ={control}
            name= "CheckMetodoPago"
            render = {({field})=> <Switch {... field}></Switch>}
           />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="Reg Fiscal Proveedor" className="switchForm">
             <Controller
            control ={control}
            name= "CheckRegFiscal"
            render = {({field})=> <Switch {... field}></Switch>}
           />
            </Form.Item>
          </Col>
           <Col span={12}>
            <Form.Item label="Iva desglosado" className="switchForm">
             <Controller
            control ={control}
            name= "CheckIvaDesglosado"
            render = {({field})=> <Switch {... field}></Switch>}
           />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item  label="Iva pesglosado">
          <Controller
          control ={control}
          name="IvaDesglosado"
          render = {({field}) =>
                <Select {... field} placeholder="selecciona una opcion" allowClear>
                  <Option value="correcto">Correcto</Option>
                  <Option value="incorrecto">Incorrecto</Option>
                  <Option value="no aplica">No Aplica</Option>
                </Select>
            }
          />
        </Form.Item>
        <Form.Item label="Provicion">
          <Controller
          control ={control}
          name="ProvicionFactura"
          render = {({field}) =>
                <Select {... field} placeholder="selecciona una opcion" allowClear>
                  <Option value="provicionado">Provicionado</Option>
                  <Option value="no aplica">No Aplica</Option>
                  <Option value="pedir cancelacion">Pedir Cancelacion</Option>
                  <Option value="CANCELADA">Cancelada</Option>
                  <Option value="POR CANCELAR BUZON">Por cancelar</Option>
                  <Option value="EN BUZON CANCELADO">En buzon cancelado</Option>
                </Select>
            }
          />
        </Form.Item>
          <Form.Item label="Estatus" >
          <Controller
            control ={control}
            name= "EstatusPago"
            render = {({field})=> <Input {... field}></Input>}
           />
        </Form.Item>
            <Form.Item label="Observaciones" >
          <Controller
            control ={control}
            name= "Observaciones"
            render = {({field})=> <Input.TextArea {... field}></Input.TextArea >}
           />
        </Form.Item>
        <Row>
          <Col span={24}>
            <Button style={styleBtnSave} disabled={jsonDoc.EstaGuardado} onClick={handleSubmit(onSubmit)}>Guardar</Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

function Main(this: any, {datos,recargar}:filesPaths) {
  const styleBtnAdd = {
     background: '#fff',
    color: '#885F7F',
    borderColor: '#fff',
    overflow: 'auto',
    height: 'auto',
    borderWidth: '2px'
  };

  const [jsonDoc, setjsonDoc] = useState(datos[0]);
  const [jsonList,setJsonList] = useState(datos);
  const [guardado, setGuardado] = useState(false);

  const handleMenuClick = (jsonObject) =>{
    setGuardado(jsonObject.EstaGuardado);
    setjsonDoc(jsonObject);
  }

  return (
    <>
      <Sider className="side-xml" width={220}>
        <Header style={{ background: '#885F7F', padding:'0 10px'  }}>
          <Button style={styleBtnAdd} onClick={()=> {recargar();}} icon={<UploadOutlined/>}>Recargar otros xml</Button>
        </Header>
        <Layout style={{overflowY:'scroll' }}>
        <Menu className='menuXml' style={{ width: 220,color:'#000'}}>
          {jsonList.map((item: any) => {
            return (
              <Tooltip placement="right" title={item.emisor.nombre}>
                <Menu.Item
                onClick={() => handleMenuClick(item)}
                style={item.EstaGuardado? {
                  background: '#cfd8dc',
                  height: '60px',
                  lineHeight: '20px',
                  marginBottom: '0px',
                  marginTop: '0px',
                  borderBottom: 'solid 1px #F0F0F0',
                  paddingTop: '10px',
                  color:'#90a4ae',
                  fontSize:'10px'
                } :
                {
                  background: '#FAFAFA',
                  height: '60px',
                  lineHeight: '20px',
                  marginBottom: '0px',
                  marginTop: '0px',
                  borderBottom: 'solid 1px #F0F0F0',
                  paddingTop: '10px',
                  fontSize:'10px'
                }
              }
                key={item.folio + item.serie}
              >
                {item.emisor.nombre}
                 {}
                <br />
                <span style={{ fontStyle: 'italic' }}>folio:{item.folio}</span>
              </Menu.Item>
              </Tooltip>
            );
          })}
        </Menu>
        </Layout>
      </Sider>
      <Layout style={{ overflow: 'auto' }}>

        <Content>
          <JsonTable json={jsonDoc} />
        </Content>
      </Layout>
      <Sider width={400}>
        <Layout style={{ overflow: 'auto', background: '#3E4652' }}>
          {!guardado &&
            <FormCapture jsonDoc={jsonDoc} setGuardado={setGuardado}></FormCapture>
          }
        </Layout>
      </Sider>
    </>
  );
}


const Uploader = ({rutas}:filesPaths) => {
  const propis = {
    beforeUpload: (file: { type: string; name: any; }) => {
      if (file.type !== 'text/xml') {
        message.error(`${file.name} el archivo no es un xml`);
      }
      return file.type === 'text/xml' ? true : Upload.LIST_IGNORE;
    },
    onChange: (info: { fileList  : any []}) => {
      rutas =  info.fileList.map((val:any) =>
        {
          return (val.originFileObj.path);
        });
      ipcrender.send('loadXmlMainProcess',rutas);
  }};

  return (
    <Dragger style={{height:"100%"}} fileList={[]} beforeUpload={propis.beforeUpload} onChange={propis.onChange}  multiple={true}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click o arrastra los XML a esta area para cargarlos a la aplicacion</p>
        <p className="ant-upload-hint">
          Solo se admiten archivos XML
        </p>
    </Dragger>
  );
};


const LayoutVerfication = ()=>  {

  const [jsoncfdi,setjsoncfdi] = useState([]);

  ipcrender.on('loadJsonCfdi', (event:any, xmlsload:any) => {
    setjsoncfdi(xmlsload);
  });

  const reload = ()=>{
    setjsoncfdi([]);
  }



  return (
        <Layout className="layoutMainVerification">
          {(jsoncfdi.length > 0) ? <Main datos={jsoncfdi} recargar={reload}/> : <Uploader rutas={[]} />}
        </Layout>
  );
}

export default LayoutVerfication;
