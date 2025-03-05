import { Faculty } from "./types/faculty"

export async function getFaculties(): Promise<Faculty[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch faculties")
  }

  return response.json()
}
