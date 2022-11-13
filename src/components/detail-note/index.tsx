import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getShareNote } from './getSharenote';
import './index.css';

const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 0.5em;
  background-color: #6d61616d;
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
  background-color: #ffffff;
  height: 450px;
  width: 95%;
`;
const Mid = styled.div`
  margin-top: 1em;
  padding: 1em;
  border-radius: 5px;
  border: 2px solid #000;
  background-color: #ffffff;
  height: 10%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Under = styled.div`
  background-color: #ffffff;
  border: 2px solid #000;
  border-radius: 5px;
  height: 10%;
  width: 100%;
  margin-top: 1em;
  padding: 1em;
`;
const DivTag = styled.div`
  /* padding: 1em; */
  background-color: #ffffff;
  height: 10%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const DetailNote = () => {
  // const [sharenote, setSharenote] = useState('');
  // const id:string = 'U0f9557b09f1247e4de2bf3b1cb72679e'
  //     useEffect(() => {
  //     loadSharenote(id);
  //     console.log(sharenote);
  //   }, []);
  //   const loadSharenote = (id:string) => {
  //     getShareNote(id)
  //       .then(res => {
  //         console.log(res.data);
  //         setSharenote(res.data);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  // const [file,setFile] = useState('sdfasdfsasdfa')
  const userId = '124hakfh23hjk';
  const userName = 'sumet suansamran';
  const subjectId = '102314';
  const subjectName = 'data-com';
  const teacherName = 'parinya ja';
  const file =
    'https://firebasestorage.googleapis.com/v0/b/lifekmitl.appspot.com/o/Images%2FU0f9557b09f1247e4de2bf3b1cb72679e%2FMEDITATION%20FOR%20LIFE%20DEVELOPMENT%2Ff9c83d91-0f41-42d3-b63e-2a0008929912?alt=media&token=4c0ade3d-d5d2-427d-bbba-18220d8cd151';
  const exam = 'mid';
  const year = '2001';
  const likeConut = '10';
  const viewConut = '12';
  const desciption = 'gu write description pid';
  return (
    <Container>
      <Wrapper className='glass'>
        <Top>
          <iframe id='iframepdf' src={file} frameBorder='2' scrolling='no' height='100%' width='100%'></iframe>
        </Top>
        <Mid>
          <h1>{subjectName}</h1>
          <h3>{teacherName}</h3>
          <DivTag>
            <button className='button-12' role='button'>
              {exam}
            </button>
            <button className='button-12' role='button'>
              {year}
            </button>
          </DivTag>

          <h3>{userName}</h3>
          <button className='button-28' role='button'>
            LIKE ({likeConut})
          </button>
        </Mid>
        <Under>
          {/* <div ></div> */}
          <p>Description</p>
          <p>{desciption}</p>
        </Under>
      </Wrapper>
    </Container>
  );
};

export default DetailNote;
