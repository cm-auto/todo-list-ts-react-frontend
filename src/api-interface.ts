import { ParentAndChildren } from "./models/parent-and-children"
import { ErrorMessage } from "./models/error-message"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/"

export async function getAllLists(): Promise<List[]> {
	const url = `${API_BASE_URL}lists`
	const response = await fetch(url)
	return response.json()
}

export async function getListById(id: string): Promise<List> {
	const url = `${API_BASE_URL}lists/${id}`
	const response = await fetch(url)
	return response.json()
}

export async function getListAndEntriesById(id: string): Promise<[ParentAndChildren<List, Entry> | ErrorMessage, boolean]> {
	const url = `${API_BASE_URL}lists/${id}/entries`
	const response = await fetch(url)
	const body = await response.json()
	return [body, response.ok]
}

export async function patchEntry(id: string, data: Entry): Promise<[Entry | ErrorMessage, boolean]> {
	const url = `${API_BASE_URL}entries/${id}`
	const response = await fetch(url, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	if (!response.ok) {
		return [await response.json(), false]
	}
	return [await response.json(), true]
}

export type PostEntryRequest = {
	listId: string,
	name: string,
	done?: boolean,
}

export async function postEntry(data: PostEntryRequest): Promise<[Entry | ErrorMessage, boolean]> {
	const url = `${API_BASE_URL}entries`
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	if (!response.ok) {
		return [await response.json(), false]
	}
	return [await response.json(), true]
}

export async function deleteEntry(id: string): Promise<[null | ErrorMessage, boolean]> {
	const url = `${API_BASE_URL}entries/${id}`
	const response = await fetch(url, {
		method: 'DELETE',
	})
	if (!response.ok) {
		return [await response.json(), false]
	}
	return [null, true]
}

export async function postList(name: string): Promise<[List | ErrorMessage, boolean]> {
	const url = `${API_BASE_URL}lists`
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ name })
	})
	if (!response.ok) {
		return [await response.json(), false]
	}
	return [await response.json(), true]
}

export async function deleteList(id: string): Promise<[null | ErrorMessage, boolean]> {
	const url = `${API_BASE_URL}lists/${id}`
	const response = await fetch(url, {
		method: 'DELETE',
	})
	if (!response.ok) {
		return [await response.json(), false]
	}
	return [null, true]
}