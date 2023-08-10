import { useState } from "react"
import EntryComponent from "./entry-component"
import { toast } from "../toast"
import { patchEntry } from "../api-interface"
import { ErrorMessage } from "../models/error-message"
import SimpleTextForm from "./simple-text-form"


export type ListProps = {
	list: List,
	entries: Entry[],
	deleteEntryById: (id: string) => void,
	createEntry: (listId: string, name: string) => void,
}

export default function ListComponent(props: ListProps) {
	const {list, entries, deleteEntryById, createEntry} = props
	const entryComponents = entries.map((entry) => {
		const [entryState, updateEntryState] = useState(entry)
		async function updateEntry(input: Entry) {

			const [data, success] = await patchEntry(input._id, input)
			if (!success) {
				const errorMessage = data as ErrorMessage
				toast(errorMessage.message, "error")
				return
			}
			const newEntry = data as Entry

			updateEntryState(newEntry)
		}
		return <EntryComponent key={entryState._id} entry={entryState} updateEntry={updateEntry} deleteEntryById={deleteEntryById}/>
	})
	return (
		<div>
			<h1 className="title">{list.name}</h1>
			<div className="is-flex is-flex-direction-column">{entryComponents}</div>
			<SimpleTextForm submitHandler={name => createEntry(list._id, name)}></SimpleTextForm>
		</div>
	)
}