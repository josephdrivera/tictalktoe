import React from 'react';
import Link from 'next/link'


const GamePage = () => {
	return (
		<div>
			<h1>Welcome to TicTalkToe</h1>
			<p>Game page coming soon...</p>
			<Link href="/game">
				<>Create Room</>
			</Link>



		</div>
	);
};

export default GamePage;
