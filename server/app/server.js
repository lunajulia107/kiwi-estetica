require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const appointmentRoutes = require('../routes/appointments.routes');
const adminRoutes = require('../routes/admin.routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/api/agendar', appointmentRoutes);
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
