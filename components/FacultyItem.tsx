"use client"
import { Faculty } from '@/lib/types/faculty'
import React, { useEffect, useState } from 'react'
import FacultyModal from './FacultyModal'
import { useFaculty } from '@/context/FacultyContext'
import ConfirmationModal from './ConfirmationModal'
import Button from './Button'

type Props = {
  initialFaculty: Faculty;
  id: string
}

const FacultyItem = ({ initialFaculty }: Props) => {
  const { state } = useFaculty()
  const [faculty, setFaculty] = useState<Faculty>(initialFaculty)
  const [openModal, setOpenModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  useEffect(() => {
    const updatedFaculty = state.faculties.find(f => f.id === initialFaculty.id)
    if (updatedFaculty) {
      setFaculty(updatedFaculty)
    }
  }, [state.faculties, initialFaculty.id])

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 transition-all hover:shadow-lg">
      {openModal && <FacultyModal faculty={faculty} closeModal={() => setOpenModal(false)} />}
      {openDeleteModal && <ConfirmationModal faculty={faculty} closeModal={() => setOpenDeleteModal(false)} />}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          {faculty?.title}
        </h2>
        <p className="mt-2 text-gray-600">
          {faculty?.body}
        </p>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <Button variant="warning" onClick={() => setOpenModal(true)}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => setOpenDeleteModal(true)}>
          Delete
        </Button>

      </div>
    </div>
  )
}

export default FacultyItem