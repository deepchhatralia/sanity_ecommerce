import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe("pk_test_51LFqpWSHUhNMYk16ZmAQyXMugvrmGbm8xx0YoU0XHdrrlA7JpL9exbJzR6L754U3MVSaS7Ytik798nzmJ3zdLkc8002p7yny2a");
    }

    return stripePromise;
}

export default getStripe;