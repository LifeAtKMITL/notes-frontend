import React from 'react';
import './index.scss';
import { FaGraduationCap, FaHeart } from 'react-icons/fa';
import { BsFillEyeFill } from 'react-icons/bs';
import { INote } from 'types/Note';
import { useNavigate } from 'react-router-dom';

interface IProp {
  Note: INote;
}

const NoteCard: React.FC<IProp> = ({ Note }) => {
  const navigate = useNavigate();
  const toDetail = ({ Note }: IProp) => {
    let a = Note.files[0].url.replace(/\//g, '-');

    navigate(
      // `/notes-detail/${Note.subjectName}/${Note.exam}/${Note.year}/${Note.teachers}/${Note.image}/${Note.description}/${a}`,
      '/notes-detail',
    );
  };
  return (
    <div className='card-container' onClick={() => toDetail({ Note })}>
      <div className='pic-box'>
        <img src={Note.noteImage} />
      </div>
      <div className='info-box'>
        <h3>{Note.subjectName}</h3>
        <h3>
          {Note.exam} / {Note.year}
        </h3>
        <div>
          <FaGraduationCap size={15} className='icon' />
          <p>{Note.teachers[0]}</p>
        </div>
        <div>
          <p>By </p>
          <img src={Note.image} />
          <p>{Note.username}</p>
        </div>
        <div>
          <FaHeart size={15} className='icon' />
          <p>({Note.likeCount})</p>
        </div>
        <div>
          <BsFillEyeFill size={15} className='icon' />
          <p> ({Note.viewCount})</p>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
