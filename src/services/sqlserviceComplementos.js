/* eslint-disable */
const Connection = require("tedious").Connection;
const Request = require("tedious").Request;
const {ipcMain} =  require('electron');
import unhandled from 'electron-unhandled';
const config = {
        server:'192.168.10.4',
        authentication:{
            type:'default',
            options:{
                userName :'Validacion',
                password:'desur$td350'
            }
        },
          options: {
            database: 'ValidacionesDB',
            encrypt: false,
            trustServerCertificate: false,
            rowCollectionOnDone: true
        }
    };

const connectToServer = () =>{
    return new Promise((resolve,reject) => {

    const connection =  new Connection(config);
    connection.connect();

    connection.on('connect', (err) => {
        if(err)
        {
          console.log('Error: ',err);
          reject(err);
        }
        else
        {
            console.log('Conexion exitosa');
            resolve(connection);
        }
    });

    connection.on('end',()=>{console.log('conexion temrinada')});

  });
};


/**
 * Leer datos de la base
 * @param connection objeto de coneccion utilizado para coneccion ala base de datos
 * @param sqlQuery cadena de consulta que se ejecutara en la base
 * @return Promise Objeto retornado con una coleccion de datos en su interior
 */

const readFromDb = (connection, sqlQuery)=> {
    return new Promise((resolve, reject)=> {
        let documentosxml = [];

        console.log("leyendo de la base de datos");

       const request =  new Request(sqlQuery, (err,rowCount,rows)=>{
            if(err)
            {
               reject(err);
            }
            else
            {
                // eslint-disable-next-line prefer-template
                console.log(rowCount + 'row(s) returned');
                resolve(documentosxml);
                connection.close();
            }
        })

        request.on('doneInProc',(rowCount,more,rows) =>{
            documentosxml = [];
            rows.map(row  => {
                const result = {};
                row.map(chilld => {
                    result[chilld.metadata.colName] = chilld.value
                    return undefined;
                });
                documentosxml.push(result);
                return undefined;
            })
        });
        connection.execSql(request);
    });
};

const  getDocuments = () =>{
    return new Promise((resolve,reject)=>{
        connectToServer().then(connection => {
            const sqlStr = 'SELECT TOP(100) * FROM Validacion.Complemento order by c_id desc';
            return readFromDb(connection,sqlStr);
        })
        .then(documentos => resolve(documentos))
        .catch(err => reject(err));
    });
};

const  getDocumentsByFolio = (folio) =>{
    return new Promise((resolve,reject)=>{
        connectToServer().then(connection => {
            const sqlStr = `SELECT * FROM Validacion.Complemento WHERE c_UUID = '${folio}'  ORDER BY c_id desc`;
            return readFromDb(connection,sqlStr);
        })
        .then(documentos => resolve(documentos))
        .catch(err => reject(err));
    });
};

const  getDocumentFacByFolio = (folio) =>{
    return new Promise((resolve,reject)=>{
        connectToServer().then(connection => {
            const sqlStr = `SELECT * FROM Validacion.Facturas WHERE FolioFiscal = '${folio}'  ORDER BY ID desc`;
            return readFromDb(connection,sqlStr);
        })
        .then(documentos => resolve(documentos))
        .catch(err => reject(err));
    });
};

const  getDocumentsByRfc = (rfc) =>{
    return new Promise((resolve,reject)=>{
        connectToServer().then(connection => {
            const sqlStr = `SELECT * FROM Validacion.Complemento WHERE c_RfcBeneficiadoBanco = '${rfc}'  ORDER BY c_id desc`;
            return readFromDb(connection,sqlStr);
        })
        .then(documentos => resolve(documentos))
        .catch(err => reject(err));
    });
};

const  getDocumentsByDates= (dates) =>{
    return new Promise((resolve,reject)=>{
        connectToServer().then(connection => {
            const sqlStr = `SELECT * FROM Validacion.Complemento WHERE c_FechaPago BETWEEN '${dates[0]}' AND '${dates[1]}' ORDER BY Fecha desc`;
            return readFromDb(connection,sqlStr);
        })
        .then(documentos => resolve(documentos))
        .catch(err => reject(err));
    });
};

// SQL: Commit Transaction (if no errors)
//--------------------------------------------------------------------------------

const commitTransaction = (connection) => {
  connection.commitTransaction((err) => {
    if (err) {
      console.log('commit transaction err: ', err);
    }
    console.log('commitTransaction() done!');
    console.log('DONE!');
    connection.close();
  });
}

// SQL: Rolling Back Transaction - due to errors during transaction process.
//--------------------------------------------------------------------------------

const rollbackTransaction = (connection,err) => {
  console.log('transaction err: ', err);
  connection.rollbackTransaction((er) => {
    if (er) {
      console.log('transaction rollback error: ', er);
    }
  });
  connection.close();
}

// SQL: Begin Transaction
//--------------------------------------------------------------------------------
const beginTransaction = (connection)=>{
  connection.beginTransaction((err) => {
    if (err) {
      // If error in begin transaction, roll back!
      rollbackTransaction(connection,err);
    } else {
      console.log('beginTransaction() done');
      // If no error, commit transaction!
      commitTransaction(connection);
    }
  });
}

