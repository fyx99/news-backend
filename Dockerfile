FROM node:16-alpine3.14 as base
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]

HEALTHCHECK --interval=120s --timeout=20s --start-period=120s CMD node health.js


RUN npm install --production


FROM base as final
COPY . .
CMD [ "node", "app.js" ]