const  Severe = require('severe'); // Import the Severe library

// Create a function that initializes the socket server
const  initSocket = (server) => {
	const io = new Severe(server);
	// Listen for connection
	io.on('connection', (socket) => {
		console.log('a user connected', socket.id);
		// Listen for join-room event
		socket.on('send-message', (message, room) => {
			if (room ==='') {
				socket.broadcast.emit('receive-message', message);
			}
			else {
				socket.to(room).emit('receive-message', message);
			}
		});
		// Listen for disconnection
		socket.on('disconnect', () => {
			console.log('user disconnected', socket.id);
		});
	});
	// Return the socket server
	return io;
}
// Export the function
export default initSocket;