import Counter from '@/app/_components/Counter';

export default async function Page() {
	return (
		<div>
			<h2>Cabins Page</h2>
			<Counter users={users} />
		</div>
	);
}
