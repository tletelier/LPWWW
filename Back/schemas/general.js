const generalSchema = `
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

module.exports = { generalSchema };