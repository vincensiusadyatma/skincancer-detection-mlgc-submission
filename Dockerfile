FROM node:18.20.5

WORKDIR /app

ENV PORT 3000

ENV MODEL_URL 'https://storage.googleapis.com/mlgc-model-storage/model.json'

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "start"]
