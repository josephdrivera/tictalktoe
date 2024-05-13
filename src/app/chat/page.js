'ues client';

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

const ChatPage = () => {
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		// Connect to the Socket.IO server
		socket = io();

		// Listen for messages from the server
		socket.on('message', (msg) => {
			setMessages((prevMessages) => [...prevMessages, msg]);
		});

		return () => {
			socket.off('message');
			socket.close();
		};
	}, []);

	const sendMessage = () => {
		if (message) {
			socket.emit('message', message);  // Emit a message to the server
			setMessage('');  // Clear the input after sending
		}
	};

	return (
		<div>
			<h1>Chat Room</h1>
			<input
				type="text"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				placeholder="Type a message..."
			/>
			<button onClick={sendMessage}>Send</button>
			<ul>
				{messages.map((msg, index) => (
					<li key={index}>{msg}</li>
				))}
			</ul>
		</div>
	);
};

export default ChatPage;
