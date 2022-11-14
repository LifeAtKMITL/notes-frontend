import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getShareNote, putLike } from './getSharenote';
import './index.css';
import { FaGraduationCap, FaHeart } from 'react-icons/fa';
import { BsFillEyeFill } from 'react-icons/bs';
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
  margin: 0.5em;
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;
const Top = styled.div`
  border-radius: 5px;
  padding: 1em;
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
  margin-top:0.3em;
  background-color: #343434;
  height: 10%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
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
const DetailNote = ({props}:Iprops) => {
  const noteId = props.id;
  const userName = props.username;
  const subjectName = props.subjectName;
  const teacherName = props.teacher;
  const file = props.pdf;
  const exam = props.exam;
  const year = props.year;
  const [likeCount,setLikeCount] = useState(Number(props.likes)); 
  const viewCount = props.views;
  const desciption = props.description;
  const likedId = props.likeArr;
  const check = likedId.includes(noteId);
  const [like, setLike] = useState(check);
  console.log('likedId', likedId);
  const likeClikeHandler = ()=>{
    console.log(noteId)
    if (like == false){
        putLike(noteId).then(res => {
            console.log(res);
            console.log('PASS');
          })
          .catch(err => {
            console.log(err);
          });
        setLikeCount(likeCount+1)
        setLike(true)
    }
    else{
        setLikeCount(likeCount-1)
        setLike(false)
    }
    
  }
  return (
    <Container>
      <Wrapper className='glass'>
        <Top>
          <iframe id='iframepdf' src={file}   frameBorder='2' scrolling='no' height='100%' width='100%'></iframe>
        </Top>
        <Mid>
          <h1>{subjectName}</h1>
          <DivTag2><FaGraduationCap></FaGraduationCap><h3>{teacherName}</h3></DivTag2>
          
          <h3>{userName}</h3>
          <DivTag2>
            <button className='button-12' role='button'>
              {exam}
            </button>
            <button className='button-12' role='button'>
              {year}
            </button>
          </DivTag2>
          <DivTag2>
          <button className='button-28' role='button' onClick={likeClikeHandler}>
          <FaHeart></FaHeart>
            LIKE ({likeCount})
          </button>
          <button className='button-28' role='button' onClick={likeClikeHandler}>
          <BsFillEyeFill></BsFillEyeFill>
            VIEW ({viewCount})
          </button>
          </DivTag2>
        </Mid>
        <Under>
          <p>Description : </p>
          <p>{desciption}</p>
        </Under>
      </Wrapper>
    </Container>
  );
};

export default DetailNote;
