/* eslint-disable prettier/prettier */
import React from 'react';
import { Layout, Menu,Button,Upload, message  } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Sider, Content,Header } = Layout;
const { Dragger } = Upload;



function Main() {
  const styleBtnAdd = {
    background: "#2C2F3E",
    color: "#CBD122",
    borderColor:"#CBD122"
  };
  // Correct! This use of <div> is legitimate because div is a valid HTML tag:
  return <>
        <Sider className="side-xml" width={200}>
          <Header style={{ background:'#2C2F3E'}}>
          <Button style={styleBtnAdd}>Agregar XML</Button>
          </Header>
          <Menu style={{ width: 200 }}>
              <Menu.Item style={{ background: "#FAFAFA", marginBottom :'0px',marginTop:'0px',borderBottom:"solid 1px #F0F0F0" }}  key="1">doc1</Menu.Item>
              <Menu.Item style={{ background: "#FAFAFA",marginBottom :'0px',marginTop:'0px',borderBottom:"solid 1px #F0F0F0" }}  key="2">doc1</Menu.Item>
            </Menu>
          </Sider>
          <Layout>
          <Content>Content</Content>
          </Layout>;
          </>;
}

function Uploader() {
  // Correct! This use of <div> is legitimate because div is a valid HTML tag:
  const propis = {
    beforeUpload: (file: { type: string; name: any; }) => {
      if (file.type !== 'text/xml') {
        message.error(`${file.name} el archivo no es un xml`);
      }
      return file.type === 'text/xml' ? true : Upload.LIST_IGNORE;
    },
    onChange: (info: { fileList: any; }) => {
      console.log(info.fileList);
    }}
  ;


  return (
    <Dragger style={{height:"100%"}} beforeUpload={propis.beforeUpload} onChange={propis.onChange} >
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


function layoutVerfication() {
  return (
    <>
      <Layout>
        <Sider width={70}>Sider</Sider>
        <Layout className="layoutMainVerification">
          <Uploader />
        </Layout>
      </Layout>
  </>
  );
}

export default layoutVerfication;
