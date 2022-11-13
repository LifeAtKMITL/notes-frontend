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

interface IArrayNote {
  Notes: Array<INote>;
}

const ProfilePage = () => {
  // var
  const myData = useContext(userContext);
  const [myInfo, setMyInfo] = useState<IMyInfo>({
    allNotes: myData.allNotes,
    allLikes: myData.allLikes,
    allViews: myData.allViews,
    userName: myData.userName,
    userImage: myData.userImage,
  });
  const [myNotes, setMyNotes] = useState<INote[]>(myData.myNotes);
  const [isDel, setIsDel] = useState(false);

  // func
  const loadMyNotes = async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlUwZjk1NTdiMDlmMTI0N2U0ZGUyYmYzYjFjYjcyNjc5ZSIsImlhdCI6MTY2ODAwMTgyOSwiZXhwIjoxNjcwNTkzODI5fQ.hj-m3KVnEx6hwPjJGOqkAnBZIFocOB8B8Ey_j5uuoTA';
    const path = 'https://life-at-kmitl-backend-production.up.railway.app/sharenote/profile';
    const res = await axios.get(path, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const Data: IData = res.data;

    setMyNotes(Data.sharenotes);

    setMyInfo({
      allNotes: Data.collectionCount,
      allLikes: Data.likeCount,
      allViews: Data.totalViewCount,
      userName: Data.username,
      userImage: Data.image,
    });
  };

  // Components

  const MyNotes: React.FC<IArrayNote> = ({ Notes }) => {
    // console.log(Notes);
    return (
      <div className='my-notes'>
        <span className='notes'>My notes</span>
        {Notes.map((note: INote) => {
          return (
            <NoteCard
              subjectName={note.subjectName}
              exam={note.exam}
              year={note.year}
              teachers={note.teachers[0]}
              userName={note.userName || ''}
              userImage={note.userImage || ''}
              noteImage={note.noteImage || ''}
              likeCount={note.likeCount}
              viewCount={note.viewCount}
              key={note._id}
            />
          );
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
