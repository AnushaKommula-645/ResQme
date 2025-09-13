const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Backend is running');
});

// Import routes
const authRoutes = require('./routes/auth');
const sosRoutes = require('./routes/sos');

app.use('/api/auth', authRoutes);
app.use('/api/sos', sosRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
