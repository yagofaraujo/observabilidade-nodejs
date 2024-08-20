# Observabilidade com NodeJS, Prometheus e Grafana

## Executando os containers

**Requisitos para execução:**

- Docker v24.0.1
- Docker compose v2.18.1

```bash
$ docker compose up -d --build --force-create
```

## Testando se está tudo funcionando como esperado

**Verifique se consegue acessar todos os serviços:**

- [Aplicação NodeJs](http://localhost:3333/) - (http://localhost:3333)
- [Prometheus](http://localhost:3000/) - (http://localhost:3000)
- [Grafana](http://localhost:9090/) - (http://localhost:9090)
