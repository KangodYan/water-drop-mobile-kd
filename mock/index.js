/* eslint-disable import/no-extraneous-dependencies */
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { faker } from '@faker-js/faker/locale/zh_CN';

// 类型来自graphql服务端的gql文件
const typeDefs = `#graphql
  type UserType {
  id: String!
  name: String!
  desc: String!

  """账户信息"""
  account: String!
}

type Query {
  """使用 ID 查询用户"""
  find(id: String!): UserType!
}

type Mutation {
  """新增用户"""
  create(params: UserInput!): Boolean!

  """更新用户"""
  update(id: String!, params: UserInput!): Boolean!

  """删除一个用户"""
  del(id: String!): Boolean!
}

input UserInput {
  name: String!
  desc: String!
}
`;

// 变化的数据
const resolvers = {
  UserType: {
    name: () => faker.name.lastName() + faker.name.firstName(),
  },
};

// 固定的数据
const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => 'hello',
};

// 创建apollo服务端模拟数据
const server = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    mocks,
    preserveResolvers: true,
  }),
});

startStandaloneServer(server, { listen: { port: 8888 } });
