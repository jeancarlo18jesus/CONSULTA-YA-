'use client'

import React, { useEffect, useState } from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { getRoleValidateEstudiante } from '@/app/lib/definitions'
import { faqData } from '@/seed';



export function PagePreguntas() {
  useEffect(() => {
    getRoleValidateEstudiante() ;
  }, []);
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (

     <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 ">
      <h1 className="text-3xl font-bold text-center text-[#f31260] mb-8">Preguntas Frecuentes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {faqData.map((item, index) => (
          <div key={index} className="border border-gray-300 rounded-lg overflow-hidden">
            <button
              className="w-full p-4 text-left flex justify-between items-center hover:bg-[#f31260] hover:text-white transition-colors"
              onClick={() => toggleAccordion(index)}
            >
              <span className="flex-1 pr-4">{item.question}</span>
              <ChevronDownIcon
                className={`w-5 h-5 flex-shrink-0 transition-transform ${
                  openIndex === index ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="p-4 bg-rose-300 border-t border-pink-100">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}