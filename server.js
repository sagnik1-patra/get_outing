import express from 'express';
import cors from 'cors';
import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const csvFilePath = path.join(__dirname, 'responses.csv');

// Create CSV Writer
const csvWriter = createObjectCsvWriter({
  path: csvFilePath,
  header: [
    { id: 'name', title: 'Name' },
    { id: 'email', title: 'Email' },
    { id: 'choice', title: 'Choice' },
    { id: 'subChoice', title: 'SubChoice' },
    { id: 'date', title: 'Date' }
  ],
  append: fs.existsSync(csvFilePath) // append if exists
});

// Write header manually if file doesn't exist
if (!fs.existsSync(csvFilePath)) {
  const header = 'Name,Email,Choice,SubChoice,Date\n';
  fs.writeFileSync(csvFilePath, header, 'utf8');
}

app.post('/api/submit', async (req, res) => {
  try {
    const { name, email, choice, subChoice, date } = req.body;
    
    // Validate required
    if (!name || !email || !choice || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const record = [
      {
        name,
        email,
        choice,
        subChoice: subChoice || 'N/A',
        date
      }
    ];

    await csvWriter.writeRecords(record);
    res.status(200).json({ message: 'Success' });
  } catch (err) {
    console.error('Error writing to CSV', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
