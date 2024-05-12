import {nanoid} from 'nanoid';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		// Create a new room
		const roomId = nanoid(6);
		// Ideally, store room details in a database
		res.status(201).json({roomId, message: 'Room created successfully'});
	} else if  (res.method === 'GET') {
		//nList room or return room details
		res.status(200).json({message: 'Rooms fetched successfully'});}
		else {
		res.setHeader('Allow', ['POST', 'GET']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
