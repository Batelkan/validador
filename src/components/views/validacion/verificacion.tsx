/* eslint-disable no-param-reassign */
/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
/* eslint-disable */
import React,{useState,useEffect} from 'react';
import {
  Layout,
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
  Divider,Select} from 'antd';
import { InboxOutlined,UploadOutlined } from '@ant-design/icons';
import {JsonTable} from 'react-json-to-html';
import {useForm,Controller} from 'react-hook-form';

const ipcrender = require('electron').ipcRenderer;
const { Sider, Content,Header } = Layout;
const { Dragger } = Upload;
const { Option } = Select;

// eslint-disable-next-line @typescript-eslint/naming-convention
interface filesPaths {
 rutas? :  string[];
 ruta? : string;
 // eslint-disable-next-line react/no-unused-prop-types
 datos? : any[];
}

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
  EstadusPago : string,
  Observaciones : string,
  IvaDesglosado : string,
  ProvicionFactura: string,
  Estatus : string
}

let documentosFromDb : Documento[] = [];

function FormCapture({ jsonDoc }: Ijsonobject) {

  const {register,handleSubmit,watch,control,formState:{errors}} = useForm<Documento>();

  const onSubmit = (data : Documento) => console.log(data);

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
          <Col span={16}>
            <Form.Item label="Reg Fiscal Proveedor" className="switchForm">
             <Controller
            control ={control}
            name= "CheckRegFiscal"
            render = {({field})=> <Switch {... field}></Switch>}
           />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="Iva desglosado" label="Iva pesglosado">
          <Select placeholder="selecciona una opcion" allowClear>
            <Option value="correcto">Correcto</Option>
            <Option value="incorrecto">Incorrecto</Option>
            <Option value="no aplica">No Aplica</Option>
          </Select>
        </Form.Item>
        <Form.Item name="Provicion" label="Provicion">
          <Select placeholder="selecciona una opcion" allowClear>
            <Option value="provicionado">Provicionado</Option>
            <Option value="no aplica">No Aplica</Option>
            <Option value="pedir cancelacion">Pedir Cancelacion</Option>
            <Option value="CANCELADA">Cancelada</Option>
            <Option value="POR CANCELAR BUZON">Por cancelar</Option>
            <Option value="EN BUZON CANCELADO">En buzon cancelado</Option>
          </Select>
        </Form.Item>
          <Form.Item label="Estatus" >
          <Controller
            control ={control}
            name= "Estatus"
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
            <Button style={styleBtnSave} onClick={handleSubmit(onSubmit)}>Guardar</Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

function Main(this: any, {datos,rutas}:filesPaths) {

  const styleBtnAdd = {
    background: "#2C2F3E",
    color: "#CBD122",
    borderColor:"#CBD122",
    alignItem :"center",
    overflow : "auto"
  };

  const [jsonDoc, setjsonDoc] = useState(datos[0]);
  const [jsonList,setJsonList] = useState(datos);

  const handleMenuClick = (jsonObject) =>{
    console.log(jsonObject);
    setjsonDoc(jsonObject);
  }

  const propUpload = {
    beforeUpload: (file: { type: string; name: any; }) => {
      if (file.type !== 'text/xml') {
        message.error(`${file.name} el archivo no es un xml`);
      }
      return file.type === 'text/xml' ? true : Upload.LIST_IGNORE;
    },
    onChange: (info : any) => {
      if (info.file.status === 'done') {
         rutas=[];
          rutas =  info.fileList.map((val:any) =>
          {
            return (val.originFileObj.path);
          });
          ipcrender.send('reloadXmlMainProcess', rutas);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
  }};

   ipcrender.on('loadSingleCfdi', (event: any, xmlsload: any) => {
     console.log(xmlsload);
      xmlsload.map((item:any)=>{
        datos?.push(item);
        setJsonList(datos);
      })
   });

  return (
    <>
      <Sider className="side-xml" width={300}>
        <Header style={{ background: '#2C2F3E' }}>
          <Upload {... propUpload} multiple={true} >
            <Button style={styleBtnAdd} icon={<UploadOutlined/>}>Agregar XML</Button>
          </Upload>
        </Header>
        <Menu style={{ width: 300 }}>
          {jsonList.map((item: any) => {
            return (
              <Menu.Item
                onClick={() => handleMenuClick(item)}
                //onClick={this.handleMenuClick.bind(this, item)}
                style={{
                  background: '#FAFAFA',
                  height: '60px',
                  lineHeight: '20px',
                  marginBottom: '0px',
                  marginTop: '0px',
                  borderBottom: 'solid 1px #F0F0F0',
                  paddingTop: '10px',
                }}
                key={item.folio + item.serie}
              >
                {item.emisor.nombre}
                <br />
                <span style={{ fontStyle: 'italic' }}>folio:{item.folio}</span>
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
      <Layout style={{ overflow: 'auto' }}>
        <Content>
          <JsonTable json={jsonDoc} />
        </Content>
      </Layout>
      ;
      <Sider width={400}>
        <Layout style={{ overflow: 'auto', background: '#3E4652' }}>
          <FormCapture jsonDoc={jsonDoc}></FormCapture>
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
    <Dragger style={{height:"100%"}} beforeUpload={propis.beforeUpload} onChange={propis.onChange}  multiple={true}>
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

  return (
    <>
      <Layout>
        <Sider width={50}>Sider</Sider>
        <Layout className="layoutMainVerification">
          {(jsoncfdi.length > 0) ? <Main datos={jsoncfdi}/> : <Uploader rutas={[]} />}
        </Layout>
      </Layout>
    </>
  );
}

export default LayoutVerfication;
