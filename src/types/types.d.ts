// eslint-disable-next-line @typescript-eslint/naming-convention
export interface filesPaths {
  rutas?: string[];
  // eslint-disable-next-line react/no-unused-prop-types
  datos?: any[];
  recargar?: () => void;
}

export interface Ijsonobject {
  jsonDoc: any;
  setGuardado?: any;
}

export interface Cdocumento {
  c_id: string;
  c_id_factura: string;
  c_FechaPago: boolean;
  c_Moneda: boolean;
  c_NumOperacion: boolean;
  c_RfcCtaOrdenanteBanco: boolean;
  c_NomBancoOrdExt: boolean;
  c_CtaOrdenante: boolean;
  c_RfcCtaBeneficiadoBanco: boolean;
  c_CtaBeneficiado: boolean;
  c_TipoCadPago: boolean;
  c_NodoDelDoc: boolean;
  c_IdDoc: boolean;
  c_serie: boolean;
  c_folio: boolean;
  c_MetodoPagoDR: boolean;
  c_NoParcialidad: boolean;
  c_ImporteSA: boolean;
  c_ImportePago: boolean;
  c_ImporteSI: boolean;
  c_Observaciones: string;
  c_Complemento: string;
  c_Monto: boolean;
  c_UUID: string;
  EstaGuardado: boolean;
  docsRelacionados: string[];
}

export interface Documento {
  ID: string;
  Empresa: string;
  RfcEmpresa: string;
  FolioFiscal: string;
  Folio: string;
  Correo: string;
  Fecha: string;
  Proveedor: string;
  RfcProveedor: string;
  Importe: string;
  CheckRfcProveedor: boolean;
  CheckCP: boolean;
  CheckRegFiscal: boolean;
  CheckRfcCliente: boolean;
  CheckIvaDesglosado: boolean;
  CheckUsoCFDI: boolean;
  CheckMetodoPago: boolean;
  CheckFormaPago: boolean;
  CheckTipoCFDI: boolean;
  CheckUnidad: boolean;
  CheckDescripcion: boolean;
  EstatusPago: string;
  Observaciones: string;
  IvaDesglosado: string;
  ProvicionFactura: string;
}
