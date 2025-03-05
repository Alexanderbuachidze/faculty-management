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

  console.log({ faculty })
  return (

    <div>
      {openModal && <FacultyModal faculty={faculty} closeModal={() => setOpenModal(false)} />}

      <div className='flex flex-row gap-4'>
        <button onClick={() => setOpenModal(true)}>Edit</button>
        <button onClick={() => {
          router.push("/")
          deleteFaculty(dispatch, faculty?.id)
        }}>Delete</button>
      </div>
      <div>
        <h1 className="text-3xl font-bold">{faculty?.title}</h1>
        <p className="mt-4">{faculty?.body}</p>
      </div>
    </div>
  )
}

export default FacultyItem