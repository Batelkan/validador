/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
const Connection = require("tedious").Connection;
const Request = require("tedious").Request;
const {ipcMain} =  require('electron');



const connectToServer = () =>{
    return new Promise((resolve,reject) => {
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
                // These two settings are really important to make successfull connection
                encrypt: false,
                trustServerCertificate: false,
                // This will allow you to access the rows returned.
                // See 'doneInProc' event below
                rowCollectionOnDone: true
            }
        };

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

const getDocuments = () =>{
    return new Promise((resolve,reject)=>{
        connectToServer().then(connection => {
            const sqlStr = 'SELECT TOP(20) * FROM Validacion.Facturas';
            return readFromDb(connection,sqlStr);
        })
        .then(documentos => resolve(documentos))
        .catch(err => reject(err));
    });
};

ipcMain.handle('obtenertodos',getDocuments);
