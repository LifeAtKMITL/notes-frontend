import axios from 'axios';
import Navbar from 'components/navbar';
import React, { useEffect, useState } from 'react';
import Routes from 'routes/routes';
import { IData, IMyData } from 'types/UserData';

const defMydata = {
  userName: '',
  userImage: '',
  allLikes: 0,
  allNotes: 0,
  allViews: 0,
  myNotes: [],
};
const userContext = React.createContext<IMyData>(defMydata);

function App() {
  const [myData, setMydata] = useState<IMyData>(defMydata);

  const loadMyData = async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlUwZjk1NTdiMDlmMTI0N2U0ZGUyYmYzYjFjYjcyNjc5ZSIsImlhdCI6MTY2ODAwMTgyOSwiZXhwIjoxNjcwNTkzODI5fQ.hj-m3KVnEx6hwPjJGOqkAnBZIFocOB8B8Ey_j5uuoTA';
    const path = 'https://life-at-kmitl-backend-production.up.railway.app/sharenote/profile';
    const res = await axios.get(path, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const Data: IData = res.data;
    setMydata({
      userName: Data.username,
      userImage: Data.image,
      allLikes: Data.likeCount,
      allNotes: Data.collectionCount,
      allViews: Data.totalViewCount,
      myNotes: Data.sharenotes,
    });
  };

  // useEffect
  useEffect(() => {
    loadMyData();
  }, []);

  return (
    <div>
      <userContext.Provider value={myData}>
        <Navbar userImage={myData?.userImage || ''} />
        <Routes />
      </userContext.Provider>
    </div>
  );
}

export { userContext };
export default App;
