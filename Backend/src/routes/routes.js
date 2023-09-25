const controllers = require("../controllers");

const userRoutes = (app) => {
  app.get('/user', controllers.users.getUsers);
  app.get('/users/:userId', controllers.users.getUserById);
  app.post('/user', controllers.users.postUser);
  app.put('/user', controllers.users.putUser);
  app.delete('/thisuser/:user_id', controllers.users.deleteUser);
};

const nodeRoutes = (app) => {
  app.get('/devices', controllers.nodes.getDevices);
  app.post('/nodes', controllers.nodes.postDataNode);
  // app.get('/station', controllers.nodes.getStation);
  app.get('/senser/:nodeId', controllers.nodes.getSenser);
  app.get('/chart_ss/:nodeId', controllers.nodes.getAllSenserChartData);
  app.get('/chart_ss/:nodeId/:data', controllers.nodes.getChartData);
};

module.exports = {
  userRoutes,
  nodeRoutes
};
