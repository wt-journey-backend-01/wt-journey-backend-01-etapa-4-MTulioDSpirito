require('dotenv').config();
const express = require('express');
const cors = require('cors');

const agentesRoutes = require('./routes/agentesRoutes');
const casosRoutes = require('./routes/casosRoutes');
const authRoutes = require('./routes/authRoutes'); // Importando as novas rotas
const { errorHandler } = require('./utils/errorHandler');
const { authenticateToken } = require('./middlewares/authMiddleware'); // Importando o middleware

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Rotas de autenticação que não precisam de token
app.use('/auth', authRoutes);

// Aplica o middleware de autenticação para proteger as rotas
app.use('/agentes', authenticateToken, agentesRoutes);
app.use('/casos', authenticateToken, casosRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor da Delegacia rodando em http://localhost:${PORT}`);
});