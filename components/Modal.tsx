import React, { useEffect, useRef } from 'react'

type Props = {
  children: React.ReactNode
  closeModal: () => void;

}

const Modal = ({ children, closeModal }: Props) => {
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


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div ref={modalRef} className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative animate-fadeIn">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 transition cursor-pointer"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  )
}

export default Modal