import axios from 'axios';
import Loading from 'components/loading';
import Navbar from 'components/navbar';
import React, { useEffect, useState } from 'react';
import Routes from 'routes/routes';
import { IData, IMyData } from 'types/UserData';

const defMydata = {
  userId: '',
  username: '',
  image: '',
  sharenotes: [],
  collectionCount: 0,
  totalViewCount: 0,
  likeCount: 0,
};
const userContext = React.createContext<IData>(defMydata);

function App() {
  let myData: IData = defMydata;
  const [ready, setReady] = useState(false);

  const loadMyData = async () => {
    try {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlUwZjk1NTdiMDlmMTI0N2U0ZGUyYmYzYjFjYjcyNjc5ZSIsImlhdCI6MTY2ODAwMTgyOSwiZXhwIjoxNjcwNTkzODI5fQ.hj-m3KVnEx6hwPjJGOqkAnBZIFocOB8B8Ey_j5uuoTA';
      const path = 'https://life-at-kmitl-backend-production.up.railway.app/sharenote/profile';

      const res = await axios.get(path, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const Data: IData = res.data;
      myData.likeCount = Data.likeCount;
      myData.collectionCount = Data.collectionCount;
      myData.totalViewCount = Data.totalViewCount;
      myData.sharenotes = Data.sharenotes;
      myData.image = Data.image;
      myData.username = Data.username;
      myData.likedNotes = Data.likedNotes;

      setReady(true);
    } catch (error) {
      console.log(error);
    }
  };
  loadMyData();
  if (!ready) {
    return <Loading />;
  }
  console.log('render app');

  return (
    <div>
      <userContext.Provider value={myData}>
        <Navbar userImage={myData.image} />
        <Routes />
      </userContext.Provider>
    </div>
  );
}

export { userContext };
export default App;
