import React from 'react';
import './index.scss';
import { FaGraduationCap, FaHeart } from 'react-icons/fa';
import { BsFillEyeFill } from 'react-icons/bs';
import { INote } from 'types/Note';
import { useNavigate, useLocation } from 'react-router-dom';

interface IProp {
  Note: INote;
}

const NoteCard: React.FC<IProp> = ({ Note }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const toDetail = ({ Note }: IProp) => {
    // console.log('pdf before = ', Note.files[0].url);
    let pdf = Note.files[0].url.replaceAll('%2f', '-=');
    let cover = Note.noteImage || '';
    // console.log('pdf after = ', pdf);

    let pic = Note.image;
    navigate(
      `/notes-detail?id=${Note._id}&subjectName=${Note.subjectName}&teacher=${Note.teachers[0]}&exam=${Note.exam}&year=${Note.year}&description=${Note.description}&username=${Note.username}&views=${Note.viewCount}&likes=${Note.likeCount}&pic=${pic}&pdf=${pdf}&cover=${cover}`,
    );
  };

  const deleteNote = () => {
    const delId = Note._id;
    console.log(delId);
  };

  return (
    <div className='comp'>
      {location.pathname == '/profile' && (
        <span className='del' onClick={deleteNote}>
          <div className='bar'></div>
        </span>
      )}
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
          <div className='user'>
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
    </div>
  );
};

export default NoteCard;
