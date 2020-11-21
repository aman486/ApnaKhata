import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('Apnakhata.db');

export const init1 = async() =>{
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS payementrecord (userid INTEGER NOT NULL, advance REAL NOT NULL, borrow REAL NOT NULL, date string NOT NULL );',
        [],
       
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
}

export const init = () => {
  
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS apnakhata (userid INTEGER PRIMARY KEY NOT NULL,username TEXT NOT NULL, advance REAL NOT NULL, borrow REAL NOT NUll );',
        [],
        // 'CREATE TABLE IF NOT EXISTS payementrecord (userid INTEGER NOT NULL, advance REAL NOT NULL, borrow REAL NOT NULL );',
        // [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};


const insertTuple = async(userid,name,amount,amountType) => {
  let advance  = 0
  let borrow = 0
  if(amountType ==='advance'){
    advance=amount
  }
  else{
    borrow=amount
  }
  const promise = new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO apnakhata (userid,username,advance,borrow) VALUES (?,?,?,?);`,
          [userid,name,advance,borrow],
          (_, result) => {
            resolve(result);
          },
          (_, err) => {
            reject(err);
          }
        );
      });
    });
    return promise; 
};


const updateTuple = async(userid,amount,amountType) => {
  let advance  = 0
  let borrow = 0
  if(amountType ==='advance'){
    advance=amount
  }
  else{
    borrow=amount
  }
  const promise = new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `UPDATE apnakhata 
          set advance = advance + ${advance},borrow = borrow + ${borrow} 
          where userid=${userid}`,
          [],
          (_, result) => {
            resolve(result);
          },
          (_, err) => {
            reject(err);
          }
        );
      });
    });
    return promise; 
};

const insertTupleInPaymentRecord = async(userid,amount,amountType,date)=>{
  let advance  = 0
  let borrow = 0
  if(amountType ==='advance'){
    advance=amount
  }
  else{
    borrow=amount
  }

  const promise2 = await new Promise((resolve, reject) =>{
    db.transaction(tx =>{
      tx.executeSql(
        `INSERT INTO payementrecord (userid,advance,borrow,date) VALUES (?,?,?,?);`,
          [userid,advance,borrow,date],
          (_, result) => {
            resolve(result);
          },
          (_, err) => {
            reject(err);
          }
        );
      });
    });
    return promise2; 
}


export const insertPayment = async (userid,name,amount,amountType,date) => {
  let promise1

  const promise = await new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `SELECT userid from apnakhata where userid=${userid}`,
          [],
          async (_, result) => {
            let len = result.rows.length;

            if(len > 0){
              promise1 = await updateTuple(userid,amount,amountType)
              await insertTupleInPaymentRecord(userid,amount,amountType,date)
            }
            else{
             promise1 = await insertTuple(userid,name,amount,amountType)
             await insertTupleInPaymentRecord(userid,amount,amountType,date)
            }            
            resolve(result);
          },
          (_, err) => {
            reject(err);
          }
        );
      });
    });
    return promise1
};

export const searchUser = (userid,name,amount,amountType) =>{

  db.transaction((tx) =>{
    tx.executeSql(
      `SELECT userid from apnakhata where userid=?`,
      [userid],
      // 'SELECT * from apnakhata',
      // [],
    (tx,results) => {
      var len = results.rows.length;
      if(len > 0){
        console.log('user id is found')
      }
      else {
        //tx.executeSql(
        const query = insertTuple(userid,name,amount,amountType)
        return query;
      }
    }  
    )
    
  })
  
}

export const fetchPayment = () => {
  const promise = new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * from apnakhata',
          [],
          (_, result) => {
            resolve(result);
          },
          (_, err) => {
            reject(err);
          }
        );
      });
    });
    return promise; 
};

export const paymentrecord = async (userid) => {
  const promise = await new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `SELECT * from payementrecord where userid=${userid}`,
          [],
          (_, result) => {
            resolve(result);
          },
          (_, err) => {
            reject(err);
          }
        );
      });
    });
    return promise; 
};