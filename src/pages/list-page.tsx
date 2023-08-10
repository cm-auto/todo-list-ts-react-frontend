import { useParams } from "react-router-dom"
import { deleteEntry, getListAndEntriesById, postEntry } from "../api-interface"
import { useEffect, useState } from "react"
import ListComponent from "../components/list-component"
import { ParentAndChildren } from "../models/parent-and-children"
import { toast } from "../toast"
import { ErrorMessage } from "../models/error-message"



export default function ListPage(){

	const {id} = useParams() as {id: string}

	const [list, updateList] = useState<List>()
	const [entries, updateEntries] = useState<Entry[]>()
	const [listExists, updateListExists] = useState<Boolean>(true)
	
	useEffect(() => {
		(async () => {
			const [data, ok] = await getListAndEntriesById(id)
			if(ok){
				const listAndEntries = data as ParentAndChildren<List, Entry>
				updateList(listAndEntries.parent)
				updateEntries(listAndEntries.children)
			}
			updateListExists(ok)
		})()
	}, [""])

	async function deleteEntryById(id: string){
		const [errorOption, success] = await deleteEntry(id)
		if(success){
			toast("successfully deleted", "success")
			// can't fix hook bug, so for now reload
			location.reload()
		}
		if(errorOption){
			toast(errorOption.message, "error")
		}
	}

	async function createEntry(listId: string, name: string){
		const entry = {
			listId,
			name,
		}
		const [response, success] = await postEntry(entry)
		if(success){
			toast("successfully created", "success")
			// can't fix hook bug, so for now reload
			location.reload()
			// updateEntries([...entries as Entry[], response as Entry])
		}
		else{
			const error = response as ErrorMessage
			toast(error.message, "error")
		}
	}

	const content = (() => {
		if(listExists){
			if(list && entries){
				return <ListComponent list={list} entries={entries} deleteEntryById={deleteEntryById} createEntry={createEntry} />
			}
			else{
				return <div className="loader is-size-1"></div>
			}
		}
		else{
			return <div>No such list found</div>
		}
	})()

	return (
		<div>{content}</div>
	)
}
