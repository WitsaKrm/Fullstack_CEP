const controllers = require("../controllers");

const userRoutes = (app) => {
  app.post('/register', controllers.users.userRegister);
  app.post('/login', controllers.users.userLogin);
  app.post('/authen', controllers.users.authen);
  app.get('/user', controllers.users.getUsers);
  app.get('/users/:userId', controllers.users.getUserById);
  app.get('/user/:username', controllers.users.getUserByUsername);
  app.put('/user', controllers.users.putUser);
  app.delete('/thisuser/:user_id', controllers.users.deleteUser);
};

const nodeRoutes = (app) => {
  app.get('/devices', controllers.nodes.getDevices);
  app.get('/devices/:user_id', controllers.nodes.getDevicesByUID);
  app.post('/nodes', controllers.nodes.postDataNode);
  // app.get('/station', controllers.nodes.getStation);
  app.get('/senser/:nodeId', controllers.nodes.getSenser);
  app.get('/chart_ss/:nodeId', controllers.nodes.getAllSenserChartData);
  app.get('/chart_ss/:nodeId/:data', controllers.nodes.getChartData);
  app.post('/mode/:nodeId', controllers.nodes.postSetDataMode);
  app.get('/mode/:nodeId', controllers.nodes.getModeData);
  app.put('/mode/:nodeId', controllers.nodes.putMode);
};

module.exports = {
  userRoutes,
  nodeRoutes
};
