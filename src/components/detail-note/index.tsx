import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { getShareNote } from './getSharenote';
import './index.css';

const Container = styled.div`
    height: 100%;
    width: 100%;
    padding :.5em;
    background-color: #6d61616d;
    display:flex;
    flex-direction:column;
    align-items:center;
    `
const Wrapper = styled.div`
/* background-color: #c0b9b9; */
    margin : .5em;
    padding:.5em;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    height:100%;
    width:100%;
`
const Top = styled.div`
    border-radius: 5px;
    padding:1em;
    border: 2px solid #000;
    display:flex;
    justify-content:center;
    align-items:center;
    align-content:center;
    background-color: #ffffff;
    height: 450px;
    width: 95%;
`
const Mid = styled.div`
    margin-top: 1em;
    padding: 1em;
    border-radius: 5px;
    border: 2px solid #000;
    background-color: #ffffff;
    height: 10%;
    width: 100%;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
`

const Under = styled.div`
    background-color: #ffffff;
    border: 2px solid #000;
    border-radius: 5px;
    height: 10%;
    width: 100%;
    margin-top: 1em;
    padding: 1em;
`




const DetailNote = () => {
    const [sharenote, setSharenote] = useState('');
    const id:string = 'U0f9557b09f1247e4de2bf3b1cb72679e'
    useEffect(() => {
    loadSharenote(id);
    console.log(sharenote);
  }, []);
  const loadSharenote = (id:string) => {
    getShareNote(id)
      .then(res => {
        console.log(res.data);
        setSharenote(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <Container>
        <Wrapper className='glass'>
            <Top>
                {/* <h:graphicImage value="https://firebasestorage.googleapis.com/v0/b/lifekmitl.appspot.com/o/Images%2F63011013%2FMATH_%40V1%2F2948373b-faf7-4978-a871-fbd26a4bc233?alt=media&token=8d3ab519-6174-4855-8ff2-ab015574e49a" width="800" height="200" /> */}
                {/* <object data="https://firebasestorage.googleapis.com/v0/b/lifekmitl.appspot.com/o/Images%2F63011013%2FMATH_%40V1%2F2948373b-faf7-4978-a871-fbd26a4bc233?alt=media&token=8d3ab519-6174-4855-8ff2-ab015574e49a" height={1000} width={600}/> */}
                <iframe
                id = 'iframepdf'
                // src="https://firebasestorage.googleapis.com/v0/b/lifekmitl.appspot.com/o/Images%2F63011013%2FMATH_%40V2%2Fb4a30c8d-fe1d-4d56-8eeb-d371a50c7830?alt=media&token=0e7e3b67-72c1-42a6-908f-cf4780b9fbe6"
                frameBorder="2"
                scrolling="no"
                height="100%"
                width="100%"
                ></iframe>
                {/* <img src='https://firebasestorage.googleapis.com/v0/b/lifekmitl.appspot.com/o/Images%2F123%2F234_%40V5%2F1f1c0726-75d5-4f6e-99b8-15b5fd29481b?alt=media&token=698565a4-2024-4757-92b0-9f16e352257b'/> */}
            </Top>
            <Mid>
                <h1>Software-Arch</h1>
                <h3>Final/2022</h3>
                <h3>by sumet suansamran</h3>
                <button className="button-28" role="button">LIKE</button>
            </Mid>
            <Under>
                {/* <div ></div> */}
                <p>Description</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia, quos!</p>
            </Under>
        </Wrapper>
    </Container>
  )
  
}

export default DetailNote