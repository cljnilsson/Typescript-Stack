FROM node:16
ARG env
# install dependencies
WORKDIR /app

COPY ./api/ .
COPY package.json .

RUN npm i

# Copy all local files into the image.
COPY . .

FROM node:16

WORKDIR /app
COPY --from=0 /app .
COPY . .

EXPOSE 8000

CMD ["npm", "start"]