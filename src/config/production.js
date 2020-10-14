const production = {
  sequelize: {
    database: 'gnar',
    username: 'gnar',
    password: 'rp[gB.2k',
    params: {
      host: 'gnar-challenge.ctqt4d4deqat.sa-east-1.rds.amazonaws.com',
      dialect: 'postgres',
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  },
  api: {
    app: {
      salt: '',
    },
    console: {
      salt: '',
    },
  },
}

module.exports = production
