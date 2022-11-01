import NoteCard from 'components/notecard';
import React from 'react';
import brand from 'assets/images/brand.png';
import 'pages/FindNotes/index.scss';
import { TbArrowsSort } from 'react-icons/tb';
import temp from 'assets/test-resource/temp2.jpeg';
import temp2 from 'assets/test-resource/secret.jpg';

interface INote {
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

const FindNotesPage = () => {
  return (
    <div>
      <div className='notes-search'>
        <img src={brand} />
        <h2>Find Note</h2>
        <div>
          <span>Sharing your notes ? </span>
          <a href='#'>click here</a>
        </div>
        <div>
          <input type='text' />
          <br />
          <button>nann</button>
          <button>nani</button>
        </div>
        <div className='sorted'>
          <p>sort</p>
          <TbArrowsSort />
        </div>
      </div>
      <div className='notes-container'>
        <NoteCard
          subjectName='Software Architecture'
          examination='Final'
          academicYear='2022'
          teacherName='Parinya Ekparinya'
          userName='Yor Forger'
          userPic={temp2}
          notePic={temp}
          noteLike={53}
          noteDownload={71}
        />
        <NoteCard
          subjectName='Software Architecture'
          examination='Final'
          academicYear='2022'
          teacherName='Parinya Ekparinya'
          userName='Yor Forger'
          userPic={temp2}
          notePic={temp}
          noteLike={53}
          noteDownload={71}
        />
      </div>
    </div>
  );
};

export default FindNotesPage;
