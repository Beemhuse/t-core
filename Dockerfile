# Backend - Node.js
FROM node:18 as node-backend

WORKDIR /app/backend/node-server

COPY ./backend/node-server/package*.json ./
RUN npm install

COPY ./backend/node-server ./
CMD ["node", "server.js"]

# Backend - Python
FROM python:3.10 as python-backend

WORKDIR /app/backend/python-server

COPY ./backend/python-server/requirements.txt ./
RUN pip install -r requirements.txt

COPY ./backend/python-server ./
CMD ["python", "server.py"]

# Frontend - React
FROM node:18 as react-frontend

WORKDIR /app/frontend

COPY ./frontend/package*.json ./
RUN npm install

COPY ./frontend ./
RUN npm run build

# Final Stage
FROM nginx:alpine

COPY --from=react-frontend /app/frontend/build /usr/share/nginx/html
COPY --from=node-backend /app/backend/node-server /app/backend/node-server
COPY --from=python-backend /app/backend/python-server /app/backend/python-server

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
