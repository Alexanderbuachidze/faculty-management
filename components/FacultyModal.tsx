"use client"

import { useFaculty } from "@/context/FacultyContext";
import { addFaculty, updateFaculty } from "@/lib/actions";
import { Faculty } from "@/lib/types/faculty"
import { useEffect, useRef, useState } from "react"

type Props = {
  faculty?: Faculty;
  closeModal: () => void;
}

const FacultyModal = ({ faculty, closeModal }: Props) => {
  const [facultyItem, setFacultyItem] = useState<Faculty>({
    id: faculty?.id ?? Date.now(),
    title: faculty?.title ?? "",
    body: faculty?.body ?? "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const { dispatch } = useFaculty()
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [closeModal])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const isUpdating = !!faculty
      let result

      if (isUpdating) {
        result = await updateFaculty(dispatch, facultyItem)
      } else {
        result = await addFaculty(dispatch, facultyItem)
      }

      if (!result.success) {
        throw new Error(result.message)
      }

      setMessage({ type: "success", text: isUpdating ? "Updated successfully!" : "Added successfully!" })
      closeModal()
    } catch (error) {
      setMessage({ type: "error", text: (error as Error).message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div ref={modalRef} className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative animate-fadeIn">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 transition cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">{faculty ? "Edit Faculty" : "Add Faculty"}</h2>

        {message && (
          <div className={`p-3 rounded mb-4 text-white ${message.type === "error" ? "bg-red-500" : "bg-green-500"}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Faculty Title"
            value={facultyItem.title}
            onChange={(e) => setFacultyItem({ ...facultyItem, title: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />

          <textarea
            placeholder="Faculty Description"
            value={facultyItem.body}
            onChange={(e) => setFacultyItem({ ...facultyItem, body: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />

          <button
            type="submit"
            className={`w-full py-2 text-white font-semibold rounded-lg transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            disabled={loading}
          >
            {loading ? "Processing..." : faculty ? "Update Faculty" : "Add Faculty"}
          </button>
        </form>
      </div>
    </div>
  )
}


export default FacultyModal
