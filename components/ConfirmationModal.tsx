import React, { useState } from 'react'
import { useFaculty } from '@/context/FacultyContext';
import { deleteFaculty } from '@/lib/actions';
import { Faculty } from '@/lib/types/faculty';
import Button from './Button';
import Modal from './Modal'

type Props = {
  closeModal: () => void;
  faculty: Faculty
}

const ConfirmationModal = ({ closeModal, faculty }: Props) => {
  const { dispatch } = useFaculty()

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  async function handleDelete() {
    setLoading(true)
    setMessage(null)

    try {
      console.log(faculty.id)
      const result = await deleteFaculty(dispatch, faculty?.id);

      if (!result.success) {
        throw new Error(result.message)
      }

      setMessage({ type: "success", text: "Deleted successfully!" })
      closeModal()
    } catch (error) {
      setMessage({ type: "error", text: (error as Error).message })
    } finally {
      setLoading(false)
    }
  }

  console.log({ faculty })
  return (
    <Modal closeModal={closeModal}>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Are you sure?</h2>

      <p className="text-gray-600 mb-6">
        This action cannot be undone. This will permanently delete the faculty.
      </p>

      {message && (
        <div className={`p-3 rounded mb-4 text-white ${message.type === "error" ? "bg-red-500" : "bg-green-500"}`}>
          {message.text}
        </div>
      )}

      <div className="flex justify-end gap-4">
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          variant="danger"
          isLoading={loading}
          onClick={handleDelete}
          isDisabled={loading}
        >
          {loading ? "Processing..." : "Delete Faculty"}
        </Button>

      </div>

    </Modal>
  )
}

export default ConfirmationModal