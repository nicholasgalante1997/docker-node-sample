/* eslint-disable prefer-const */
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const redis = require('redis');

let RedisStore = require('connect-redis')(session);

const {
  MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET,
} = require('./config/config');

let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});

const postRouter = require('./routes/posts');
const userRouter = require('./routes/user');

const app = express();

app.enable('trust proxy');
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: SESSION_SECRET,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 30000,
  },
}));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
    .then(() => console.log('attached to db'))
    .catch((e) => {
      console.error(e);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

const port = process.env.PORT || 3000;

app.get('/api', (req, res) => {
  res.json({ status: 'docker sample' });
});

app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);

app.listen(port, () => console.log(`listening on port ${port} \nctrl c to esc`));
