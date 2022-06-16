const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('toughts', 'sa', '123456', {
  host: 'localhost',
  dialect: 'mssql'
})

try {
  sequelize.authenticate()
  console.log('Conexão realizada com Sucesso')
}
catch(err) {
  console.log('Não foi possivel se conectar com o Banco de Dados')
  console.log(err)
}

module.exports = sequelize