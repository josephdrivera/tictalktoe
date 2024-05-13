const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const socketIo = require('socket.io');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();


app.prepare().then(() => {
	const server = createServer((req, res) => {
		const parsedUrl = parse(req.url, true);
		handle(req, res, parsedUrl);
	});

	const io = socketIo(server);

	io.on('connection', socket => {
		console.log('Client connected');

		socket.on('createRoom', () => {
			const roomId = nanoid();
			socket.join(roomId);
			io.to(roomId).emit('roomCreated', roomId);
		});

		socket.on('joinRoom', roomId => {
			socket.join(roomId);
			io.to(roomId).emit('newPlayer', 'A new player has joined the room: ' + roomId);
		});

		socket.on('disconnect', () => {
			console.log('Client disconnected');
		});
	});

	server.listen(port, () => {
		console.log(`> Ready on http://localhost:${port}`);
	});
});
