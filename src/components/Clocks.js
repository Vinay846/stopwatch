import React, { useState } from 'react';
import '../App.css';
import Button from 'react-bootstrap/Button';

function Clocks(props) {
	const [ time, setTime ] = useState(0);
	const [ state, setState ] = useState('Start');

	let sec = 0;
	let Min = 0;

	const handleStart = (idx) => {
		let timer = setInterval(() => {
			setTime((prev) => prev + 1);
		}, 1 * 1000);
		props.addTimer(idx, timer);
	};

	const handleStop = (idx) => {
		props.stopTimer(idx);
	};

	const handleStartStop = () => {
		if (state === 'Start' || state === 'Resume') {
			handleStart(props.idx);
			setState('Stop');
		} else if (state === 'Stop') {
			handleStop(props.idx);
			setState('Resume');
		}
	};

	const handleRemove = () => {
		handleStop(props.idx);
		props.remove(props.idx, props.clockId);
	};

	Min = parseInt(time / 60);

	sec = time % 60;
	return (
		<div className="clock-body">
			<div className="clock">
				{Min < 10 ? '0' + Min : Min}: {sec < 10 ? '0' + sec : sec}
			</div>
			<Button variant="success" onClick={handleStartStop}>{state}</Button>
			<Button variant="danger" onClick={handleRemove}>Remove</Button>
		</div>
	);
}

export default Clocks;
