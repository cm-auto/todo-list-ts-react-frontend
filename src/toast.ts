
export type ToastType = "error" | "info" | "success" | "warning"

export function toast(message: string, type: ToastType = "info", _durationMs: number = 3000) {
	switch (type) {
		case "error":
			console.error(message)
			break
		case "info":
			console.info(message)
			break
		case "success":
			console.log(message)
			break
		case "warning":
			console.warn(message)
			break
	}
}