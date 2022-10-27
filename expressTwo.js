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
  } else {
    const findEmail = users.find((user) => user.email === email);
    if (findEmail) {
      response.status(400).json({
        error: 'Email already exists',
      });
    } else {
      const filtered = Object.fromEntries(
        Object.entries(data).filter(
          ([key]) =>
            key.includes('firstName') ||
            key.includes('lastName') ||
            key.includes('email')
        )
      );
      const newUser = {
        id: uuidv4(),
        ...filtered,
      };
      users.push(newUser);
      return response.status(201).json(newUser);
    }
  }
});

app.listen(port, () =>
  console.log(`Server Running on port: http://localhost/${port}`)
);
