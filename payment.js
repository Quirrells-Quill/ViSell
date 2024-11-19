const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('your-stripe-secret-key'); // Replace with your Stripe secret key

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json()); // Parse JSON data from the frontend

// Route to handle payments
app.post('/api/pay', async (req, res) => {
    const { cardNumber, expiryDate, cvv, amount } = req.body;

    // Basic validations (for demo purposes, you should enhance this)
    if (!cardNumber || !expiryDate || !cvv || !amount) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Extract expiry month and year
        const [expMonth, expYear] = expiryDate.split('/');

        // Create a payment method
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: {
                number: cardNumber,
                exp_month: parseInt(expMonth, 10),
                exp_year: parseInt(expYear, 10),
                cvc: cvv,
            },
        });

        // Create a payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Amount in cents
            currency: 'usd', // Replace with your currency
            payment_method: paymentMethod.id,
            confirm: true,
        });

        // Respond with success
        res.json({ success: true, message: 'Payment successful!', paymentIntent });
    } catch (error) {
        // Handle errors
        console.error('Payment error:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
