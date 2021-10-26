/* eslint-disable */

import React,{useEffect, useState, useContext} from 'react';
import {
  Layout, Upload,
  message,} from 'antd';
import { InboxOutlined,UploadOutlined } from '@ant-design/icons';
import {JsonTable} from 'react-json-to-html';

const ipcrender = require('electron').ipcRenderer;
const { Dragger } = Upload;

export const Viewerjson = ( isCloseModal: any) => {

  const [document, setDocument] = useState({});


  const propis = {

    beforeUpload: (file: { type: string; name: any; }) => {

      if (file.type !== 'text/xml') {
        message.error(`${file.name} el archivo no es un xml`);
      }
      return file.type === 'text/xml' ? true : Upload.LIST_IGNORE;
    },
    onChange: (info: { file : any ,fileList  : any []}) => {
      const { status } = info.file;
      if(status === 'done')
      {
         let rutas: any[];
         rutas = info.fileList.map((val: any) => {
           return val.originFileObj.path;
         });
         ipcrender.send('reloadXmlMainProcess', rutas);
      }
  }};

  const isJsonEmpty = (obj) => {
    return !Object.keys(obj).length;
  }

 ipcrender.once('loadSingleCfdi', (event: any, xmlsload: any[]) => {
   setDocument(xmlsload[0]);
   ipcrender.removeAllListeners('loadSingleCfdi');
 });

  useEffect(()=>{
    return (()=>{setDocument({});});
  },[isCloseModal]);

 return (
   <>
     {!isJsonEmpty(document) ? (
       <JsonTable json={document} />
     ) : (
       <Dragger
         maxCount={1}
         showUploadList={false}
         style={{ height: '100%' }}
         beforeUpload={propis.beforeUpload}
         onChange={propis.onChange}
         multiple={false}
       >
         <p className="ant-upload-drag-icon">
           <InboxOutlined />
         </p>
         <p className="ant-upload-text">
           Click o arrastra el XML si deseas visualizar el contenido del
           documento facilmente
         </p>
         <p className="ant-upload-hint">Solo se admiten archivos XML</p>
       </Dragger>
     )}
   </>
 );
}
