/* eslint-disable no-param-reassign */
/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
/* eslint-disable */
import React,{useEffect, useState, useContext} from 'react';
import { filesPaths} from '../../../types/types';
import {Upload,message,Modal} from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
const ipcrender = require('electron').ipcRenderer;
let onceUpload = false;

export const Uploader = ({rutas}:filesPaths) => {
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
    ipcrender.send('cloadXmlMainProcess',rutas);

  }};

  return (
    <Dragger style={{height:"100%"}} fileList={[]} beforeUpload={propis.beforeUpload} onChange={propis.onChange}  multiple={true}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click o arrastra los Complementos a esta area para cargarlos a la aplicacion</p>
        <p className="ant-upload-hint">
          Solo se admiten archivos XML
        </p>
    </Dragger>
  );
};
