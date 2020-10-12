/* eslint-disable no-param-reassign */

function findOne({ model, where, raw = true, include, attr, order } = {}) {
  if (include) {
    include.map(data => {
      data.required = false
      return data
    })
  }

  return model.findOne({
    raw,
    where,
    order,
    include,
    attributes: attr,
  })
}

function findByPk({ model, where, raw = true, include, attr, order } = {}) {
  if (include) {
    include.map(data => {
      data.required = false
      return data
    })
  }

  return model.findOne({
    raw,
    where,
    order,
    include,
    attributes: attr,
  })
}

function findAll({
  model,
  where,
  raw = true,
  include,
  attr,
  order,
  limit,
  offset,
  paranoid = true,
  group,
} = {}) {
  if (include) {
    include.map(data => {
      data.required = false
      return data
    })
  }

  return model.findAll({
    where,
    raw,
    include,
    attributes: attr,
    order,
    limit,
    offset,
    paranoid,
    group,
  })
}

function create({ model, data } = {}) {
  return model.create(data)
}

function update({
  model,
  data,
  where,
  raw = true,
  returning = true,
  paranoid = true,
} = {}) {
  return model.update(data, {
    where,
    returning,
    raw,
    paranoid,
  })
}

function destroy({ model, where, force = false } = {}) {
  return model.destroy({ where, force })
}

function createWithTransaction({ model, data, transaction } = {}) {
  return model.create(data, { transaction })
}

function updateWithTransaction({
  model,
  data,
  where,
  raw = true,
  returning = true,
  transaction,
} = {}) {
  return model.update(data, {
    where,
    returning,
    raw,
    transaction,
  })
}

function destroyWithTransaction({ model, where, transaction, force = false }) {
  return model.destroy({ where, transaction, force })
}

module.exports = {
  create,
  findAll,
  findOne,
  findByPk,
  update,
  destroy,
  createWithTransaction,
  updateWithTransaction,
  destroyWithTransaction,
}
