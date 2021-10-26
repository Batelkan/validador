/* eslint-disable */

import React,{useEffect, useState, useContext} from 'react';
import {Cdocumento} from '../../../types/types';
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

// Formulario de actualizacion
// -----------------------------------------------------------

export const FormUpdate = ( {jsonDoc,handleUpdateFields}:any, ) => {

  const {register,handleSubmit,control, setValue, getValues} = useForm<Cdocumento>();
  const [fechaDoc,setFechaDoc] = useState(String);
  const onSubmit = () => {
    console.log(getValues());
  };

  useEffect(() => {
    if (jsonDoc) {
      setValue( 'c_Observaciones',jsonDoc.c_Observaciones);
      setValue( 'c_id_factura',jsonDoc.c_id_factura);
      setValue( 'c_Complemento',jsonDoc.c_Complemento);
      setValue( 'c_UUID', jsonDoc.c_UUID);
      setValue( 'c_FechaPago',jsonDoc.c_FechaPago);
      setValue( 'c_Moneda',jsonDoc.c_Moneda);
      setValue( 'c_NumOperacion',jsonDoc.c_NumOperacion);
      setValue( 'c_CtaOrdenante',jsonDoc.c_CtaOrdenante);
      setValue( 'c_RfcCtaBeneficiadoBanco',jsonDoc.c_RfcCtaBeneficiadoBanco);
      setValue( 'c_RfcCtaOrdenanteBanco',jsonDoc.c_RfcCtaOrdenanteBanco);
      setValue( 'c_NomBancoOrdExt',jsonDoc.c_NomBancoOrdExt);
      setValue( 'c_CtaBeneficiado',jsonDoc.c_CtaBeneficiado);
      setValue( 'c_TipoCadPago',jsonDoc.c_TipoCadPago);
      setValue( 'c_NodoDelDoc',jsonDoc.c_NodoDelDoc);
      setValue( 'c_IdDoc',jsonDoc.c_IdDoc);
      setValue( 'c_serie',jsonDoc.c_serie);
      setValue( 'c_folio',jsonDoc.c_folio);
      setValue( 'c_MetodoPagoDR',jsonDoc.c_MetodoPagoDR);
      setValue( 'c_NoParcialidad',jsonDoc.c_NoParcialidad);
      setValue( 'c_ImporteSA',jsonDoc.c_ImporteSA);
      setValue( 'c_ImportePago',jsonDoc.c_ImportePago);
      setValue( 'c_ImporteSI',jsonDoc.c_ImporteSI);
      setValue( 'c_Monto',jsonDoc.c_Monto);
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
          <Form.Item label="ID complemento" >
           <Controller
            control ={control}
            name= "c_UUID"
            render = {({field: {onBlur,value,name}})=> <Input name={name} onChange={(e)=>{setValue( 'c_UUID',e.target.value); handleUpdateFields(e.target);}} onBlur={onBlur} value={value} ></Input>}
           />
        </Form.Item>
          <Form.Item label="Folio Complemento" >
           <Controller
            control ={control}
            name= "c_id_factura"
            render = {({field: {onBlur,value,name}})=> <Input name={name} onChange={(e)=>{setValue( 'c_id_factura',e.target.value); handleUpdateFields(e.target);}} onBlur={onBlur} value={value} ></Input>}
           />
        </Form.Item>
          <Divider orientation="left">Validaciones</Divider>
        <Row>
            <Col span={8}>
            <Form.Item label="Moneda" className="switchForm">
              <Controller
            control ={control}
            name= "c_Moneda"
            render = {({field:{value}})=> <Switch size='small' checked={value}
            onChange={(e)=>{
              setValue('c_Moneda',e);
              tmpSwitchson.name = 'c_Moneda';
              tmpSwitchson.value = e;
              handleUpdateFields(tmpSwitchson);
            }} ></Switch>}

           />
            </Form.Item>
          </Col>
           <Col span={8}>
            <Form.Item label="Monto" className="switchForm">
              <Controller
            control ={control}
            name= "c_Monto"
            render = {({field:{value}})=> <Switch checked={value} onChange={(e)=>{
              setValue('c_Monto',e);
              tmpSwitchson.name = 'c_Monto';
              tmpSwitchson.value = e;
              handleUpdateFields(tmpSwitchson);
            }} ></Switch>}
           />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Num Op." className="switchForm">
             <Controller
            control ={control}
            name= "c_NumOperacion"
            render = {({field:{value}})=> <Switch checked={value} onChange={(e)=>{
              setValue('c_NumOperacion',e);
               tmpSwitchson.name = 'c_NumOperacion';
              tmpSwitchson.value = e;
              handleUpdateFields(tmpSwitchson);
            }} ></Switch>}
           />
            </Form.Item>
          </Col>
        </Row>
        <Row>
           <Col span={8}>
            <Form.Item label="Rfc Emisor Cta Ordenante" className="switchForm">
             <Controller
            control ={control}
            name= "c_RfcCtaOrdenanteBanco"
            render = {({field:{value}})=> <Switch checked={value} onChange={(e)=>{
              setValue('c_RfcCtaOrdenanteBanco',e);
               tmpSwitchson.name = 'c_RfcCtaOrdenanteBanco';
              tmpSwitchson.value = e;
              handleUpdateFields(tmpSwitchson);
            }} ></Switch>}
           />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Nom Banco Ordenante" className="switchForm">
             <Controller
            control ={control}
            name= "c_NomBancoOrdExt"
            render = {({field:{value}})=> <Switch checked={value} onChange={(e)=>{
              setValue('c_NomBancoOrdExt',e);
               tmpSwitchson.name = 'c_NomBancoOrdExt';
              tmpSwitchson.value = e;
              handleUpdateFields(tmpSwitchson);
            }} ></Switch>}
           />
            </Form.Item>
          </Col>
            <Col span={8}>
            <Form.Item label="Cta Ordenante" className="switchForm">
             <Controller
            control ={control}
            name= "c_CtaOrdenante"
            render = {({field:{value}})=> <Switch checked={value} onChange={(e)=>{
              setValue('c_CtaOrdenante',e);
               tmpSwitchson.name = 'c_CtaOrdenante';
              tmpSwitchson.value = e;
              handleUpdateFields(tmpSwitchson);
            }} ></Switch>}
           />
            </Form.Item>
          </Col>
        </Row>
        <Row>
           <Col span={8}>
            <Form.Item label="Rfc Emisor Cta Benef" className="switchForm">
              <Controller
            control ={control}
            name= "c_RfcCtaBeneficiadoBanco"
            render = {({field:{value}})=> <Switch checked={value} onChange={(e)=>{
              setValue('c_RfcCtaBeneficiadoBanco',e);
               tmpSwitchson.name = 'c_RfcCtaBeneficiadoBanco';
              tmpSwitchson.value = e;
              handleUpdateFields(tmpSwitchson);
            }} ></Switch>}
           />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Cta Beneficiario" className="switchForm">
            <Controller
            control ={control}
            name= "c_CtaBeneficiado"
            render = {({field:{value}})=> <Switch checked={value} onChange={(e)=>{
              setValue('c_CtaBeneficiado',e);
               tmpSwitchson.name = 'c_CtaBeneficiado';
              tmpSwitchson.value = e;
              handleUpdateFields(tmpSwitchson);
            }} ></Switch>}
           />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Tipo Cat Pago" className="switchForm">
              <Controller
              control ={control}
              name= "c_TipoCadPago"
              render = {({field:{value}})=> <Switch checked={value} onChange={(e)=>{
              setValue('c_TipoCadPago',e);
               tmpSwitchson.name = 'c_TipoCadPago';
              tmpSwitchson.value = e;
              handleUpdateFields(tmpSwitchson);
            }} ></Switch>}
           />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item label="Fecha Pago"  className="switchForm">
             <Controller
            control ={control}
            name= "c_FechaPago"
            render = {({field:{value}})=> <Switch checked={value} onChange={(e)=>{
              setValue('c_FechaPago',e);
               tmpSwitchson.name = 'c_FechaPago';
              tmpSwitchson.value = e;
              handleUpdateFields(tmpSwitchson);
            }} ></Switch>}
           />
            </Form.Item>
          </Col>
           <Col span={8}>
            <Form.Item label="Nodo Doc Relacionado" className="switchForm">
              <Controller
            control ={control}
            name= "c_NodoDelDoc"
            render = {({field:{value}})=> <Switch checked={value} onChange={(e)=>{
              setValue('c_NodoDelDoc',e);
               tmpSwitchson.name = 'c_NodoDelDoc';
              tmpSwitchson.value = e;
              handleUpdateFields(tmpSwitchson);
            }} ></Switch>}
           />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Id Documento" className="switchForm">
              <Controller
            control ={control}
            name= "c_IdDoc"
            render = {({field:{value}})=> <Switch checked={value} onChange={(e)=>{
              setValue('c_IdDoc',e);
               tmpSwitchson.name = 'c_IdDoc';
              tmpSwitchson.value = e;
              handleUpdateFields(tmpSwitchson);
            }} ></Switch>}
           />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item label="Serie" className="switchForm">
             <Controller
            control ={control}
            name= "c_serie"
            render = {({field:{value}})=> <Switch checked={value} onChange={(e)=>{
              setValue('c_serie',e);
               tmpSwitchson.name = 'c_serie';
              tmpSwitchson.value = e;
              handleUpdateFields(tmpSwitchson);
            }} ></Switch>}
           />
            </Form.Item>
          </Col>
           <Col span={8}>
            <Form.Item label="Folio" className="switchForm">
             <Controller
            control ={control}
            name= "c_folio"
            render = {({field:{value}})=> <Switch checked={value} onChange={(e)=>{
              setValue('c_folio',e);
               tmpSwitchson.name = 'c_folio';
              tmpSwitchson.value = e;
              handleUpdateFields(tmpSwitchson);
            }} ></Switch>}
           />
            </Form.Item>
          </Col>
           <Col span={8}>
            <Form.Item label="Metodo Pago DR" className="switchForm">
              <Controller
              control ={control}
              name= "c_MetodoPagoDR"
              render = {({field:{value}})=> <Switch checked={value} onChange={(e)=>{
              setValue('c_MetodoPagoDR',e);
               tmpSwitchson.name = 'c_MetodoPagoDR';
              tmpSwitchson.value = e;
              handleUpdateFields(tmpSwitchson);
            }} ></Switch>}
           />
            </Form.Item>
          </Col>
        </Row>
        <Row>
           <Col span={8}>
            <Form.Item label="No de Parcialidad" className="switchForm">
              <Controller
            control ={control}
            name= "c_NoParcialidad"
            render = {({field:{value}})=> <Switch checked={value} onChange={(e)=>{
              setValue('c_NoParcialidad',e);
               tmpSwitchson.name = 'c_NoParcialidad';
              tmpSwitchson.value = e;
              handleUpdateFields(tmpSwitchson);
            }} ></Switch>}
           />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Importe Saldo Anterior" className="switchForm">
              <Controller
            control ={control}
            name= "c_ImporteSA"
            render = {({field:{value}})=> <Switch checked={value} onChange={(e)=>{
              setValue('c_ImporteSA',e);
               tmpSwitchson.name = 'c_ImporteSA';
              tmpSwitchson.value = e;
              handleUpdateFields(tmpSwitchson);
            }} ></Switch>}
           />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Importe Pagado" className="switchForm">
              <Controller
              control ={control}
              name= "c_ImportePago"
              render = {({field:{value}})=> <Switch checked={value} onChange={(e)=>{
              setValue('c_ImportePago',e);
               tmpSwitchson.name = 'c_ImportePago';
              tmpSwitchson.value = e;
              handleUpdateFields(tmpSwitchson);
            }} ></Switch>}
           />
            </Form.Item>
          </Col>
        </Row>
         <Row>

          <Col span={8}>
            <Form.Item label="Imp Saldo Insoluto" className="switchForm">
              <Controller
            control ={control}
            name= "c_ImporteSI"
            render = {({field:{value}})=> <Switch checked={value} onChange={(e)=>{
              setValue('c_ImporteSI',e);
               tmpSwitchson.name = 'c_ImporteSI';
              tmpSwitchson.value = e;
              handleUpdateFields(tmpSwitchson);
            }} ></Switch>}
           />
            </Form.Item>
          </Col>

        </Row>
        <Form.Item  label="Complemento">
          <Controller
          control ={control}
          name="c_Complemento"
          render = {({field:{value}}) =>
                <Select
                value={value} onChange={(e)=>{
                setValue( 'c_Complemento',e);
                tmpSelectJson.name = 'c_Complemento';
                tmpSelectJson.value = e;
                handleUpdateFields(tmpSelectJson);}}
                allowClear>
                  <Option value="Aplica">Aplica</Option>
                  <Option value="No aplica">No Apĺica</Option>
                </Select>
            }/>
        </Form.Item>
        <Form.Item label="Observaciones" >
          <Controller
            control ={control}
            name= "c_Observaciones" render = {({field: {onBlur,value,name}})=> <Input name={name} onChange={(e)=>{setValue( 'c_Observaciones',e.target.value);handleUpdateFields(e.target);}} onBlur={onBlur} value={value} ></Input>}
           />
        </Form.Item>
      </Form>
    </>
  );
}
