"use client"
import React, { useState } from 'react'
import { useFaculty } from '@/context/FacultyContext'
import Button from './Button'
import FacultyItem from './FacultyItem'
import FacultyModal from './FacultyModal'


const FacultyList = () => {
  const [openModal, setOpenModal] = useState(false)
  const { state: { faculties } } = useFaculty()

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">
            Faculty List
          </h1>
          <Button variant="primary" onClick={() => setOpenModal(true)}>
            + Add Faculty
          </Button>
        </div>
        <div className="grid gap-6">
          {faculties.length > 0 ? (
            faculties.map((faculty) => (
              <FacultyItem key={faculty.id} id={String(faculty.id)} initialFaculty={faculty} />
            ))
          ) : (
            <p className="text-gray-600 text-center">
              No faculties found.
            </p>
          )}
        </div>
      </div>

      {openModal && <FacultyModal closeModal={() => setOpenModal(false)} />}
    </div>
  )
}

export default FacultyList