const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

// Datos temporales
const users = [];
const businessPlans = [];
let authTokens = {};

// Helper para generar tokens simples
function generateToken() {
  return 'token_' + Math.random().toString(36).substr(2, 9);
}

// Auth endpoints
app.post('/api/auth/register', (req, res) => {
  const { email, password, username } = req.body;
  
  if (!email || !password || !username) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Simular registro
  const userId = 'user_' + Math.random().toString(36).substr(2, 9);
  const token = generateToken();
  
  users.push({
    id: userId,
    email,
    username,
    password // En producción nunca guardes passwords en texto plano
  });
  
  authTokens[token] = { userId, username };
  
  res.json({ token, username });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }
  
  // Simular login
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = generateToken();
  authTokens[token] = { userId: user.id, username: user.username };
  
  res.json({ token, username: user.username });
});

// Business Plans endpoints
app.get('/api/plans', (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  const token = authHeader.substring(7);
  const user = authTokens[token];
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  
  const userPlans = businessPlans.filter(plan => plan.userId === user.userId);
  res.json(userPlans);
});

app.post('/api/plans', (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  const token = authHeader.substring(7);
  const user = authTokens[token];
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  
  const { title, summary } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  
  const newPlan = {
    id: 'plan_' + Math.random().toString(36).substr(2, 9),
    userId: user.userId,
    title,
    summary: summary || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  businessPlans.push(newPlan);
  res.json(newPlan);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor temporal ejecutándose en http://localhost:${PORT}`);
  console.log('📋 Este es un servidor de prueba temporal mientras compilamos el backend Spring Boot');
  console.log('🔑 Usa cualquier email/password para registrarte/login');
});

module.exports = app;