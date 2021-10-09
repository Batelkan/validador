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
  DatePicker,
  Divider,Select} from 'antd';
import { InboxOutlined,UploadOutlined } from '@ant-design/icons';
import {useForm,Controller} from 'react-hook-form';
import moment from 'moment';

const { Option } = Select;
const tmpDateJson = {name:'Fecha',value:''};
const tmpSelectJson = {name:'',value:''};
const tmpSwitchson = {name:'',value:false};
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

export const FormUpdate = ( {jsonDoc,handleUpdateFields}:any, ) => {

  const {register,handleSubmit,control, setValue, getValues} = useForm<Documento>();
  const [fechaDoc,setFechaDoc] = useState(String);
  const onSubmit = () => {
    console.log(getValues());
  };

  useEffect(() => {
    if (jsonDoc) {
      setValue( 'Correo', jsonDoc.Correo);
      setValue( 'RfcEmpresa', jsonDoc.RfcEmpresa);
      setValue( 'Empresa', jsonDoc.Empresa);
      setValue( 'Folio', jsonDoc.Folio);
      setValue( 'FolioFiscal', jsonDoc.FolioFiscal);
      setValue( 'Proveedor', jsonDoc.Proveedor);
      setValue( 'RfcProveedor', jsonDoc.RfcProveedor);
      setValue( 'Importe', jsonDoc.Importe);
      setValue( 'CheckRfcProveedor',jsonDoc.CheckRfcProveedor);
      setValue( 'CheckCP',jsonDoc.CheckCP);
      setValue( 'CheckRegFiscal',jsonDoc.CheckRegFiscal);
      setValue( 'CheckRfcCliente',jsonDoc.CheckRfcCliente);
      setValue( 'CheckIvaDesglosado',jsonDoc.CheckIvaDesglosado);
      setValue( 'CheckUsoCFDI',jsonDoc.CheckUsoCFDI);
      setValue( 'CheckMetodoPago',jsonDoc.CheckMetodoPago);
      setValue( 'CheckFormaPago',jsonDoc.CheckFormaPago);
      setValue( 'CheckTipoCFDI',jsonDoc.CheckTipoCFDI);
      setValue( 'CheckUnidad',jsonDoc.CheckUnidad);
      setValue( 'CheckDescripcion',jsonDoc.CheckDescripcion);
      setValue( 'EstatusPago',jsonDoc.EstatusPago);
      setValue( 'Observaciones',jsonDoc.Observaciones);
      setValue( 'IvaDesglosado',jsonDoc.IvaDesglosado);
      setValue( 'ProvicionFactura',jsonDoc.ProvicionFactura);
      setFechaDoc(moment(jsonDoc.Fecha).format('YYYY/MM/DD').toString());
    }
  }, [jsonDoc]);



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
            render = {({field: {onBlur,value,name}})=> <Input name={name} onChange={(e)=>{setValue( 'Correo',e.target.value); handleUpdateFields(e.target);}} onBlur={onBlur} value={value} ></Input>}
           />
        </Form.Item>
        <Form.Item label="Rfc"  >
           <Controller
            control ={control}
            name= "RfcEmpresa"
            render = {({field: {onBlur,value,name}})=> <Input name={name} onChange={(e)=>{setValue( 'RfcEmpresa',e.target.value); handleUpdateFields(e.target);}} onBlur={onBlur} value={value} ></Input>}
           />
        </Form.Item>
        <Form.Item label="Nombre" >
          <Controller
            control ={control}
            name= "Empresa"
            render = {({field: {onBlur,value,name}})=> <Input name={name} onChange={(e)=>{setValue( 'Empresa',e.target.value); handleUpdateFields(e.target);}} onBlur={onBlur} value={value} ></Input>}
           />
        </Form.Item>
        <Divider orientation="left">Factura</Divider>
        <Form.Item label="Fecha emision" >
          <DatePicker onChange={(date,dateString)=>{
            if(dateString !== null)
               {
                 setFechaDoc(dateString.substring(0,10).replaceAll("-", "/"));
                 tmpDateJson.value = dateString;
                 handleUpdateFields(tmpDateJson);
               }
              }
            } value={moment(jsonDoc.Fecha,'YYYY/MM/DD')} format={'YYYY/MM/DD'} picker="date"/>
        </Form.Item>
        <Form.Item label="Folio">
           <Controller
            control ={control}
            name= "Folio"
            render = {({field: {onBlur,value,name}})=> <Input name={name} onChange={(e)=>{setValue( 'Folio',e.target.value); handleUpdateFields(e.target);}} onBlur={onBlur} value={value} ></Input>}
           />
        </Form.Item>
        <Form.Item label="Folio fiscal" >
          <Controller
            control ={control}
            name= "FolioFiscal"
            render = {({field: {onBlur,value,name}})=> <Input name={name} onChange={(e)=>{setValue( 'FolioFiscal',e.target.value); handleUpdateFields(e.target);}} onBlur={onBlur} value={value} ></Input>}
           />
        </Form.Item>
        <Divider orientation="left">Proveedor</Divider>
        <Form.Item label="Nombre" >
          <Controller
            control ={control}
            name= "Proveedor"
           render = {({field: {onBlur,value,name}})=> <Input name={name} onChange={(e)=>{setValue( 'Proveedor',e.target.value); handleUpdateFields(e.target);}} onBlur={onBlur} value={value} ></Input>}
           />
        </Form.Item>
        <Form.Item label="Rfc Proveedor">
          <Controller
            control ={control}
            name= "RfcProveedor"
            render = {({field: {onBlur,value,name}})=> <Input name={name} onChange={(e)=>{setValue( 'RfcProveedor',e.target.value); handleUpdateFields(e.target);}} onBlur={onBlur} value={value} ></Input>}
           />
        </Form.Item>
        <Form.Item label="Importe" >
          <Controller
            control ={control}
            name= "Importe"
            render = {({field: {onBlur,value,name}})=> <Input name={name} onChange={(e)=>{setValue( 'Importe',e.target.value); handleUpdateFields(e.target);}} onBlur={onBlur} value={value} ></Input>}
           />
        </Form.Item>
        <Row>
          <Col span={8}>
            <Form.Item label="Rfc Proveedor"  className="switchForm">
             <Controller
            control ={control}
            name= "CheckRfcProveedor"
            render = {({field:{value}})=><Switch checked={value}
            onChange={(e)=>{
              setValue('CheckRfcProveedor',e);
              tmpSwitchson.name = 'CheckRfcProveedor';
              tmpSwitchson.value = e;
              handleUpdateFields(tmpSwitchson);
            }} ></Switch>}
            />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Rfc Cliente" className="switchForm">
              <Controller
            control ={control}
            name= "CheckRfcCliente"
             render = {({field:{value}})=><Switch checked={value}
            onChange={(e)=>{
              setValue('CheckRfcCliente',e);
              tmpSwitchson.name = 'CheckRfcCliente';
              tmpSwitchson.value = e;
              handleUpdateFields(tmpSwitchson);
            }} ></Switch>}
            />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Uso cfdi" className="switchForm">
             <Controller
            control ={control}
            name= "CheckUsoCFDI"
             render = {({field:{value}})=><Switch checked={value}
            onChange={(e)=>{
              setValue('CheckUsoCFDI',e);
              tmpSwitchson.name = 'CheckUsoCFDI';
              tmpSwitchson.value = e;
              handleUpdateFields(tmpSwitchson);
            }} ></Switch>}
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
             render = {({field:{value}})=><Switch checked={value}
            onChange={(e)=>{
              setValue('CheckTipoCFDI',e);
              tmpSwitchson.name = 'CheckTipoCFDI';
              tmpSwitchson.value = e;
              handleUpdateFields(tmpSwitchson);
            }} ></Switch>}
            />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="C.P. proverdor" className="switchForm">
              <Controller
            control ={control}
            name= "CheckCP"
             render = {({field:{value}})=><Switch checked={value}
            onChange={(e)=>{
              setValue('CheckCP',e);
              tmpSwitchson.name = 'CheckCP';
              tmpSwitchson.value = e;
              handleUpdateFields(tmpSwitchson);
            }} ></Switch>}
            />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Cod Unidad" className="switchForm">
            <Controller
            control ={control}
            name= "CheckUnidad"
            render = {({field:{value}})=><Switch checked={value}
            onChange={(e)=>{
              setValue('CheckUnidad',e);
              tmpSwitchson.name = 'CheckUnidad';
              tmpSwitchson.value = e;
              handleUpdateFields(tmpSwitchson);
            }} ></Switch>}
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
              render = {({field:{value}})=><Switch checked={value}
            onChange={(e)=>{
              setValue('CheckDescripcion',e);
              tmpSwitchson.name = 'CheckDescripcion';
              tmpSwitchson.value = e;
              handleUpdateFields(tmpSwitchson);
            }} ></Switch>}
           />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Forma Pago" className="switchForm">
              <Controller
            control ={control}
            name= "CheckFormaPago"
            render = {({field:{value}})=><Switch checked={value}
            onChange={(e)=>{
              setValue('CheckFormaPago',e);
              tmpSwitchson.name = 'CheckFormaPago';
              tmpSwitchson.value = e;
              handleUpdateFields(tmpSwitchson);
            }} ></Switch>}
           />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Metodo Pago" className="switchForm">
              <Controller
              control ={control}
              name= "CheckMetodoPago"
              render = {({field:{value}})=><Switch checked={value}
            onChange={(e)=>{
              setValue('CheckMetodoPago',e);
              tmpSwitchson.name = 'CheckMetodoPago';
              tmpSwitchson.value = e;
              handleUpdateFields(tmpSwitchson);
            }} ></Switch>}
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
              render = {({field:{value}})=><Switch checked={value}
            onChange={(e)=>{
              setValue('CheckRegFiscal',e);
              tmpSwitchson.name = 'CheckRegFiscal';
              tmpSwitchson.value = e;
              handleUpdateFields(tmpSwitchson);
            }} ></Switch>}
           />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Iva desglosado" className="switchForm">
             <Controller
              control ={control}
              name= "CheckIvaDesglosado"
              render = {({field:{value}})=><Switch checked={value}
            onChange={(e)=>{
              setValue('CheckIvaDesglosado',e);
              tmpSwitchson.name = 'CheckIvaDesglosado';
              tmpSwitchson.value = e;
              handleUpdateFields(tmpSwitchson);
            }} ></Switch>}
           />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item  label="Iva pesglosado">
          <Controller
          control ={control}
          name="IvaDesglosado"
          render = {({field:{value}}) =>
                <Select value={value} onChange={(e)=>{
                  setValue( 'IvaDesglosado',e);
                  tmpSelectJson.name = 'IvaDesglosado';
                  tmpSelectJson.value = e;
                  handleUpdateFields(tmpSelectJson);
                }} placeholder="selecciona una opcion" allowClear>
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
          render = {({field:{value}}) =>
                <Select value={value} onChange={(e)=>{
                  setValue( 'ProvicionFactura',e);
                  tmpSelectJson.name = 'ProvicionFactura';
                  tmpSelectJson.value = e;
                  handleUpdateFields(tmpSelectJson);}}
                  placeholder="selecciona una opcion" allowClear>
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
            render = {({field: {onBlur,value,name}})=> <Input name={name} onChange={(e)=>{setValue( 'EstatusPago',e.target.value); handleUpdateFields(e.target);}} onBlur={onBlur} value={value} ></Input>}
           />
        </Form.Item>
            <Form.Item label="Observaciones" >
          <Controller
            control ={control}
            name= "Observaciones"
             render = {({field: {onBlur,value,name}})=> <Input name={name} onChange={(e)=>{setValue( 'Observaciones',e.target.value); handleUpdateFields(e.target);}} onBlur={onBlur} value={value} ></Input>}
           />
        </Form.Item>
      </Form>
    </>
  );
}
