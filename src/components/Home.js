import React, { useState } from 'react';
import Clocks from './Clocks';
import uuid from 'react-uuid';
import '../App.css';
import Button from 'react-bootstrap/Button';


function Home() {
	const [ datas, setDatas ] = useState([]);

	const handleAdd = () => {
		let tempArr = [ ...datas ];
		tempArr.push({ clockId: uuid(), timer: null });
		setDatas(tempArr);
	};

	const addTimer = (id, timer) => {
		let tempArr = [ ...datas ];
		tempArr[id].timer = timer;
		setDatas(tempArr);
	};

	const stopTimer = (id) => {
		let tempArr = [ ...datas ];
		clearInterval(tempArr[id].timer);
		setDatas(tempArr);
	};

	const remove = (idx, clockId) => {
		// console.log('from parent ' + idx);
		let tempArr = [ ...datas ];
		if (tempArr[idx].clockId === clockId) {
			tempArr.splice(idx, 1);
			setDatas(tempArr);
		}
	};

	return (
		<div className="header">
            <div id="title">Online StopWatch</div>
			<Button className="my-3" onClick={handleAdd}>Add</Button>
			{datas.length === 0 ? (
				<div>No stopWatch created</div>
			) : (
				datas.map((data, idx) => (
					<div key={data.clockId}>
						<Clocks
							remove={remove}
							stopTimer={stopTimer}
							addTimer={addTimer}
							clockId={data.clockId}
							idx={idx}
						/>
					</div>
				))
			)}
		</div>
	);
}

export default Home;
