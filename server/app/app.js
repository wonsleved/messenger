const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.route');
const errorMiddleware = require('./middlerwares/error.middleware');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use('/api', authRouter);
app.use(errorMiddleware());

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
