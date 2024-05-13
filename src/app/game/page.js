"use client"; // Add this line to indicate that this file uses Client Components

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

const GamePage = () => {
	const [roomId, setRoomId] = useState('');

	useEffect(() => {
		socket = io();

		socket.on('roomCreated', (id) => {
			setRoomId(id);
			console.log(`Room created with ID: ${id}`);
		});

		return () => {
			socket.off('roomCreated');
			socket.close();
		};
	}, []);

	const createRoom = () => {
		socket.emit('createRoom');
	};

	return (
		<div>
			<h1>Game Page</h1>
			<button onClick={createRoom}>Create Room</button>
			<p>Current Room ID: {roomId}</p>
		</div>
	);
};

export default GamePage;
