/* eslint-disable */
const Connection = require("tedious").Connection;
const Request = require("tedious").Request;
const {ipcMain} =  require('electron');

const config = {
        server:'192.168.10.4',
        authentication:{
            type:'default',
            options:{
                userName :'Validacion',
                password:'desur@td350'
            }
        },
          options: {
            database: 'ValidacionesDB',
            // These two settings are really important to make successfull connection
            encrypt: false,
            trustServerCertificate: false,
            // This will allow you to access the rows returned.
            // See 'doneInProc' event below
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
            const sqlStr = 'SELECT TOP(20) * FROM Validacion.Facturas order by Fecha desc';
            return readFromDb(connection,sqlStr);
        })
        .then(documentos => resolve(documentos))
        .catch(err => reject(err));
    });
};

const  getDocumentsByFolio = (folio) =>{
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
            const sqlStr = `SELECT * FROM Validacion.Facturas WHERE RfcProveedor = '${rfc}'  ORDER BY ID desc`;
            return readFromDb(connection,sqlStr);
        })
        .then(documentos => resolve(documentos))
        .catch(err => reject(err));
    });
};

const  getDocumentsByDates= (dates) =>{
    return new Promise((resolve,reject)=>{
        connectToServer().then(connection => {
            const sqlStr = `SELECT * FROM Validacion.Facturas WHERE Fecha BETWEEN '${dates[0]}' AND '${dates[1]}' ORDER BY Fecha desc`;
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
   return new Promise((resolve,reject)=> {
      const sql = `INSERT INTO Validacion.Facturas VALUES(
      '${document.Empresa}',
      '${document.RfcEmpresa}',
      '${document.FolioFiscal}',
      '${document.Folio}',
      '${document.Correo}',
      '${document.Fecha}',
      '${document.Proveedor}',
      '${document.RfcProveedor}',
      '${document.Importe}',
      '${document.CheckRfcProveedor}',
      '${document.CheckCP}',
      '${document.CheckRegFiscal}',
      '${document.CheckRfcCliente}',
      '${document.CheckUnidad}',
      '${document.CheckDescripcion}',
      '${document.CheckIvaDesglosado}',
      '${document.CheckUsoCFDI}',
      '${document.CheckMetodoPago}',
      '${document.CheckFormaPago}',
      '${document.CheckTipoCFDI}',
      '${document.EstatusPago}',
      '${document.Observaciones}',
      '${document.IvaDesglosado}',
      '${document.ProvicionFactura}'
      )`;
      console.log(sql);
       const request = new Request(sql, (err,rowCount) => {
        if (err) {
          console.log('Insert failed');
          reject(err);
        }

        console.log('new Request cb');
        // Call connection.beginTransaction() method in this 'new Request' call back function
        beginTransaction(connection);
      });
      connection.execSql(request);
   })
}

ipcMain.handle('obtenertodos',async (event,arg)=> {
  let data =  await getDocuments();
  return  data;
});

ipcMain.handle('obtenerPorFolio',async (event,arg)=> {
  let data =  await getDocumentsByFolio(arg);
  return  data;
});

ipcMain.handle('obtenerPorRfc',async (event,arg)=> {
  let data =  await getDocumentsByRfc(arg);
  return  data;
});

ipcMain.handle('obtenerPorFecha',async (event,arg)=> {
  let data =  await getDocumentsByDates(arg);
  return  data;
});

ipcMain.handle('insertarnuevo', (event,data) => {
    connectToServer().then(connection => insertNewTransaccion(connection,data)).catch((err)=> console.log(err))
});
