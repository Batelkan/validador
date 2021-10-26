/* eslint-disable no-param-reassign */
/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
/* eslint-disable */
import React,{useState} from 'react';
import { filesPaths,Documento} from '../../../types/types';
import {
  Layout,
  Menu,
  Modal,
  Button,
  Tooltip} from 'antd';
import {UploadOutlined } from '@ant-design/icons';
import {JsonTable} from 'react-json-to-html';
import { Uploader } from './uploader';
import { FormCapture } from './form';

const ipcrender = require('electron').ipcRenderer;
const { Sider, Content,Header } = Layout;


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
    console.log(jsonDoc);
    console.log(jsonDoc.pagos.arrayPagos[0].docsRelacionados);
  }

  return (
    <>
      <Sider className="side-xml" width={220}>
        <Header style={{ background: '#885F7F',padding:'0 10px' }}>
          <Button style={styleBtnAdd} onClick={()=> {recargar();}} icon={<UploadOutlined/>}>Recargar otros xml</Button>
        </Header>
        <Layout style={{overflowY:'scroll' }}>
        <Menu className='menuXml' style={{ width: 220,color:'#000' }}>
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
      <Layout style={{ overflow: 'auto',fontSize:'smaller' }}>
        <Content>
          <JsonTable json={jsonDoc}  />
        </Content>
      </Layout>
      <Sider width={500}>
        <Layout style={{ overflow: 'auto', background: '#3E4652' }}>
          {!guardado &&
            <FormCapture jsonDoc={jsonDoc} setGuardado={setGuardado}></FormCapture>
          }
        </Layout>
      </Sider>
    </>
  );
}

const ClayoutVerfication = ()=>  {

  const [jsoncfdi,setjsoncfdi] = useState([]);
   ipcrender.on('cloadJsonCfdi', (event:any, xmlsload:any) => {
    let tempListCfdi = [] as any;
      for (var i = 0; i < xmlsload.length; i++) {
          if(xmlsload[i].tipoDeComprobante == 'P')
            {
              xmlsload[i].pagos.docsRelacionados =  xmlsload[i].pagos.arrayPagos[0].docsRelacionados;
              tempListCfdi.push(xmlsload[i]);
            }
        }

      if(tempListCfdi.length > 0)
        { setjsoncfdi(xmlsload); }
        else
        {
           Modal.error({
                 content: "No existe un complemento valido",
                 bodyStyle:{background:'#fff'},
                  className:"modalNotification",
                 width:100,
                  style: {
                  marginTop: '20vh',
                  },
              });
        }
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

export default ClayoutVerfication;
