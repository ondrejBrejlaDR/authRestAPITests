const express = require('express');
const app = express();
const port = 3000;

// Middleware for Basic Auth
const basicAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        res.setHeader('WWW-Authenticate', 'Basic');
        return res.status(401).send('Authentication required.');
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    const validUser = 'admin';
    const validPass = 'password123';

    if (username === validUser && password === validPass) {
        next();
    } else {
        return res.status(401).send('Invalid credentials.');
    }
};

// Public route
app.get('/', (req, res) => {
    res.send('Welcome to the public API!');
});

// Protected route
app.get('/protected', basicAuth, (req, res) => {
    res.send('You have accessed a protected route.');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
