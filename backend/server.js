const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const complaintRoutes = require('./routes/complaint');
const staffRoutes = require('./routes/staff');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/complaints', complaintRoutes);
app.use('/api/staff', staffRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
