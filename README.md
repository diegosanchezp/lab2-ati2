# Lab 2 de ATI2

# Dependencias
Dependencias de sistemas que tienes que tener instaladas para poder iniciar los servidores.

- Nodejs version LTS o v16.15.1
- yarn v1.22
- Docker
- docker-compose

## Setup

Instalar dependencias de Nodejs
```bash
yarn install
```

Setup backend
```bash
cd backend
bash scripts/setup.sh
```

Si estas utilizando windows ve los comandos de `backend/scripts/setup.sh` y ve cuales son los equivalentes.

Finalmente, iniciar servidores de backend y frontend
```bash
yarn dev
```

## About setup
- Servidor de backend corre en `http://localhost:3000`
- La documentación de la se API esta en la url `http://localhost:3000/swagger`
- Servidor de frontend corre en `http://localhost:5173`
