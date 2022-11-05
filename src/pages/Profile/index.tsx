import React, { useState } from 'react';
import temp from 'assets/test-resource/secret.jpg';
import temp2 from 'assets/test-resource/temp2.jpeg';
import './index.scss';
import { CgNotes } from 'react-icons/cg';
import { FaHeart } from 'react-icons/fa';
import { HiOutlineDownload } from 'react-icons/hi';
import NoteCard from 'components/notecard';
import axios from 'axios';

interface IShowNote {
  subjectName: string;
  examination: string;
  academicYear: string;
  teacherName: string;
  userName: string;
  userPic: string;
  notePic: string;
  noteLike: number;
  noteDownload: number;
}

const ProfilePage = () => {
  //tempUserId
  const userID: string = '63010212';
  const [myNotes, setMyNotes] = useState([]);

  const loadMyNotes = async () => {
    const path = `https://life-at-kmitl-backend-production.up.railway.app/sharenote/${userID}`;
    const res = await axios.get(path);
    console.log(res.data);
    // setMyNotes(res.data);
  };

  return (
    <div className='profile-page'>
      <div className='head'>
        <div className='img-contain'>
          <img src={temp} />
        </div>
        <div className='info'>
          <h2>Yor Forger</h2>
          <div className='collection'>
            <div>
              <CgNotes size={25} />
              <p>1</p>
            </div>
            <div>
              <FaHeart size={25} />
              <p>2</p>
            </div>
            <div>
              <HiOutlineDownload size={25} />
              <p>3</p>
            </div>
          </div>
        </div>
      </div>
      <div className='notes'>
        <span className='my-notes'>My notes</span>
        <NoteCard
          subjectName='Software Architecture'
          examination='Final'
          academicYear='2022'
          teacherName='Parinya Ekparinya'
          userName='Yor Forger'
          userPic={temp}
          notePic={temp2}
          noteLike={53}
          noteDownload={71}
        />
        <NoteCard
          subjectName='Software Architecture'
          examination='Final'
          academicYear='2022'
          teacherName='Parinya Ekparinya'
          userName='Yor Forger'
          userPic={temp}
          notePic={temp2}
          noteLike={53}
          noteDownload={71}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
