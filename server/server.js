const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');
// const expressUploader = require('express-fileupload')


// Route includes

const availabilityRouter = require('./routes/availability.router');
const bookingRouter = require('./routes/bookings.router');
const caretakerRouter = require('./routes/caretaker.router');
const childRouter = require('./routes/children.router');
const familyRouter = require('./routes/families.router');
const mapRouter = require('./routes/maps.api.router');
const photoRouter = require('./routes/photos.api.router');
const providerRouter = require('./routes/providers.router');
const userRouter = require('./routes/user.router');
// const fileStack = require("./routes/fileStack.router")

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);
// app.use(expressUploader())

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/availability', availabilityRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/caretaker', caretakerRouter);
app.use('/api/child', childRouter);
app.use('/api/family', familyRouter);
app.use('/api/maps', mapRouter);
app.use('/api/photo', photoRouter);
app.use('/api/provider', providerRouter);
app.use('/api/user', userRouter);
// app.use('/api/file', fileStack)


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
