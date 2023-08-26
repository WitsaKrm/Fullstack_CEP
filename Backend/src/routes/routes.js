const controllers = require("../controllers");

const userRoutes = (app) => {
  app.get('/users', controllers.users.getUsers);
  app.get('/users/:userId', controllers.users.getUserById);
  app.post('/user', controllers.users.postUser);
  app.patch('/user', controllers.users.patchUser);
  app.delete('/user', controllers.users.deleteUser);
};

const nodeRoutes = (app) => {
  app.get('/nodes', controllers.nodes.getNodes);
  app.get('/station', controllers.nodes.getStation);
  app.get('/senser/:nodeId', controllers.nodes.getSenser);
  app.get('/chart_ss/:nodeId', controllers.nodes.getAllSenserData);
};

module.exports = {
  userRoutes,
  nodeRoutes
};
