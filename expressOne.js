import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 3000;
const users = [];

app.use(express.json());

app.get('/', (request, response) => {
  response.status(200).json({
    message: 'Hello World',
  });
});

app.get('/users', (request, response) => {
  response.status(200).json(users)
})

app.post('/users', (request, response) => {
  const data = request.body;
  const filtered = Object.fromEntries(
    Object.entries(data).filter(
      ([key]) =>
        key.includes('firstName') ||
        key.includes('lastName') ||
        key.includes('email')
    )
  );
  users.push(filtered);
  response.status(201).json(filtered);
});

app.listen(port, () =>
  console.log(`Server Running on port: http://localhost/${port}`)
);
