function createCorsConfig() {
  return {
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  };
}

module.exports = createCorsConfig();