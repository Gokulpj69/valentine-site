const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/response', (req, res) => {
    console.log(`SHE SAID YES! ❤️ Logged at: ${new Date().toLocaleString()}`);
    res.json({ status: "Success", message: "Recorded!" });
});

app.listen(PORT, () => {
    console.log(`Node backend running at http://localhost:${PORT}`);
});