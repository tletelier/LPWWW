const General = `
scalar DateTime

type Alert{
  message: String!
}

type Response{
  message: String
  token: String
  code: Int!
}

`

module.exports = { General };