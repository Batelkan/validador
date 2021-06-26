/* eslint-disable prettier/prettier */
import React from 'react';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

function layoutSkeleton() {
  return (
    <>
      <Layout>
        <Sider width={200}>Sider</Sider>
        <Layout>
          <Sider className="side-xml">Sider</Sider>
          <Layout>
            <Header>Header</Header>
            <Content>Content</Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default layoutSkeleton;
