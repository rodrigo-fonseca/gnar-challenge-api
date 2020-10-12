const Sequelize = require('sequelize')
const config = require('config')

let sequelize
let models

function sync() {
  return get().sync()
}

function get() {
  if (sequelize) return sequelize

  sequelize = _initSequelize()
  return sequelize
}

function getOp() {
  return Sequelize.Op
}

function getSequelize() {
  return Sequelize
}

function getModel(name) {
  return models && name && models[name]
}

function _initSequelize() {
  const conf = config.get()

  sequelize = new Sequelize(
    conf.sequelize.database,
    conf.sequelize.username,
    conf.sequelize.password,
    conf.sequelize.params
  )

  _initModels()
  return sequelize
}

const _initModels = () => {
  const createdAt = {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  }
  const updatedAt = {
    type: Sequelize.DATE,
    onUpdate: Sequelize.NOW,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  }

  const User = sequelize.define(
    'user',
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      givenName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      familyName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      notifyUserId: {
        type: Sequelize.STRING,
      },
      paymentCustomerId: {
        type: Sequelize.STRING,
      },
      from: {
        type: Sequelize.STRING(1),
      },
      createdAt,
      updatedAt,
    },
    {
      paranoid: true,
    }
  )

  const Creator = sequelize.define(
    'creator',
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      givenName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      familyName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
      },
      createdAt,
      updatedAt,
    },
    {
      paranoid: true,
    }
  )

  const ClassRoom = sequelize.define(
    'classroom',
    {
      appMajorVersion: {
        type: Sequelize.TINYINT.UNSIGNED,
        defaultValue: 1,
        allowNull: false,
      },
      createdAt,
      updatedAt,
    },
    {
      paranoid: true,
    }
  )

  const ClassRoomScore = sequelize.define(
    'classroom_score',
    {
      missed: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0,
      },
      killed: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0,
      },
      scoreUp: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0,
      },
      scoreDown: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0,
      },
      createdAt,
      updatedAt,
    },
    {
      paranoid: true,
    }
  )

  const ClassRoomAbout = sequelize.define(
    'classroom_about',
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      requirements: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      publishedAt: {
        type: Sequelize.DATE,
      },
      value: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      discount: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      free: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1,
      },
      createdAt,
      updatedAt,
    },
    {
      paranoid: true,
    }
  )

  const ClassRoomLevel = sequelize.define('classroom_level', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt,
    updatedAt,
  })

  const Language = sequelize.define('language', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    alias: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt,
    updatedAt,
  })

  const ProgrammingLanguage = sequelize.define('programming_language', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    syntaxName: {
      type: Sequelize.STRING,
    },
    alias: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt,
    updatedAt,
  })

  const ClassRoomChallenge = sequelize.define(
    'classroom_challenge',
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      code: {
        type: Sequelize.JSON,
      },
      codeblacklist: {
        type: Sequelize.JSON,
      },
      codewhitelist: {
        type: Sequelize.JSON,
      },
      labs: {
        type: Sequelize.JSON,
      },
      free: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1,
      },
      index: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      boss: {
        type: Sequelize.INTEGER.UNSIGNED,
      },
      createdAt,
      updatedAt,
    },
    {
      paranoid: true,
    }
  )

  const ClassRoomChallengeType = sequelize.define('classroom_challenge_type', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt,
    updatedAt,
  })

  const ClassRoomChallengeSection = sequelize.define(
    'classroom_challenge_section',
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      index: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt,
      updatedAt,
    },
    {
      paranoid: true,
    }
  )

  const ClassRoomChallengeSpeech = sequelize.define(
    'classroom_challenge_speech',
    {
      speeches: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      stepByStep: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt,
      updatedAt,
    },
    {
      paranoid: true,
    }
  )

  const ClassRoomRating = sequelize.define('classroom_rating', {
    message: {
      type: Sequelize.STRING,
    },
    rating: {
      type: Sequelize.INTEGER.UNSIGNED,
    },
    rateOnEnd: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    createdAt,
    updatedAt,
  })

  const ClassRoomPayment = sequelize.define('classroom_payment', {
    value: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    amount: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    discount: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    currency: {
      type: Sequelize.STRING,
    },
    paymentId: {
      type: Sequelize.STRING,
    },
    paymentCreated: {
      type: Sequelize.INTEGER.UNSIGNED,
    },
    done: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    createdAt,
    updatedAt,
  })

  const Tag = sequelize.define('tag', {
    name: {
      type: Sequelize.STRING,
    },
    createdAt,
    updatedAt,
  })

  // ASSOCIATIONS

  // Creator
  Creator.belongsTo(Language, {
    foreignKey: {
      allowNull: false,
      defaultValue: 1,
    },
  })

  // User
  User.belongsTo(Language, {
    foreignKey: {
      allowNull: false,
      defaultValue: 1,
    },
  })

  // ClassRoom
  ClassRoom.belongsTo(ClassRoomLevel, { foreignKey: { allowNull: false } })
  ClassRoom.belongsTo(Creator, { foreignKey: { allowNull: false } })
  ClassRoom.hasMany(ClassRoomChallengeSection, {
    as: 'sections',
    foreignKey: { allowNull: false },
  })
  ClassRoom.hasMany(ClassRoomAbout, {
    as: 'abouts',
    foreignKey: { allowNull: false },
  })
  ClassRoom.hasMany(ClassRoomRating, {
    as: 'ratings',
    foreignKey: { allowNull: false },
  })
  ClassRoom.hasMany(ClassRoomPayment, {
    as: 'paid',
    foreignKey: { allowNull: false },
  })
  ClassRoom.hasMany(ClassRoomScore, {
    as: 'score',
    foreignKey: { allowNull: false },
  })

  // ClassRoomScore
  ClassRoomScore.belongsTo(ClassRoom, { foreignKey: { allowNull: false } })
  ClassRoomScore.belongsTo(User, { foreignKey: { allowNull: false } })
  ClassRoomScore.belongsTo(Language, { foreignKey: { allowNull: false } })

  // ClassRoomAbout
  ClassRoomAbout.belongsTo(ClassRoom, { foreignKey: { allowNull: false } })
  ClassRoomAbout.belongsTo(Language, { foreignKey: { allowNull: false } })

  // ClassRoomLevel
  ClassRoomLevel.belongsTo(Language, { foreignKey: { allowNull: false } })

  // ClassRoomChallengeSection
  ClassRoomChallengeSection.belongsTo(ClassRoom, {
    foreignKey: { allowNull: false },
  })
  ClassRoomChallengeSection.belongsTo(Creator, {
    foreignKey: { allowNull: false },
  })
  ClassRoomChallengeSection.belongsTo(Language, {
    foreignKey: { allowNull: false },
  })
  ClassRoomChallengeSection.hasMany(ClassRoomChallenge, {
    as: 'challenges',
    foreignKey: { allowNull: false },
  })

  // ClassRoomChallenge
  ClassRoomChallenge.belongsTo(ClassRoom, { foreignKey: { allowNull: false } })
  ClassRoomChallenge.belongsTo(Creator, { foreignKey: { allowNull: false } })
  ClassRoomChallenge.belongsTo(Language, { foreignKey: { allowNull: false } })
  ClassRoomChallenge.belongsTo(ClassRoomChallengeSection, {
    foreignKey: { allowNull: false },
  })
  ClassRoomChallenge.hasMany(ClassRoomChallengeSpeech, {
    as: 'speeches',
    foreignKey: { allowNull: false },
  })
  ClassRoomChallenge.belongsTo(ClassRoomChallengeType)
  ClassRoomChallenge.belongsTo(ProgrammingLanguage)

  // ClassRoomChallengeSpeech
  ClassRoomChallengeSpeech.belongsTo(ClassRoom, {
    foreignKey: { allowNull: false },
  })
  ClassRoomChallengeSpeech.belongsTo(ClassRoomChallengeSection, {
    foreignKey: { allowNull: false },
  })
  ClassRoomChallengeSpeech.belongsTo(ClassRoomChallenge, {
    foreignKey: { allowNull: false },
  })
  ClassRoomChallengeSpeech.belongsTo(Language, {
    foreignKey: { allowNull: false },
  })
  ClassRoomChallengeSpeech.belongsTo(Creator, {
    foreignKey: { allowNull: false },
  })

  // ClassRoomRating
  ClassRoomRating.belongsTo(User, { foreignKey: { allowNull: false } })
  ClassRoomRating.belongsTo(ClassRoom, { foreignKey: { allowNull: false } })
  ClassRoomRating.belongsTo(Language, { foreignKey: { allowNull: false } })

  // ClassRoomPayment
  ClassRoomPayment.belongsTo(User, { foreignKey: { allowNull: false } })
  ClassRoomPayment.belongsTo(ClassRoom, { foreignKey: { allowNull: false } })
  ClassRoomPayment.belongsTo(Language, { foreignKey: { allowNull: false } })

  // Tag
  Tag.belongsTo(ProgrammingLanguage, { foreignKey: { allowNull: false } })

  _setModels({
    User,
    Creator,
    ClassRoom,
    ClassRoomScore,
    ClassRoomRating,
    Language,
    ProgrammingLanguage,
    ClassRoomLevel,
    ClassRoomChallenge,
    ClassRoomAbout,
    ClassRoomChallengeSection,
    ClassRoomChallengeType,
    ClassRoomChallengeSpeech,
    ClassRoomPayment,
    Tag,
  })
}

const _setModels = data => {
  models = data
}

module.exports = {
  sync,
  get,
  getOp,
  getModel,
  getSequelize,
}
