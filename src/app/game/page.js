import React  from "react";

const  GamePage = () => {
	const [roomId, setRoomId] = useState('');

	const  createRoom = async ()=>{
		const response = await fetch('/api/room', {
			method: 'POST',
		});
		const data = await response.json();
		setRoomId(data.roomId);
		alert(`Room created with ID: ${data.roomId}`);
	};

	return (
		<div>
			<h1>Welcome to TicTalkToe</h1>
			<p>Game page coming soon...</p>
			<button onClick={createRoom}>Create Room</button>
			<p>Room ID: {roomId}</p>
		</div>
	);

}

export default GamePage;