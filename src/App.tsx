import { useMutation, useQuery } from '@apollo/client';
import { FIND, CREATE } from './graphql/demo';

import './App.css';

// 「调用Graphql接口4」使用useQuery和useMutation获取数据
const App = () => {
  const { loading, data } = useQuery(FIND, {
    variables: {
      id: '61d55314-21ee-4bca-b117-bc5f8f315561',
    },
  });

  useMutation(CREATE);

  return (
    <div>
      <p>
        data:
        {JSON.stringify(data)}
      </p>
      <p>
        loading:
        {`${loading}`}
      </p>
    </div>
  );
};

export default App;
