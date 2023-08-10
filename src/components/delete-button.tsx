export default function DeleteButton<T>(props: {id: T, deleteFunction: (id: T) => void}){
	const {id, deleteFunction } = props
	return <span
				className="is-clickable has-text-danger-dark material-icons"
				onClick={(event) => {
					deleteFunction(id)
					event.stopPropagation()
				}}
			>delete</span>
}