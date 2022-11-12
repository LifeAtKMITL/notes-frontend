import NoteCard from 'components/notecard';
import React, { useEffect, useRef, useState } from 'react';
import brand from 'assets/images/brand.png';
import 'pages/FindNotes/index.scss';
import { TbArrowsSort } from 'react-icons/tb';
import { IoSearchOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import DropdownSelect from 'components/dropdown-select';
import axios from 'axios';

//fake resource
import temp from 'assets/test-resource/temp2.jpeg';
import temp2 from 'assets/test-resource/secret.jpg';

const data: INote[] = [
  {
    subjectID: 'string',
    subjectName: 'Software Architechture',
    teacherName: 'string',
    exam: 'Final',
    year: '2022',
    description: 'string',
    authImage: 'string',
    authName: 'string',
    authID: 'string',
    noteView: 1,
    noteLike: 2,
  },
  {
    subjectID: 'string',
    subjectName: 'string',
    teacherName: 'string',
    exam: 'Midterm',
    year: '2020',
    description: 'string',
    authImage: 'string',
    authName: 'string',
    authID: 'string',
    noteView: 10,
    noteLike: 7,
  },
  {
    subjectID: 'string',
    subjectName: 'string',
    teacherName: 'string',
    exam: 'Midterm',
    year: '2020',
    description: 'string',
    authImage: 'string',
    authName: 'string',
    authID: 'string',
    noteView: 5,
    noteLike: 5,
  },
];

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
interface IProp {
  Notes: Array<INote>;
}

// Main Page
const FindNotesPage = () => {
  // Import Function
  const navigate = useNavigate();

  const loadMyNotes = async () => {
    const path = 'https://life-at-kmitl-backend-production.up.railway.app/sharenote/';
    const res = await axios.get(path);
    console.log(res.data);
    setAllNotes(res.data);
  };
  // Function

  const updateState = (state: string): void => {
    if (!isNaN(Number(state))) {
      setSearchYear(state);
    } else {
      if (state === 'Year') {
        setSearchYear(state);
      } else {
        setSearchExam(state);
      }
    }
  };

  // Variable
  const [allNotes, setAllNotes] = useState<INote[]>(data);
  const [Notes, setNotes] = useState<INote[]>([]);

  const [searchExam, setSearchExam] = useState<string>('Exam');
  const [searchYear, setSearchYear] = useState<string>('Year');
  const textSearchRef = useRef<HTMLInputElement>(null);
  const [sortBy, setSortBy] = useState<string>('sort');

  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Components
  const Title = () => {
    return (
      <div className='title'>
        <img src={brand} />
        <h2>Find Note</h2>
        <p>
          Shares your notes? <a onClick={() => navigate('/share-notes')}>click here</a>
        </p>
      </div>
    );
  };
  const GenerateNotes: React.FC<IProp> = ({ Notes }) => {
    return (
      <div className='notes-container'>
        {Notes.map((note: INote) => {
          return (
            <NoteCard
              subjectName={note.subjectName}
              examination={note.exam}
              academicYear={note.year}
              teacherName={note.teacherName}
              userName={note.authName}
              userPic={note.authImage}
              notePic={temp}
              noteLike={note.noteLike}
              noteView={note.noteView}
              key={Notes.indexOf(note)}
            />
          );
        })}
      </div>
    );
  };
  const SorterButton = () => {
    const [isSorting, setIsSorting] = useState<boolean>(false);

    const handleSort = (prop: string) => {
      setIsSorting(false);
      setSortBy(prop);
    };

    return (
      <div className='sorter-container'>
        <button className='sorter-button' onClick={() => setIsSorting(!isSorting)}>
          <h3>{sortBy}</h3>
          <TbArrowsSort className='icon' size={15} />
        </button>
        <div className={`sorter-menu ${isSorting ? 'active' : 'inactive'}`}>
          <div className='menu' onClick={() => handleSort('sort')}>
            Default
          </div>
          <div className='menu' onClick={() => handleSort('Like')}>
            Most Like
          </div>
          <div className='menu' onClick={() => handleSort('View')}>
            Most View
          </div>
        </div>
      </div>
    );
  };

  // UseEffect
  useEffect(() => {
    let temp: INote[] = [];
    let filtExam = '';
    let filtYear = '';
    let textSearch = '';
    allNotes.forEach((ele) => {
      if (searchExam != 'Exam') {
        filtExam = searchExam;
      }
      if (searchYear != 'Year') {
        filtYear = searchYear;
      }
      if (textSearchRef.current != null) {
        textSearch = textSearchRef.current.value;
      }

      if (ele.year.includes(filtYear) && ele.exam.includes(filtExam) && ele.subjectName.includes(textSearch)) {
        temp.push(ele);
      }
    });
    setNotes(temp);
  }, [searchExam, searchYear, isSearching]);

  useEffect(() => {
    let temp: INote[] = [...Notes];
    if (sortBy == 'View') {
      temp.sort((n1, n2) => {
        if (n1.noteView > n2.noteView) {
          return -1;
        }
        if (n1.noteView < n2.noteView) {
          return 1;
        }
        return 0;
      });
      setNotes(temp);
    } else if (sortBy == 'Like') {
      temp.sort((n1, n2) => {
        if (n1.noteLike > n2.noteLike) {
          return -1;
        }
        if (n1.noteLike < n2.noteLike) {
          return 1;
        }
        return 0;
      });
      setNotes(temp);
    }
  }, [sortBy]);

  // useEffect(() => {
  //   loadMyNotes();
  // }, []);

  //=========== Main ===========
  return (
    <div className='findNote'>
      <Title />
      <div className='search'>
        <div className='search-box'>
          <input type='text' ref={textSearchRef} />
          <button className='button-search' onClick={() => setIsSearching(!isSearching)}>
            <IoSearchOutline size={15} />
          </button>
        </div>
        <DropdownSelect lst={['Midterm', 'Final']} defaultVal='Exam' updateState={updateState} />
        <DropdownSelect
          lst={Array.from({ length: 10 }, (v, k) => (new Date().getFullYear() - k).toString())}
          defaultVal='Year'
          updateState={updateState}
        />
      </div>
      <SorterButton />
      <GenerateNotes Notes={Notes} />
    </div>
  );
};

export default FindNotesPage;
