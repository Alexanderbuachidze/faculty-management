"use client"
import { Faculty } from '@/lib/types/faculty'
import React, { useState } from 'react'
import FacultyModal from './FacultyModal'
import { useFaculty } from '@/context/FacultyContext'
import FacultyItem from './FacultyItem'

type Props = {
  faculties: Faculty[]
}

const FacultyList = ({ faculties }: Props) => {
  const [openModal, setOpenModal] = useState(false)
  const { state } = useFaculty()
  console.log({ state })
  return (
    <>
      {openModal && <FacultyModal closeModal={() => setOpenModal(false)} />}
      <div>
        <button onClick={() => setOpenModal(true)}>Add new faculty</button>
      </div>
      <h1 className="text-2xl font-bold mb-4">Faculty List</h1>
      <ul className="space-y-2">
        {faculties.map((faculty) => (
          <li key={faculty.id} className="p-4 border rounded shadow">
            <FacultyItem key={faculty.id} id={String(faculty.id)} initialFaculty={faculty} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default FacultyList