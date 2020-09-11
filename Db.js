class Db {
  constructor(client) {
    this.client = client;
  }

  getTodo() {
    return new Promise((res, rej) => {
      this.client.get('todo', (err, value) => {
        if (err) rej(err);
        res(JSON.parse(value));
      });
    });
  }

  setTodo(todo) {
    return new Promise((res, rej) => {
      this.client.set('todo', JSON.stringify(todo), (err) => {
        if (err) rej(err);
        res();
      });
    });
  }
}

module.exports = Db;
