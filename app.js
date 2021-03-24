const express = require('express');
const { connect } = require('mongoose');
const config = require('config');
const router = require('./routes/api.routes');
const routerAuth = require('./routes/api-auth.routes');
const app = express();

const PORT = config.get('port') || 5000;

app.use(express.json({ extended: true }))
app.use('/api', router);
app.use('/api/auth', routerAuth);

async function start() {
    try {
        await connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));

    } catch (e) {
        console.log('Server error', e.message);
    }
}

start();
