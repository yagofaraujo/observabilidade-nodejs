import promClient from "prom-client";

// Métrica de quantidade de usuários online
const onlineUsersGauge = new promClient.Gauge({
  name: "app_online_users",
  help: "Current online users",
});

// Métrica de quantidade de usuários cadastrados
const usersCount = new promClient.Counter({
  name: "app_users",
  help: "Total of users",
});

// Métrica de quantidade de requisições
const httpRequestCounter = new promClient.Counter({
  name: "app_http_request",
  help: "Number of HTTP requests",
  labelNames: ["method", "route"],
});

export { promClient, onlineUsersGauge, httpRequestCounter, usersCount };
