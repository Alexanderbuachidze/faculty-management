"use client"
import { Faculty } from '@/lib/types/faculty'
import React, { useEffect, useState } from 'react'
import FacultyModal from './FacultyModal'
import { useFaculty } from '@/context/FacultyContext'
import { deleteFaculty } from '@/lib/actions'
import { useRouter } from 'next/navigation'

type Props = {
  initialFaculty: Faculty;
  id: string
}

const FacultyItem = ({ initialFaculty }: Props) => {
  const { state, dispatch } = useFaculty()
  const [faculty, setFaculty] = useState<Faculty>(initialFaculty)
  const [openModal, setOpenModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const updatedFaculty = state.faculties.find(f => f.id === initialFaculty.id)
    if (updatedFaculty) {
      setFaculty(updatedFaculty)
    }
  }, [state.faculties, initialFaculty.id])

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 transition-all hover:shadow-lg">
      {openModal && <FacultyModal faculty={faculty} closeModal={() => setOpenModal(false)} />}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          {faculty?.title}
        </h2>
        <p className="mt-2 text-gray-600">
          {faculty?.body}
        </p>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={() => setOpenModal(true)}
          className="px-3 py-1.5 bg-yellow-500 text-white text-sm font-medium rounded-md hover:bg-yellow-600 transition"
        >
          Edit
        </button>
        <button
          onClick={() => {
            router.push("/");
            deleteFaculty(dispatch, faculty?.id);
          }}
          className="px-3 py-1.5 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default FacultyItem