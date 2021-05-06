import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import LogoSymbol from '../../assets/icons/logo-symbol.png';
import { loadScript } from '../../Utils';

export default function Checkout({ amount, handlePaymentSuccess, handlePaymentFailure }) {

  const user = useSelector(state=> state.sessionState.authUser);

  
  const res = loadScript('https://checkout.razorpay.com/v1/checkout.js');

  if(!res) {
    return ;
  }
  
  const openCheckout = () =>{

    
    const options = {
      "key": "rzp_test_rfJ2UUKhSoQAbb",
      "amount": parseInt(parseFloat(amount) * 100, 10), 
      "name": "Style Beast",
      "description": "Purchase Description",
      "image": LogoSymbol,
      // eslint-disable-next-line func-names
      "handler": function (response){
        if(response.razorpay_payment_id) {
          handlePaymentSuccess();
        } else {
          handlePaymentFailure();
        }
        
      },
      "prefill": {
        "name": user.name,
        "email": user.email
      },
      "notes": {
        "address": "Amravati, Maharashtra"
      },
      "theme": {
        "color": "#000000"
      }
    };
      
    const rzp = new window.Razorpay(options);
    rzp.open();

  }

 
  // eslint-disable-next-line consistent-return
  return (
    <div>
      <button onClick={openCheckout}>Pay Rs. {amount}</button> 
    </div>
  )
}

Checkout.propTypes = {
  amount: PropTypes.string,
  handlePaymentSuccess: PropTypes.func,
  handlePaymentFailure: PropTypes.func
}
  