// Insertar factura nueva
//---------------------------------------------------------------------------------------
const insertNewTransaccion = (connection,document) => {
  console.log(document);
   return new Promise((resolve,reject)=> {
      const sql = `INSERT INTO Validacion.Complemento VALUES(
      '${document.c_id_factura}',
      '${document.c_FechaPago}',
      '${document.c_Moneda}',
      '${document.c_NumOperacion}',
      '${document.c_RfcCtaOrdenanteBanco}',
      '${document.c_NomBancoOrdExt}',
      '${document.c_CtaOrdenante}',
      '${document.c_RfcCtaBeneficiadoBanco}',
      '${document.c_CtaBeneficiado}',
      '${document.c_TipoCadPago}',
      '${document.c_NodoDelDoc}',
      '${document.c_IdDoc}',
      '${document.c_serie}',
      '${document.c_folio}',
      '${document.c_MetodoPagoDR}',
      '${document.c_NoParcialidad}',
      '${document.c_ImporteSA}',
      '${document.c_ImportePago}',
      '${document.c_ImporteSI}',
      '${document.c_Observaciones}',
      '${document.c_Complemento}',
      '${document.c_Monto}',
      '${document.c_UUID}'
      )`;
       const request = new Request(sql, (err,rowCount) => {
        if (err) {
          console.log('No se guardo');
          reject(err);
        }
        // Call connection.beginTransaction() method in this 'new Request' call back function
        beginTransaction(connection);
        resolve(rowCount)
      });
      connection.execSql(request);
   })
}

// Actualiza factura
//---------------------------------------------------------------------------------------
const updateTransaccion = (connection,document) => {
   return new Promise((resolve,reject)=> {
      const sql = `UPDATE Validacion.Complemento
      SET
     c_id_factura = '${document.c_id_factura}',
     c_FechaPago = '${document.c_FechaPago}',
     c_Moneda = '${document.c_Moneda}',
     c_NumOperacion = '${document.c_NumOperacion}',
     c_RfcCtaOrdenanteBanco = '${document.c_RfcCtaOrdenanteBanco}',
     c_NomBancoOrdExt = '${document.c_NomBancoOrdExt}',
     c_CtaOrdenante = '${document.c_CtaOrdenante}',
     c_RfcCtaBeneficiadoBanco = '${document.c_RfcCtaBeneficiadoBanco}',
     c_CtaBeneficiado = '${document.c_CtaBeneficiado}',
     c_TipoCadPago = '${document.c_TipoCadPago}',
     c_NodoDelDoc = '${document.c_NodoDelDoc}',
     c_IdDoc = '${document.c_IdDoc}',
     c_serie = '${document.c_serie}',
     c_folio = '${document.c_folio}',
     c_MetodoPagoDR = '${document.c_MetodoPagoDR}',
     c_NoParcialidad = '${document.c_NoParcialidad}',
     c_ImporteSA = '${document.c_ImporteSA}',
     c_ImportePago = '${document.c_ImportePago}',
     c_ImporteSI = '${document.c_ImporteSI}',
     c_Observaciones = '${document.c_Observaciones}',
     c_Complemento = '${document.c_Complemento}',
     c_Monto = '${document.c_Monto}',
     c_UUID = '${document.c_UUID}'
      WHERE c_UUID = '${document.c_UUID}'
      `;
       const request = new Request(sql, (err,rowCount) => {
        if (err) {
          console.log('No se guardo');
          console.log(sql);
          reject(err);
        }
        // Call connection.beginTransaction() method in this 'new Request' call back function
        beginTransaction(connection);
        resolve(rowCount)
      });
      connection.execSql(request);
   })
}

ipcMain.handle('c_obtenertodos',async (event,arg)=> {
  let data =  await getDocuments();
  return  data;
});

ipcMain.handle('c_obtenerPorFolio',async (event,arg)=> {
  let data =  await getDocumentsByFolio(arg);
  return  data;
});

ipcMain.handle('c_obtenerPorRfc',async (event,arg)=> {
  let data =  await getDocumentsByRfc(arg);
  return  data;
});

ipcMain.handle('c_obtenerPorFecha',async (event,arg)=> {
  let data =  await getDocumentsByDates(arg);
  return  data;
});

ipcMain.handle('c_insertarnuevo', async (event,data) => {
  try {
        let dataExist = await getDocumentsByFolio(data.c_UUID);
        if(dataExist.length > 0)
        {return dataExist}
        else
        {  let result;
            for (var i = 0; i < data.docsRelacionados.length; i++) {
                let facExist = await getDocumentFacByFolio(data.docsRelacionados[i].idDocumento);
                if(facExist.length > 0)
                { data.c_id_factura = facExist[0].ID;
                  let tmpresult= connectToServer().then(connection => insertNewTransaccion(connection,data)).then((val)=>{console.log(val);return val}).catch((err)=> {console.log(err); return err;})
                  if(!Array.isArray(tmpresult))
                    {
                      result += tmpresult;
                    }
                  else
                  {
                    result = tmpresult;
                    break;
                  }
              }
              }
          return result;}
        }
  catch (error) {
          unhandled.logError(new Error(error), {title: 'Error'});
        }
});

ipcMain.handle('c_actualizarDocumento', async (event,data) => {let result= connectToServer().then(connection => updateTransaccion(connection,data)).then((val)=>{console.log(val);return val}).catch((err)=> {console.log(err); return err;})
   return result;
});
updateTransaccion
