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
		if (!isPlaying){
			play()	
		}
	}
 
  	const play =()=> {
		const prevValue = isPlaying
		setIsPlaying(!prevValue);
		if (!prevValue){
			audioPlayer.current.play()}
		else {
			audioPlayer.current.pause();
		}
	}
  
	const next = () => {
		let id=music;
		if (!isPlaying){
			play()	
		}
		if (music < list.length -1 ) {
			setMusic(music+1);
			id++
		} else { 
			setMusic(0);
			id=0
		}
		audioPlayer.current.src = `https://assets.breatheco.de/apis/sound/${list[id].url}`
		audioPlayer.current.play();
		const element = document.getElementById(id);
  		element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
	  }
	 
	const prev = () => {
		let id=music
		if (!isPlaying){
			play()	
		}
		if (music > 0) {
			setMusic(music-1);
			id--
		}else { 
			setMusic(list.length-1);
			id=list.length-1;
		}
		audioPlayer.current.src = `https://assets.breatheco.de/apis/sound/${list[id].url}`
		audioPlayer.current.play();
		const element = document.getElementById(id);
  		element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
	}
 
 return (
	<>
		<div className="container">
			<div className="listsongs mx-auto">
				<ol className="list-group list-group-numbered overflow-auto">{list.map((item, index) => (
					<li key={index} id={index} value={index} className={"list-group-item p-3 text-start"+(index===music && isPlaying ? " active" : "")} onClick={()=>setSong(item.url,index)}>{item.name}</li>
				))}  </ol>
				<audio  ref={audioPlayer} src="#" type="audio.mp3"/>
				<div className="controls mx-auto text-center ">
					<button className="btn" onClick={prev}> <BsArrowLeftCircle/> </button>
					<button className="btn" onClick={play} > { isPlaying ? <BsPauseCircle/> : <BsPlayCircle/> }	</button>
					<button className="btn" onClick={next}> <BsArrowRightCircle/> </button>
				</div>
			</div>
		</div>
	</>
 )

}

export default Home;
