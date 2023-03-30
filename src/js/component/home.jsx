import React from "react";
import { useEffect, useRef, useState } from 'react';
import {BsPlayCircle,BsPauseCircle,BsArrowRightCircle,BsArrowLeftCircle} from "react-icons/bs"
 
function Home() {
  const [list, setList] = useState([]);
  const [isPlaying, setIsPlaying ] = useState(false);
  const [music, setMusic] = useState(0)
  const audioPlayer = useRef(null);

  function getInfo() {
	fetch("https://assets.breatheco.de/apis/sound/songs").then((response) => {
		return response.json();
	  })
	  .then((data) => setList(data))
	  .catch((err) => console.log(err));
	}

  	useEffect(() => {
	  getInfo();
	}, []);

	const  setSong = (link , i) => {
		audioPlayer.current.src = `https://assets.breatheco.de/apis/sound/${link}`
		audioPlayer.current.play();
		setMusic(i)
		changePlaying()
	}
 
  	const changePlaying =()=> {
		const prevValue = isPlaying
		setIsPlaying(!prevValue);
		if (!prevValue){
			audioPlayer.current.play()}
		else {
			audioPlayer.current.pause();
		}
	}
  
	const nextMusica = () => {
		if (music < list.length -1 ) {
			setMusic(music+1);
		} else { setMusic(0);}
		audioPlayer.current.src = `https://assets.breatheco.de/apis/sound/${list[music].url}`
		audioPlayer.current.play();
	  }
	 
	const anteriorMusica = () => {
		if (music > 0) {
			setMusic(music-1);
		}else { setMusic(list.length -1 );}
			audioPlayer.current.src = `https://assets.breatheco.de/apis/sound/${list[music].url}`
			audioPlayer.current.play();
	}
 
 return (
	<>
		<div className="container">
			<div className="listsongs mx-auto">
				<ol className="list-group list-group-numbered overflow-auto"> {list.map((item, index) => (
					<li key={index} value={index} className="list-group-item p-3 text-start" onClick={()=>setSong(item.url,index)}>{item.name}</li>
				))}  </ol>
				<audio  ref={audioPlayer} src="https://assets.breatheco.de/apis/sound/songs" type="audio.mp3"/>
				<div className="controls mx-auto text-center ">
					<button className="btn" onClick={anteriorMusica}> <BsArrowLeftCircle/> </button>
					<button className="btn" onClick={changePlaying} > { isPlaying ? <BsPauseCircle/> : <BsPlayCircle/> }	</button>
					<button className="btn" onClick={nextMusica}> <BsArrowRightCircle/> </button>
				</div>
			</div>
		</div>
	</>
 )

}

export default Home;
