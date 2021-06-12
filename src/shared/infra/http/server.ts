import app from './app';

const port = process.env.SERVER_PORT || 3031;

app.listen(port, () => {
  console.log(`🔥️ Server started on port ${port}`);
  console.log(`🔥️ Open documentation on http://localhost:${port}/api-docs`);
});
