export default async function Page() {
	const res = await fetch('https://jsonplaceholder.typicode.com/users');
	const users = await res.json();

	return (
		<div>
			<h2>Cabins Page</h2>
			<ul>
				{users.map(user => (
					<li key={user.id}>{user.name}</li>
				))}
			</ul>
		</div>
	);
}
