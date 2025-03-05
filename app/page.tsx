"use client"
import FacultyList from "@/components/FacultyList"
import { useFaculty } from "@/context/FacultyContext"

export default function Home() {
  const { state } = useFaculty()

  return (
    <main className="p-4">
      <FacultyList faculties={state.faculties} />
    </main>
  )
}
