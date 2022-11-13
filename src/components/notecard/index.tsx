import React from 'react';
import './index.scss';
import { FaGraduationCap, FaHeart } from 'react-icons/fa';
import { BsFillEyeFill } from 'react-icons/bs';
import { INoteCard } from 'types/Note';

const NoteCard: React.FC<INoteCard> = ({
  subjectName,
  exam,
  year,
  teachers,
  userName,
  userImage,
  noteImage,
  likeCount,
  viewCount,
}) => {
  return (
    <div className='card-container'>
      <div className='pic-box'>
        <img src={noteImage} />
      </div>
      <div className='info-box'>
        <h3>{subjectName}</h3>
        <h3>
          {exam} / {year}
        </h3>
        <div>
          <FaGraduationCap size={15} className='icon' />
          <p>{teachers}</p>
        </div>
        <div>
          <p>By </p>
          <img src={userImage} />
          <p>{userName}</p>
        </div>
        <div>
          <FaHeart size={15} className='icon' />
          <p>({likeCount})</p>
        </div>
        <div>
          <BsFillEyeFill size={15} className='icon' />
          <p> ({viewCount})</p>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
