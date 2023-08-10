import DeleteButton from "./delete-button"

interface EntryProps {
	entry: Entry
	updateEntry: (data: Entry) => void
	deleteEntryById: (id: string) => void
}

export default function EntryComponent(props: EntryProps) {
	const {entry, updateEntry, deleteEntryById} = props
	return (
		<div
			className="card is-clickable mx-2 my-1"
			onClick={() => updateEntry({...entry, done: !entry.done})}
		>
			<h1
				className={"entry" + (entry.done ? ' strike-through' : '')}
			>{entry.name}</h1>
		<DeleteButton id={entry._id} deleteFunction={deleteEntryById}></DeleteButton>
		</div>
	)	
}