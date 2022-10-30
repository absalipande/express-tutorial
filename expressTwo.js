import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 3000;

app.use(express.json());

const users = [];

app.get('/', (request, response) => {
  response.status(200).json({
    message: 'Hello World',
  });
});

app.get('/users', (request, response) => {
  response.status(200).json(users);
});

app.post('/users', (request, response) => {
  const data = request.body;
  const { email } = request.body;

  if (!email.includes('@')) {
    return response.status(400).json({
      error: 'Email is incorrect',
    });
  }

  const findEmail = users.find((user) => user.email === email);

  if (findEmail) {
    return response.status(400).json({
      error: 'Email already exists',
    });
  }

  const filteredData = Object.fromEntries(
    Object.entries(data).filter(
      ([key]) =>
        key.includes('firstName') ||
        key.includes('lastName') ||
        key.includes('email')
    )
  );

  const newUser = {
    id: uuidv4(),
    ...filteredData,
  };

  users.push(newUser);
  response.status(201).json(newUser);
});

app.listen(port, () =>
  console.log(`Server Running on port: http://localhost/${port}`)
);

