import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import connectCB from "./config/db.js";
import deliveryRoutes from "./routes/deliveryRoutes.js"; 
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const app = express();
const server = http.createServer(app);
// WebSocket setup
const wss = new WebSocketServer({ server });
const clients = new Map(); 

wss.on("connection", (ws) => {
  console.log("🔌 New WebSocket connection");

  ws.on("message", (data) => {
    const msg = JSON.parse(data);
    if (msg.type === "REGISTER_USER") {
      clients.set(msg.userId, ws);
      console.log(`✅ User ${msg.userId} registered`);
    }
  });

  ws.on("close", () => {
    for (let [userId, socket] of clients.entries()) {
      if (socket === ws) {
        clients.delete(userId);
        break;
      }
    }
  });
});


export const wssClients = clients;

app.use(cors());
app.use(express.json());
connectCB();

app.use('/api/auth', authRouter);
app.use('/api/delivery', deliveryRoutes); 
app.use('/api', productRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
