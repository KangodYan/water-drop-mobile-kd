import { gql } from '@apollo/client';

// 「调用Graphql服务端接口3」定义gql Schema

// 根据ID查询用户
export const FIND = gql`
  query find($id: String!){
    find(id: $id) {
      name
      desc
      id
    }
  }
`;

// 新建用户
export const CREATE = gql`
  mutation create($params: UserInput!) {
    create(params: $params)
  }
`;
