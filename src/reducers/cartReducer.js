
const initialState = {
    cartItems: [],
}

const reducer = (state = initialState, action)=>{
  switch (action.type) {
    case 'ADD_ITEM': {
        const items = state.cartItems
        const isExistIndex = isItemExists(action.payload,items)
        if(isExistIndex === -1)
          items.push(action.payload)
        else{
          action.payload.quantity = parseInt(items[isExistIndex].quantity)+1
          items[isExistIndex] = action.payload
        }
      return {
          ...state,
          cartItems: items
      }
    }
    case 'REMOVE_ITEM': {
        const items = state.cartItems.filter(item=>item.product_id!==action.payload)
        return {
            ...state,
            cartItems: items
        }
    }
    default:
      return state
  }
}

export default reducer


// Utility

const isItemExists = (item,arr)=>{
  let index = -1
  for(let i=0;i<arr.length;i++){
    if(arr[i].product_id === item.product_id){
      index = i;
      break;
    }
  }
  return index;
}