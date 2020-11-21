import {ADD_PAYMENT, UPDATE_PAYMENT, FETCH_DATA,PAYMENT_RECORD} from '../actions/data-action';

import Payment from '../../models/payment';

const initialState ={
    data:[],
    record:[]
}

export default(state=initialState,action)=>{
    switch(action.type){
        case ADD_PAYMENT:{
            let advance = 0,borrow = 0
            if(action.data.amountType === 'borrow'){
                borrow = action.data.amount
            }
            else{
                advance = action.data.amount
            }
            const newPayment = new Payment(action.data.userid, action.data.name,advance,borrow)
            const oldData = [...state.data]
            const updatedData = oldData.concat(newPayment)
            //console.log(newPayment)
            return {
                ...state,
                data: updatedData
            };
        }

        case UPDATE_PAYMENT:{
            let advance = 0,borrow = 0
            const oldData = [...state.data]
            const selectedIdIndex = oldData.findIndex(item=> item.userid == action.data.userid)
            if(action.data.amountType === 'borrow'){
                //console.log(oldData[selectedIdIndex].borrow)
                //console.log(action.data.amount)
                oldData[selectedIdIndex].borrow = oldData[selectedIdIndex].borrow + Number(action.data.amount)
            }
            else{
                oldData[selectedIdIndex].advance += Number(action.data.amount)
            }
            return{
                ...state,
                data:oldData
            }
        }
            

        case FETCH_DATA:
            return {
                ...state,
                data:action.data
            }
        
        case PAYMENT_RECORD:
            return{
                ...state,
                record:action.data
            }

        default:
            return state;
    }
}