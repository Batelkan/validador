/* eslint-disable */

import React,{useEffect, useState, useContext} from 'react';
import {
  Layout, Upload,
  message,} from 'antd';
import { InboxOutlined,UploadOutlined } from '@ant-design/icons';
import {JsonTable} from 'react-json-to-html';

const ipcrender = require('electron').ipcRenderer;
const { Dragger } = Upload;

export const Viewerjson = () => {

  const [document, setDocument] = useState();

  let rutas = [];

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
      ipcrender.send('reloadXmlMainProcess',rutas);
  }};

 ipcrender.on('loadSingleCfdii', (event:any, xmlsload:any) => {
    setDocument(xmlsload);
  });

 return(
    <Dragger style={{height:"100%"}} beforeUpload={propis.beforeUpload} onChange={propis.onChange}  multiple={false}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click o arrastra el XML a esta area para cargarlos</p>
        <p className="ant-upload-hint">
          Solo se admiten archivos XML
        </p>
     </Dragger>
 )
}
