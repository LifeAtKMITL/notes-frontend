import React, { useEffect, useState } from 'react';
import './index.scss';
import { CgNotes } from 'react-icons/cg';
import { FaHeart } from 'react-icons/fa';
import { BsFillEyeFill } from 'react-icons/bs';
import { INote } from 'types/Note';
import NoteCard from 'components/notecard';
import axios from 'axios';

//test rsc
import temp from 'assets/test-resource/secret.jpg';
import temp2 from 'assets/test-resource/temp2.jpeg';
import data from 'assets/test-resource/data.json';

interface IMyInfo {
  userName: string;
  userImage: string;
  allLikes: number;
  allNotes: number;
  allViews: number;
}
interface IData {
  userName: string;
  userImage: string;
  Notes: INote[];
}
interface IArrayNote {
  Notes: Array<INote>;
}

const ProfilePage = () => {
  // var
  const [myInfo, setMyInfo] = useState<IMyInfo>({
    allNotes: 0,
    allLikes: 0,
    allViews: 0,
    userName: 'Yor',
    userImage: temp,
  });
  const [myNotes, setMyNotes] = useState<INote[]>([]);

  // func
  const loadMyNotes = async () => {
    const path = 'https://life-at-kmitl-backend-production.up.railway.app/sharenote/profile';
    const res = await axios.get(path);

    // Initial
    let Notes: INote[] = res.data.Notes;
    let userName = res.data.userName;
    let userImage = res.data.userImage;

    setMyNotes(Notes);

    // MyInfo
    let nubNotes = 0;
    let nubLikes = 0;
    let nubViews = 0;
    Notes.map((note) => {
      nubNotes += 1;
      nubLikes += note.likeCount;
      nubViews += note.viewCount;
    });
    let temp: IMyInfo = {
      allNotes: nubNotes,
      allLikes: nubLikes,
      allViews: nubViews,
      userName: userName,
      userImage: userImage,
    };
    setMyInfo(temp);
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
    // loadMyNotes();
  }, []);

  // main
  return (
    <div className='profile-page'>
      <MyInfo {...myInfo} />
      <MyNotes Notes={myNotes} />
    </div>
  );
};

export default ProfilePage;
