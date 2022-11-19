import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getShareNote, putLike } from './getSharenote';
import './index.scss';
import { FaGraduationCap, FaHeart } from 'react-icons/fa';
import { BsFillEyeFill } from 'react-icons/bs';
import axiosInstance from 'axios';
import { useLiff } from 'react-liff';
const Container = styled.div`
  color: white;
  height: 100%;
  width: 100%;
  padding: 0.5em;
  background-color: #252525;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Wrapper = styled.div`
  margin: 0.2em;
  padding: 0.2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;
const Top = styled.div`
  border-radius: 5px;
  /* padding: em; */
  border: 2px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  background-color: #343434;
  height: 450px;
  width: 95%;
`;
const Mid = styled.div`
  margin-top: 1em;
  padding: 1em;
  border-radius: 5px;
  border: 2px solid #000;
  background-color: #343434;
  height: 10%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Under = styled.div`
  background-color: #343434;
  border: 2px solid #000;
  border-radius: 5px;
  height: 10%;
  width: 100%;
  margin-top: 1em;
  padding: 1em;
`;
const DivTag = styled.div`
  /* padding: 1em; */
  background-color: #343434;
  height: 10%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;
const DivTag2 = styled.div`
  /* padding: 1em; */
  align-items: center;
  margin-top: 0.3em;
  background-color: #343434;
  height: 10%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;
const Icon = styled.div`
  margin: 0.4em;
`;
interface IDetailNote {
  id: string;
  subjectName: string;
  teacher: string;
  exam: string;
  year: string;
  description: string;
  username: string;
  views: number;
  likes: number;
  pic: string;
  pdf: string;
  likeArr: string[];
}
interface Iprops {
  props: IDetailNote;
}
const DetailNote = ({ props }: Iprops) => {
  const { liff } = useLiff();
  const noteId = props.id;
  const userName = props.username;
  const subjectName = props.subjectName;
  const teacherName = props.teacher;
  const file = props.pdf;
  const exam = props.exam;
  const year = props.year;
  const img = props.pic;
  const [likeCount, setLikeCount] = useState(Number(props.likes));
  const viewCount = props.views;
  const desciption = props.description;
  const [likedId, setLikedId] = useState<string[]>([]);
  const [likeStr, setLikeStr] = useState('');
  const [like, setLike] = useState(false);
  const [pleum,setPleum] = useState('no pass')

  const dowloadPdf = () => {
    liff.openWindow({
      url:file,
      external:true
    })
  };
  const loadMyData = async () => {
    try {
      const path = '/sharenote/profile';

      const res =  await axiosInstance.get(path, {});
      const data = res.data;
      setLikedId(data.likedNotes);
      setPleum('try loaddata')
      if (data.likedNotes.includes(noteId)) {
        setLike(true);
        setLikeStr('UNLIKE');
      } else {
        setLike(false);
        setLikeStr('LIKE');
      }
    } catch (error) {
      setPleum('catch loaddata')
      console.log(error);
    }
  };
  useEffect(() => {
    loadMyData()
  }, []);
  const likeClikeHandler = () => {
    if (like === false) {
      setLikeCount(likeCount + 1);
      setLikeStr('UNLIKE');
      setLike(true);
      putLike(noteId)
        .then((res) => {
          console.log(res);
          console.log('+1');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLikeCount(likeCount - 1);
      setLike(false);
      setLikeStr('LIKE');
      putLike(noteId)
        .then((res) => {
          // console.log(res);
          console.log('-1');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <Container>
      <h3>
        Open a PDF file <button onClick={dowloadPdf}>click here {pleum}</button>
      </h3>

      <Wrapper className='glass'>
        <Top>
          <iframe
            id='iframepdf'
            src={`${file}#view=fitH`}
            frameBorder='2'
            scrolling='yes'
            height='100%'
            width='100%'
          ></iframe>
        </Top>
        <Mid>
          <h1>{subjectName}</h1>
          <DivTag2>
            <Icon>
              <BsFillEyeFill></BsFillEyeFill>
            </Icon>
            ({viewCount})
          </DivTag2>

          <DivTag2>
            <Icon>
              <FaGraduationCap></FaGraduationCap>
            </Icon>
            <h3>{teacherName}</h3>
          </DivTag2>
          <DivTag2>
            <h3>by</h3>
            <div className='img-contain'>
              <img className='imgg' src={img} />
            </div>
            <h3>{userName} </h3>
          </DivTag2>

          <DivTag2>
            <button className='button-12' role='button'>
              {exam}
            </button>
            <button className='button-12' role='button'>
              {year}
            </button>
            <button className='button-28' role='button' onClick={likeClikeHandler}>
              {likeStr} ({likeCount})
            </button>
          </DivTag2>
        </Mid>
        <Under>
          <h2>- Description -</h2>
          <h4>{desciption}</h4>
        </Under>
      </Wrapper>
    </Container>
  );
};

export default DetailNote;
