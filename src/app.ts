import express, { Request, response, Response } from "express";
import {
  httpRequestCounter,
  onlineUsersGauge,
  promClient,
  usersCount,
} from "./prometheus";

// inicia o servidor express
export const app = express();

// Middleware para lidar com JSON
app.use(express.json());

// A cada 5 segundos atualiza a métrica de usuários online
setInterval(() => {
  // Gera um valor aleatório entre 0 e 100 a cada 5 segundos, simulando a quantidade de usuários online
  const onlineUsers = Math.floor(Math.random() * 100);
  onlineUsersGauge.set(onlineUsers);
}, 5000);

// Middleware para atualizar a métrica de quantidade de requisições sempre que uma nova requisição
// é processada
app.use((req, _, next) => {
  httpRequestCounter.inc({ method: req.method, route: req.path });
  next();
});

// Rota para expor métricas da aplicação no prometheus
app.get("/metrics", async (_, res) => {
  res.set("Content-Type", promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

type User = {
  email: string;
  password: string;
};

const users: User[] = [];

app.get("/", (_, response) => {
  response.send(`Hello world! Aplicação funcionando!`);
});

// Rota para obter os usuários cadastrados
app.get("/users", (_, response) => {
  return response.status(200).json({
    users,
  });
});

// Rota para criar um novo usuário
app.post(
  "/users",
  (request: Request<unknown, unknown, User>, response: Response) => {
    const { email, password } = request.body;

    const emailAlreadyExists = users.find((user) => user.email === email);

    if (emailAlreadyExists) {
      return response.sendStatus(200);
    }

    if (!email || !password) {
      const errorMessage = "Empty email or password!";

      return response.status(400).json({
        error: errorMessage,
      });
    }

    users.push({
      email,
      password,
    });

    // A cada novo usuário que é criado, incrementa o "contador" da métrica de
    // quantidade de usuários cadastrados
    usersCount.inc();

    return response.sendStatus(201);
  }
);
