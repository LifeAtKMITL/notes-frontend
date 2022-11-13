import axios from 'axios';
import Loading from 'components/loading';
import Navbar from 'components/navbar';
import React, { useEffect, useState } from 'react';
import { CgSleep } from 'react-icons/cg';
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
  let myData: IMyData = defMydata;
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
      myData.allLikes = Data.likeCount;
      myData.allNotes = Data.collectionCount;
      myData.allViews = Data.totalViewCount;
      myData.myNotes = Data.sharenotes;
      myData.userImage = Data.image;
      myData.userName = Data.username;

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
        <Navbar userImage={myData.userImage} />
        <Routes />
      </userContext.Provider>
    </div>
  );
}

export { userContext };
export default App;
