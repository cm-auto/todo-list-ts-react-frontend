import { useEffect, useState } from "react"
import { getAllLists, postList } from "../api-interface"
import ListOnlyComponent from "./list-only-component"
import SimpleTextForm from "./simple-text-form"
import { toast } from "../toast"
import { ErrorMessage } from "../models/error-message"

function Home() {

	
	const [lists, updateLists] = useState<List[]>()

	useEffect(() => {
		(async () => {
			const listsResult = await getAllLists()
			updateLists(listsResult)
		})()
	}, [""])

	const content = (() => {
			if(lists){
				const listOnlyComponents = []
				for(const list of lists){
					const component = <ListOnlyComponent key={list._id} list={list} ></ListOnlyComponent>
					listOnlyComponents.push(component)
				}
				return listOnlyComponents
			}
			else{
				return <div className="loader is-size-1"></div>
			}
	})()

	async function createList(name: string){
		const [data, success] = await postList(name)
		if(!success){
			const error = data as ErrorMessage
			toast(error.message, "error")
			return
		}
		// const list = data as List
		location.reload()
	}

  return (
    <div>
      <h1>Home</h1>
      <div>{content}</div>
	  <SimpleTextForm submitHandler={createList}></SimpleTextForm>
    </div>
  )
}

export default Home
