import React from 'react';
import './index.scss';
import { FaGraduationCap, FaHeart } from 'react-icons/fa';
import { HiOutlineDownload } from 'react-icons/hi';

interface INote {
  subjectName: string;
  examination: string;
  academicYear: string;
  teacherName: string;
  userName: string;
  userPic: string;
  notePic: string;
  noteLike: number;
  noteView: number;
}

const NoteCard: React.FC<INote> = ({
  subjectName,
  examination,
  academicYear,
  teacherName,
  userName,
  userPic,
  notePic,
  noteLike,
  noteView,
}) => {
  return (
    <div className='card-container'>
      <div className='pic-box'>
        <img src={notePic} />
      </div>
      <div className='info-box'>
        <h3>{subjectName}</h3>
        <h3>
          {examination} / {academicYear}
        </h3>
        <div>
          <FaGraduationCap size={15} className='icon' />
          <p>{teacherName}</p>
        </div>
        <div>
          <p>By </p>
          <img src={userPic} />
          <p>{userName}</p>
        </div>
        <div>
          <FaHeart size={15} className='icon' />
          <p>({noteLike})</p>
        </div>
        <div>
          <HiOutlineDownload size={15} className='icon' />
          <p> ({noteView})</p>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
