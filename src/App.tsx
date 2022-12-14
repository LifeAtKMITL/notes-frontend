import axios from 'axios';
import Loading from 'components/loading';
import Navbar from 'components/navbar';
import Welcome from 'components/welcome';
import React, { useEffect, useState } from 'react';
import Routes from 'routes/routes';
import { IData, IMyData } from 'types/UserData';
import axiosInstance from 'utils/axios';

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
      const path = '/sharenote/profile';

      const res = await axiosInstance.get(path, {});
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
    return <Welcome />;
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
