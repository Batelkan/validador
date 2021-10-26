/* eslint-disable no-param-reassign */
/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
/* eslint-disable */
import React,{useEffect} from 'react';
import {useForm,Controller} from 'react-hook-form';
import { Ijsonobject,Cdocumento} from '../../../types/types';
import {
  Button,
  notification,
  Form,
  Input,
  Row,
  Col,
  Switch,
  Divider,
  Select,
  List,
  Modal,} from 'antd';

const ipcrender = require('electron').ipcRenderer;
const { Option } = Select;
let documentosFromDb : Cdocumento[] = [];

export const FormCapture = ({jsonDoc,setGuardado}: Ijsonobject) => {

  const {register,handleSubmit,control, setValue, getValues} = useForm<Cdocumento>();
  const onSubmit = () => {

    console.log(getValues());

   ipcrender.invoke('c_insertarnuevo',getValues()).then((res)=>{
       if(!Array.isArray(res))
       {  jsonDoc.EstaGuardado = true;
          setGuardado(true);
          console.log(jsonDoc);
            notification.success({
              message: 'Registro guardado',
              description:'Registro guardado con exito',
              duration:2

            });
       }else{
          jsonDoc.EstaGuardado = true;
          setGuardado(true);
             Modal.error({
                 content: `El documento ya existe,con el uuid '${res[0].c_UUID}', y la factura '${res[0].c_id_factura}'`,
                 bodyStyle:{background:'#fff'},
                  className:"modalNotification",
                 width:100,
                  style: {
                  marginTop: '20vh',
                  },
              });
       }
     });
  };

  const styleForm = {
    padding: '10px',
    paddingLeft: '10px',
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

   useEffect(() => {
    if (jsonDoc) {
     //Extrae facturas relacionadas
      var resArr = jsonDoc.pagos.docsRelacionados.map(function(x){
      return x[Object.keys(x)[0]];
      });
      setValue( 'c_Observaciones','');
      // TODO
      setValue( 'docsRelacionados',jsonDoc.pagos.docsRelacionados );
      setValue( 'c_id_factura', jsonDoc.folio);
      setValue( 'c_Complemento','Aplica');
      setValue( 'c_UUID', jsonDoc.timbreFiscal.uuid);
      setValue( 'c_FechaPago',false);
      setValue( 'c_Moneda',false);
      setValue( 'c_NumOperacion',false);
      setValue( 'c_CtaOrdenante',false);
      setValue( 'c_RfcCtaBeneficiadoBanco',false);
      setValue( 'c_RfcCtaOrdenanteBanco',false);
      setValue( 'c_NomBancoOrdExt',false);
      setValue( 'c_CtaBeneficiado',false);
      setValue( 'c_TipoCadPago',false);
      setValue( 'c_NodoDelDoc',false);
      setValue( 'c_IdDoc',false);
      setValue( 'c_serie',false);
      setValue( 'c_folio',false);
      setValue( 'c_MetodoPagoDR',false);
      setValue( 'c_NoParcialidad',false);
      setValue( 'c_ImporteSA',false);
      setValue( 'c_ImportePago',false);
      setValue( 'c_ImporteSI',false);
      setValue( 'c_Monto',false);
    }
  }, [jsonDoc]);

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
        <Form.Item label="ID complemento" >
           <Controller
            control ={control}
            name= "c_UUID"
            render = {({field})=> <Input {... field}></Input>}
           />
        </Form.Item>
         <Divider orientation="left">Facturas Relacionadas</Divider>
           <List
            size="small"
            bordered
            dataSource={jsonDoc.pagos.docsRelacionados}
            renderItem={(item:any) => <List.Item>{item.idDocumento}</List.Item>}
          />
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
            }} ></Switch>}
           />
            </Form.Item>
          </Col>

        </Row>
        <Form.Item  label="Complemento">
          <Controller
          control ={control}
          name="c_Complemento"
          render = {({field}) =>
                <Select {... field} placeholder="selecciona una opcion" allowClear>
                  <Option value="Aplica">Aplica</Option>
                  <Option value="No aplica">No Apĺica</Option>
                </Select>
            }
          />
        </Form.Item>
        <Form.Item label="Observaciones" >
          <Controller
            control ={control}
            name= "c_Observaciones"render = {({field: {onBlur,value,name}})=> <Input name={name} onChange={(e)=>{setValue( 'c_Observaciones',e.target.value);}} onBlur={onBlur} value={value} ></Input>}
           />
        </Form.Item>
        <Row>
          <Col span={24}>
            <Button style={styleBtnSave} disabled={jsonDoc.EstaGuardado} onClick={handleSubmit(onSubmit)}>Guardar</Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
