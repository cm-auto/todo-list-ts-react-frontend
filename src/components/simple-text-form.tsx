export default function SimpleTextForm(props: {submitHandler: (input: string)=>void}){
	const {submitHandler} = props
	return <form onSubmit={(e) => 
			{
				e.preventDefault()
				const form = e.target as HTMLFormElement
				const formData = new FormData(form)
				const value = formData.get("value") as string
				if(!value){
					return
				}
				submitHandler(value)
			}}>
				<input name="value"></input>
				<label>
					<input type="submit" className="is-hidden"></input>
					<span className="material-icons">add</span>
				</label>
			</form>
}