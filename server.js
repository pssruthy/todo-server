const app = require('./app');
const { stdout } = process;

const main = () => {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => stdout.write(`Listening at ${PORT}\n`));
};

main();
