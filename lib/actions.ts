import { Action } from "@/context/FacultyContext"
import { Faculty } from "./types/faculty"

export async function addFaculty(dispatch: React.Dispatch<Action>, newFaculty: Faculty) {
  try {

    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFaculty),
    })

    const response = await res.json()

    dispatch({ type: "ADD_FACULTY", payload: response })

  } catch (error) {
    console.error(error)
  }
}

export async function updateFaculty(dispatch: React.Dispatch<Action>, faculty: Faculty) {
  try {

    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${faculty.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(faculty),
    })

    const response = await res.json()

    dispatch({ type: "UPDATE_FACULTY", payload: response })
    dispatch({ type: "SET_SELECTED_FACULTY", payload: response })
  } catch (error) {
    console.error(error)
  }
}

export async function deleteFaculty(dispatch: React.Dispatch<Action>, id: number) {
  try {
    dispatch({ type: "DELETE_FACULTY", payload: id })

    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: "DELETE" })

  } catch (error) {
    console.error(error)
  }
}
