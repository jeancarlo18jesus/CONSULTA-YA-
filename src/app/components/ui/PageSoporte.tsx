'use client'

import { useState } from 'react'
import { XIcon } from 'lucide-react'
import { commonProblems, guideText, privacyPolicy } from '@/seed'

export function PageSoporte() {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [recommendation, setRecommendation] = useState('')

  const handleSubmitRecommendation = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the recommendation to your backend
    alert('¡Gracias por tu recomendación!')
    setRecommendation('')
    setActiveModal(null)
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold text-center text-pink-500 mb-8">Soporte</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <button 
          onClick={() => setActiveModal('guide')}
          className="p-4 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors text-center"
        >
          Guía paso a paso
        </button>
        <button 
          onClick={() => setActiveModal('problems')}
          className="p-4 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
        >
          Problemas comunes
        </button>
        <button 
          onClick={() => setActiveModal('privacy')}
          className="p-4 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
        >
          Política de privacidad y protección de datos
        </button>
        <button 
          onClick={() => setActiveModal('recommendations')}
          className="p-4 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
        >
          ¡Déjanos tus recomendaciones!
        </button>
      </div>

      {/* Modal for Guide */}
      {activeModal === 'guide' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Guía paso a paso</h2>
              <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-gray-700">
                <XIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              {guideText.split('\n').map((paragraph, index) => (
                <p key={index} className="text-gray-700">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal for Common Problems */}
      {activeModal === 'problems' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Problemas comunes</h2>
              <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-gray-700">
                <XIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              {commonProblems.map((problem, index) => (
                <div key={index} className="border-b pb-4">
                  <h3 className="font-semibold mb-2">{problem.question}</h3>
                  <p className="text-gray-700">{problem.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal for Privacy Policy */}
      {activeModal === 'privacy' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Política de privacidad y protección de datos</h2>
              <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-gray-700">
                <XIcon className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-700 whitespace-pre-line">{privacyPolicy}</p>
          </div>
        </div>
      )}

      {/* Modal for Recommendations */}
      {activeModal === 'recommendations' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">¡Déjanos tus recomendaciones!</h2>
              <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-gray-700">
                <XIcon className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmitRecommendation} className="space-y-4">
              <div>
                <label htmlFor="recommendation" className="block mb-2 font-medium">Tu recomendación:</label>
                <textarea 
                  id="recommendation"
                  value={recommendation}
                  onChange={(e) => setRecommendation(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  rows={4}
                  required
                ></textarea>
              </div>
              <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors">
                Enviar recomendación
              </button>
            </form>
          </div>
        </div>
      )}
    
    </div>
  )
}
