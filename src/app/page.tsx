'use client'

import { useState } from 'react'
import {
  // IoLogoInstagram,
  // IoLogoFacebook,
  // IoLogoTwitter,
  IoSchoolSharp,
} from "react-icons/io5"
import Image from "next/image"
import { Loader2 } from "lucide-react"

export default function Page() {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    setIsLoading(true)
    setTimeout(() => {
      window.location.href = '/role'
    }, 1000)
  }

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      <div className="absolute right-0 top-0 w-3/4 h-full bg-gradient-to-br from-red-950 to-pink-950 rounded-l-full"></div>
      <div className="relative z-10 flex items-center justify-between h-full max-w-6xl mx-auto px-4">
        <div className="w-1/2 h-1/2">
          <Image
            src="/imgs/image_presentacion.png"
            alt="Ensalada"
            width={500}
            height={400}
            className="rounded-full w-[400px] h-[400px] shadow-lg object-cover"
          />
        </div>
        <div className="w-1/2 text-white">
          <h1 className="text-7xl font-bold mb-4">
            Consultas.{" "}
            <span className="bg-gradient-to-br from-rose-700 to-pink-800 bg-clip-text text-transparent animate-pulse">
              YA
            </span>{" "}
            <IoSchoolSharp className="w-40 h-40 mb-6 translate-x-5 absolute top-[5%] left-[80%] rotate-12 text-rose-900 animate-pulse" />{" "}
          </h1>
          <h2 className="text-sm mb-4 flex">
            Bienvenidos al sistema de consultas{" "}
          </h2>
          <p className="text-sm max-w-md">
            <button
              onClick={handleClick}
              disabled={isLoading}
              className="bg-white text-rose-700 font-semibold py-2 px-6 rounded-full hover:bg-opacity-90 transition-colors duration-300 mb-8 flex items-center justify-center"
            >
              {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Actualizando...
              </>
              ) : (
              'Comenzamos'
              )}
            </button>
          </p>
          {/* <div className="flex space-x-4">
            <a
              href="#"
              className="hover:text-rose-700 transition-colors duration-300"
            >
              <IoLogoInstagram className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="hover:text-rose-700 transition-colors duration-300"
            >
              <IoLogoFacebook className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="hover:text-rose-700 transition-colors duration-300"
            >
              <IoLogoTwitter className="w-6 h-6" />
            </a>
          </div> */}
        </div>
      </div>
    </div>
  )
}