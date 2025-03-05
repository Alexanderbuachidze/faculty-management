"use client"

import { useFaculty } from "@/context/FacultyContext";
import { addFaculty, updateFaculty } from "@/lib/actions";
import { Faculty } from "@/lib/types/faculty"
import { useState } from "react"

type Props = {
  faculty?: Faculty;
  closeModal: () => void;
}

const FacultyModal = ({ faculty, closeModal }: Props) => {
  const [facultyItem, setFacultyItem] = useState<Faculty>({
    id: faculty?.id ?? Math.floor(Math.random() * 10000),
    title: faculty?.title ?? "",
    body: faculty?.body ?? "",
  })
  const [loading, setLoading] = useState(false)
  const { dispatch } = useFaculty()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const isUpdating = !!faculty

      if (isUpdating) {
        await updateFaculty(dispatch, facultyItem)
      } else {
        await addFaculty(dispatch, facultyItem)
        setFacultyItem({
          id: Math.floor(Math.random() * 10000),
          title: "",
          body: "",
        })
      }

      alert(isUpdating ? "Faculty updated successfully!" : "Faculty added successfully!")
      closeModal()
    } catch (error) {
      console.error(error)
      alert("Error processing faculty")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">{faculty ? "Edit Faculty" : "Add Faculty"}</h2>

      <input
        type="text"
        placeholder="Faculty Title"
        value={facultyItem.title}
        onChange={(e) => setFacultyItem({ ...facultyItem, title: e.target.value })}
        className="w-full p-2 mb-2 border rounded"
        required
      />

      <textarea
        placeholder="Faculty Description"
        value={facultyItem.body}
        onChange={(e) => setFacultyItem({ ...facultyItem, body: e.target.value })}
        className="w-full p-2 mb-2 border rounded"
        required
      />

      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? (faculty ? "Updating..." : "Adding...") : faculty ? "Update Faculty" : "Add Faculty"}
      </button>
    </form>
  )
}

export default FacultyModal
