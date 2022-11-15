import NoteCard from 'components/notecard';
import React, { useEffect, useRef, useState } from 'react';
import brand from 'assets/images/brand.png';
import 'pages/FindNotes/index.scss';
import { TbArrowsSort } from 'react-icons/tb';
import { IoSearchOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { INote, IFindNote } from 'types/Note';
import DropdownSelect from 'components/dropdown-select';
import axios from 'axios';
import axiosInstance from 'utils/axios';

interface IGenNote {
  Notes: Array<INote>;
}

// Main Page
const FindNotesPage = () => {
  // Import Function
  const navigate = useNavigate();

  const loadMyNotes = async () => {
    const path = '/sharenote/';
    const res = await axiosInstance.get(path);
    const Data = res.data;

    let collect: INote[] = [];
    Data.map((data: IFindNote) => {
      let note: INote = { ...data.sharenote };
      note.username = data.username;
      note.image = data.image;
      collect.push(note);
    });
    setAllNotes(collect);
    setNotes(collect);
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
  const [allNotes, setAllNotes] = useState<INote[]>([]);
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
  const GenerateNotes: React.FC<IGenNote> = ({ Notes }) => {
    return (
      <div className='notes-container'>
        {Notes.map((note) => {
          return <NoteCard Note={note} key={Notes.indexOf(note)} />;
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
  // search | filter
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

      try {
        if (
          ele.year.includes(filtYear) &&
          ele.exam.includes(filtExam) &&
          (ele.subjectName.toLowerCase().includes(textSearch.toLowerCase()) ||
            ele.subjectId.toLowerCase().includes(textSearch.toLowerCase()) ||
            ele.username.toLowerCase().includes(textSearch.toLowerCase()))
        ) {
          temp.push(ele);
        }
      } catch (error) {
        console.log(ele);
      }
    });

    setNotes(temp);
  }, [searchExam, searchYear, isSearching]);

  // sort
  useEffect(() => {
    let temp: INote[] = [...Notes];
    if (sortBy == 'View') {
      temp.sort((n1, n2) => {
        if (n1.viewCount > n2.viewCount) {
          return -1;
        }
        if (n1.viewCount < n2.viewCount) {
          return 1;
        }
        return 0;
      });
      setNotes(temp);
    } else if (sortBy == 'Like') {
      temp.sort((n1, n2) => {
        if (n1.likeCount > n2.likeCount) {
          return -1;
        }
        if (n1.likeCount < n2.likeCount) {
          return 1;
        }
        return 0;
      });
      setNotes(temp);
    }
  }, [sortBy]);

  useEffect(() => {
    loadMyNotes();
  }, []);

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
