import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { BUTTON_TYPE_CLASSES } from "../button/button.component"
import { FormContainer, PaymentButton, PaymentFormContainer } from "./payment-form.styles";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/user/user.selector";
import { selectCartTotal } from "../../redux/cart/cart.selector";
import { useState } from "react";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const user = useSelector(userSelector);
  const amount = useSelector(selectCartTotal);
  const [inProcess, setInProcess] = useState(false);

  const paymentHandler = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return;
    }

    setInProcess(true);
    const response = await fetch("/.netlify/functions/create_payment_intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ amount: amount * 100 })
    }).then((res) => res.json()).catch((res) => res.json())


    const { paymentIntent: { client_secret } } = response;
    console.log(client_secret);

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user ? user.displayName : 'Guest'
        },

      }
    })

    setInProcess(false);
    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('Payment Successfully made');
      }
    }

  }

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit card payment: </h2>
        <CardElement />
        <PaymentButton isLoading={inProcess} buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  )
}

export default PaymentForm;