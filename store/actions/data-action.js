import {insertPayment,fetchPayment,paymentrecord} from '../../helpers/db';

export const FETCH_DATA = 'FETCH_DATA';
export const ADD_PAYMENT = 'ADD_PAYMENT';
export const UPDATE_PAYMENT = 'UPDATE_PAYMENT';
export const PAYMENT_RECORD = 'PAYMENT_RECORD';

export const addBorrowPaymnet = (userid,name,amount,amountType,date) =>{
    return async dispatch =>{
            // const fileName = image.split('/')
            // const newPath = FileSystem.documentDirectory + fileName;
            // try {
            //     await FileSystem.moveAsync({
            //         from:image,
            //      h

            try{
                const dbResult = await insertPayment(userid,name,amount,amountType,date); 
                if (dbResult.insertId === undefined){
                    dispatch({
                        type:UPDATE_PAYMENT,
                        data:{
                            userid:userid,
                            amount:amount,
                            amountType:amountType
                        }
                    })
                }
                else{
                    dispatch({
                        type:ADD_PAYMENT,
                        data:{
                            userid:userid,
                            name:name,
                            amount:amount,
                            amountType:amountType
                        }
                    })
                }
                // dispatch({
                //      type:ADD_BORROW_PAYMENT,
                //      placeData:{
                //         id:userid,
                //         name:name,
                        // advance:advance
                   // }
                // });
            } catch(err){
                console.log(err);
            }
        };
}

export const loadPayment = () =>{
    return async dispatch => {
        try{
            const dbResult = await fetchPayment();
            dispatch({
                type:FETCH_DATA,
                data: dbResult.rows._array
            })
        } catch(err){
            throw err
        }
    }
}


export const loadPaymentDetails = (userid) =>{
    return async (dispatch)=>{
        try{
            const dbResult = await paymentrecord(userid);
            console.log("Aman",dbResult);
            dispatch({
                type:PAYMENT_RECORD,
                data:dbResult.rows._array
            })
        }catch(err){
            console.log(err);
        }
    }
}