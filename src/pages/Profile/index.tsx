import React, { useState } from 'react';
import './index.scss';
import { CgNotes } from 'react-icons/cg';
import { FaHeart } from 'react-icons/fa';
import { BsFillEyeFill } from 'react-icons/bs';
import NoteCard from 'components/notecard';
import axios from 'axios';

//test rsc
import temp from 'assets/test-resource/secret.jpg';
import temp2 from 'assets/test-resource/temp2.jpeg';
import data from 'assets/test-resource/data.json';

interface INote {
  subjectID: string;
  subjectName: string;
  teacherName: string;
  exam: string;
  year: string;
  description: string;
  file?: File;
  authImage: string;
  authName: string;
  authID: string;
  noteView: number;
  noteLike: number;
}

interface Iinfo {
  userName: string;
  userImage: string;
  allLikes: number;
  allNotes: number;
  allViews: number;
}

interface Iprop {
  Notes: Array<INote>;
}

const ProfilePage = () => {
  //tempUserId
  const [myInfo, setMyInfo] = useState<Iinfo>({
    userName: 'Yor Forger',
    userImage: temp,
    allLikes: 1,
    allNotes: 2,
    allViews: 3,
  });
  const [myNotes, setMyNotes] = useState<INote[]>([
    {
      subjectID: 'Gring',
      subjectName: 'Gring',
      teacherName: 'string',
      exam: 'string',
      year: 'string',
      description: 'string',
      // file?: File;
      authImage: 'string',
      authName: 'string',
      authID: 'string',
      noteView: 1,
      noteLike: 1,
    },
    {
      subjectID: 'string',
      subjectName: 'string',
      teacherName: 'string',
      exam: 'string',
      year: 'string',
      description: 'string',
      // file?: File;
      authImage: 'string',
      authName: 'string',
      authID: 'string',
      noteView: 1,
      noteLike: 5,
    },
  ]);

  const loadMyNotes = async () => {
    const path = 'https://life-at-kmitl-backend-production.up.railway.app/sharenote/profile';
    const res = await axios.get(path);
    // console.log(res.data);
    setMyNotes(res.data[1]);
    setMyInfo(res.data[0]);
  };

  //components

  const MyNotes: React.FC<Iprop> = ({ Notes }) => {
    // console.log(Notes);
    return (
      <div className='my-notes'>
        <span className='notes'>My notes</span>
        {Notes.map((note: INote) => {
          return (
            <NoteCard
              subjectName={note.subjectName}
              examination={note.exam}
              academicYear={note.year}
              teacherName={note.teacherName}
              userName={note.authName}
              userPic={note.authImage}
              notePic={''}
              noteLike={note.noteLike}
              noteView={note.noteView}
              key={Notes.indexOf(note)}
            />
          );
        })}
      </div>
    );
  };

  const MyInfo = (myInfo: Iinfo) => {
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

  // loadMyNotes();

  // main
  return (
    <div className='profile-page'>
      <MyInfo {...myInfo} />
      <MyNotes Notes={myNotes} />
    </div>
  );
};

export default ProfilePage;
