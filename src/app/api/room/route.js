import { nanoid } from 'nanoid';  // Ensure to install nanoid via npm or yarn

// Example in-memory object to hold rooms
const rooms = {};

export default function handler(req, res) {
	switch (req.method) {
		case 'POST':
			// Create a room
			const roomId = nanoid();
			rooms[roomId] = { roomId, players: [], messages: [] };
			res.status(201).json({ roomId });
			break;
		case 'GET':
			// Retrieve all rooms
			res.status(200).json({ rooms });
			break;
		case 'DELETE':
			// Delete a room
			const { roomId: roomIdToDelete } = req.body;
			if (rooms[roomIdToDelete]) {
				delete rooms[roomIdToDelete];
				res.status(200).json({ message: 'Room deleted successfully' });
			} else {
				res.status(404).json({ error: 'Room not found' });
			}
			break;
		default:
			res.setHeader('Allow', ['POST', 'GET', 'DELETE']);
			res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
