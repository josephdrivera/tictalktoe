const leaderboard = [];

export default function handler(req, res) {
	switch (req.method) {
		case 'POST':
			// Record a game result
			const { player, score } = req.body;
			leaderboard.push({ player, score });
			res.status(201).json({ message: 'Result added to leaderboard' });
			break;
		case 'GET':
			// Get the leaderboard
			res.status(200).json(leaderboard);
			break;
		default:
			res.setHeader('Allow', ['POST', 'GET']);
			res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
