FROM node:16
ARG env
# install dependencies
WORKDIR /app

COPY ./api/ .
COPY ./src/ .

RUN npm i

# Copy all local files into the image.
COPY . .

RUN if [ "$env" = "production" ] ; then \
    npm run buildprod; \
else \
    npm run build; \
fi

FROM node:16

WORKDIR /app
COPY --from=0 /app .
COPY . .

EXPOSE 80

CMD ["node", "./build"]