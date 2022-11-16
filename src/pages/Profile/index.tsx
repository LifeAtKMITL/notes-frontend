import React, { useEffect, useState, useContext } from 'react';
import './index.scss';
import { CgNotes } from 'react-icons/cg';
import { FaHeart } from 'react-icons/fa';
import { BsFillEyeFill } from 'react-icons/bs';
import { INote } from 'types/Note';
import { IMyInfo, IData } from 'types/UserData';
import { userContext } from 'App';
import NoteCard from 'components/notecard';
import axios from 'axios';
import axiosInstance from 'utils/axios';

interface IArrayNote {
  Notes: Array<INote>;
}

const ProfilePage = () => {
  // var
  const myData = useContext(userContext);
  const [myInfo, setMyInfo] = useState<IMyInfo>({
    allNotes: myData.collectionCount,
    allLikes: myData.likeCount,
    allViews: myData.totalViewCount,
    userName: myData.username,
    userImage: myData.image,
  });
  const [myNotes, setMyNotes] = useState<INote[]>([]);
  const [isDel, setIsDel] = useState(false);

  // func
  const loadMyNotes = async () => {
    const path = '/sharenote/profile';
    const res = await axiosInstance.get(path, {});
    const Data: IData = res.data;

    let collect: INote[] = [];
    Data.sharenotes.map((n) => {
      let note: INote = { ...n };
      note.username = Data.username;
      note.image = Data.image;
      collect.push(note);
    });
    console.log('collect = ', collect);
    setMyInfo({
      allNotes: Data.collectionCount,
      allLikes: Data.likeCount,
      allViews: Data.totalViewCount,
      userName: Data.username,
      userImage: Data.image,
    });
    setMyNotes(collect);
  };

  // Components

  const MyNotes: React.FC<IArrayNote> = ({ Notes }) => {
    // console.log(Notes);
    return (
      <div className='my-notes'>
        <span className='notes'>My notes</span>
        {Notes.map((note: INote) => {
          return <NoteCard Note={note} key={note._id} />;
        })}
      </div>
    );
  };

  const MyInfo = (MyInfo: IMyInfo) => {
    return (
      <div className='head'>
        <div className='img-contain'>
          <img src={myInfo.userImage} />
        </div>
        <div className='info'>
          <h2>{myInfo.userName}</h2>
          <div className='collection'>
            <div>
              <CgNotes size={25} />
              <p>{myInfo.allNotes}</p>
            </div>
            <div>
              <FaHeart size={25} />
              <p>{myInfo.allLikes}</p>
            </div>
            <div>
              <BsFillEyeFill size={25} />
              <p>{myInfo.allViews}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    loadMyNotes();
  }, [isDel]);

  // main
  return (
    <div className='profile-page'>
      <MyInfo {...myInfo} />
      <MyNotes Notes={myNotes} />
    </div>
  );
};

export default ProfilePage;
