/* eslint-disable */

import React,{useEffect, useState, useContext} from 'react';
import {
  Layout,
  Button,
  message,
  Form,
  Input,
  Row,
  Col,
  Switch,
  Divider,Select} from 'antd';
import { InboxOutlined,UploadOutlined } from '@ant-design/icons';
import {useForm,Controller} from 'react-hook-form';

const { Option } = Select;

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

// Formulario de actualizacion
// -----------------------------------------------------------

export const FormUpdate = ( {jsonDoc}:any ) => {

  const {register,handleSubmit,control, setValue, getValues} = useForm<Documento>();

  const onSubmit = () => {
    console.log(getValues());
  };

  useEffect(() => {
    console.log(jsonDoc);
    if (jsonDoc) {
      setValue( 'RfcEmpresa', jsonDoc.RfcEmpresa);
      setValue( 'Empresa', jsonDoc.Empresa);
      setValue( 'Folio', jsonDoc.Folio);
      setValue( 'Fecha', jsonDoc.Fecha);
      setValue( 'FolioFiscal', jsonDoc.FolioFiscal);
      setValue( 'Proveedor', jsonDoc.Proveedor);
      setValue( 'RfcProveedor', jsonDoc.RfcProveedor);
      setValue( 'Importe', jsonDoc.Importe);
    }
  }, [jsonDoc]);

  const handleUpdateFields = {

  }

  return(
     <>
      <Form
      className='formUpdate'
        layout="vertical"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 24}}
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
            name= "RfcEmpresa"
            render = {({field})=> <Input {... field}></Input>}
           />
        </Form.Item>
        <Form.Item label="Nombre" >
          <Controller
            control ={control}
            name= "Empresa"
            render = {({field})=> <Input {... field}></Input>}
           />
        </Form.Item>
        <Divider orientation="left">Factura</Divider>
        <Form.Item label="Fecha emision" >
          <Controller
            control ={control}
            name= "Fecha"
            render = {({field})=> <Input {... field}></Input>}
           />
        </Form.Item>
        <Form.Item label="Folio">
           <Controller
            control ={control}
            name= "Folio"
            render = {({field})=> <Input {... field}></Input>}
           />
        </Form.Item>
        <Form.Item label="Folio fiscal" >
          <Controller
            control ={control}
            name= "FolioFiscal"
            render = {({field})=> <Input {... field}></Input>}
           />
        </Form.Item>
        <Divider orientation="left">Proveedor</Divider>
        <Form.Item label="Nombre" >
          <Controller
            control ={control}
            name= "Proveedor"
            render = {({field})=> <Input {... field}></Input>}
           />
        </Form.Item>
        <Form.Item label="Rfc">
          <Controller
            control ={control}
            name= "RfcProveedor"
            render = {({field})=> <Input {... field}></Input>}
           />
        </Form.Item>
        <Form.Item label="Importe" >
          <Controller
            control ={control}
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
            <Button onClick={handleSubmit(onSubmit)}>Guardar</Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
