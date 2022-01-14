import * as React from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
    useNavigate,
  } from "react-router-dom";

const products = [
    {
        product_id: 1,
        name: 'Product 1',
        price: 10
    },
    {
        product_id: 2,
        name: 'Product 2',
        price: 15
    }
]

const Page = () => {
    const cartState = useSelector((state) => state.cartReducer)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onAddToCart = (product_id, price) => {
        dispatch({
            type: 'ADD_ITEM',
            payload: {
                product_id: product_id,
                price: price,
                quantity: 1
            }
        })
    }

    const onRemoveFromCart = (product_id) => {
        dispatch({
            type: 'REMOVE_ITEM',
            payload: product_id
        })
    }

    const calculateTotalPrice = ()=>{
        let total = 0
        cartState.cartItems.forEach(element => {
            total += element.price * element.quantity
        });
        return total
    }

    const goToCheckout = ()=>{
        if(calculateTotalPrice()>=50){
            navigate("/checkout")
        }
        else{
            alert('Checkout price must be greater or equals $50.')
        }
    }

    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-8">
                <div className="container w-full bg-slate-200 py-4">
                    <h1 className="mb-3">Products</h1>
                    <div className="flex flex-row justify-around items-center">
                        {
                            products.map((item,index)=>{
                                return(
                                    <div key={index} className="w-56 border-orange-500 border rounded p-4">
                                        <h3>{item.name}</h3>
                                        <p>${item.price}</p>
                                        <button onClick={() => onAddToCart(item.product_id, item.price)} className="bg-orange-500 p-2 mt-2 rounded text-neutral-50">Add to cart</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="container w-full bg-slate-200">
                    <h1 className="mb-3">My Cart ({cartState.cartItems.length})</h1>
                    <div className="container mx-auto w-56">
                        {
                            cartState.cartItems.map((item,index)=>{
                                const prodName = products.filter(p=>p.product_id === item.product_id)[0].name
                                return(
                                    <div key={index}>
                                        {prodName} x {item.quantity} (${item.price*item.quantity}) <span onClick={()=>onRemoveFromCart(item.product_id)} className="text-orange-500 cursor-pointer">Remove</span>
                                    </div>
                                )
                            })
                        }
                        <button onClick={() => goToCheckout()} className={`${calculateTotalPrice()>=50 ? 'bg-orange-500':'bg-slate-500'} p-2 mt-2 rounded text-neutral-50`}>Checkout (${calculateTotalPrice()})</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page