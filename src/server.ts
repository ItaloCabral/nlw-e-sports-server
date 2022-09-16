import App from "./app";

const PORT = process.env.PORT || 3333;

const server = new App().app;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
