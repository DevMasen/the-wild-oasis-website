'use client';
import { useState } from 'react';

export default function Counter({ users }) {
	const [count, setCount] = useState(0);
	return (
		<div>
			<h1>Counter: {count}</h1>
			<button onClick={() => setCount(c => c + 1)}>Increment</button>
			<div>{users.length} users</div>
		</div>
	);
}
