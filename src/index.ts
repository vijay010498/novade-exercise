import { app } from "./app";

const startServer = async () => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.error(`Server started on port ${PORT}`);
  });
};

startServer();
