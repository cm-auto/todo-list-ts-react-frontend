import { Link } from "react-router-dom"
import DeleteButton from "./delete-button"
import { deleteList } from "../api-interface"
import { toast } from "../toast"

type ListOnlyComponentProperties = {
	list: List
}

export default function ListOnlyComponent(props: ListOnlyComponentProperties){

	async function deleteHandler(id: string){
		const [errorOption, success] = await deleteList(id)
		if(success){
			toast("successfully deleted", "success")
			// can't fix hook bug, so for now reload
			location.reload()
		}
		if(errorOption){
			toast(errorOption.message, "error")
		}
	}

	return (
		<div>
			<Link to={`/lists/${props.list._id}`}>{props.list.name}</Link>
			<DeleteButton id={props.list._id} deleteFunction={deleteHandler}></DeleteButton>
		</div>
	)
}