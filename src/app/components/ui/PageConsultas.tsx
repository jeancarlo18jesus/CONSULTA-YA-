/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */

"use client";

import { useState, ChangeEvent, useEffect, useRef, FormEvent } from "react";
import Image from "next/image";
import { getRoleValidateEstudiante } from "@/app/lib/definitions";
import axios from "axios";
import { parseCookies } from "nookies";
import estudiantes from "../../schema/estudiante.json";
import { useFormState } from "react-dom";
import { ConsultasRegistro } from "@/app/actions/consultasRegistro";

export  function PageConsultas() {
  const [valueEstudiante, setvalueEstudiante] = useState("");
  const [estado, setEstado] = useState(false);
  const [formData, setFormData] = useState({
    fecha: "",
    hora: "",
    sede: "",
    motivo: "",
  });
  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");
  const dateInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDialogElement>(null);

  const [showTermsModal, setShowTermsModal] = useState(false);

  // const successModalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    getRoleValidateEstudiante();
    const getValueConcultasEstudiante = async () => {
      const cookies = parseCookies();
      const token = cookies.access_token;

      if (token) {
        const response = await axios.get("/api/roles");
        if (response.data.usuario.dni) {
          const estudiante = estudiantes.find(
            (estudiante) => estudiante.dni === response.data.usuario.dni
          );
          const customId = estudiante?.customId;
          setvalueEstudiante(customId || "");
        }
      } else {
        console.log("No hay token, puede iniciar sesión.");
      }
    };
    getValueConcultasEstudiante();

    if (dateInputRef.current) {
      dateInputRef.current.min = new Date().toISOString().split("T")[0];
    }
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "fecha") {
      validateDate(value);
    } else if (name === "hora") {
      validateTime(value, formData.fecha);
    }
  };

  const validateDate = (date: string) => {
    const selectedDate = new Date(date);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (selectedDate < currentDate) {
      setDateError("");
    } else {
      setDateError("");
      validateTime(formData.hora, date);
    }
  };

  const validateTime = (time: string, date: string) => {
    if (!date) {
      setTimeError("Por favor, seleccione una fecha primero");
      return;
    }

    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.getDay();
    const [hours, minutes] = time.split(':').map(Number);

    let isValid = false;
    let errorMessage = "";

    switch (dayOfWeek) {
      case 6: // Domingo
        errorMessage = "Lo sentimos, estamos cerrados los domingos";
        break;
      case 5: // Sábado
        isValid = (hours >= 10 && hours < 14) || (hours === 14 && minutes === 0);
        errorMessage = "El horario para sábados es de 10:00 a 14:00";
        break;
      default: // Lunes a Viernes
        isValid = (hours >= 9 && hours < 18) || (hours === 18 && minutes === 0);
        errorMessage = "El horario de lunes a viernes es de 9:00 a 18:00";
    }

    setTimeError(isValid ? "" : errorMessage);
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEstado(e.target.checked);
    if (e.target.checked) {
      setShowTermsModal(true);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (estado && !dateError && !timeError) {
      // @ts-ignore
      action(new FormData(e.currentTarget));

      setFormData({
        fecha: "",
        hora: "",
        sede: "",
        motivo: "",
      });
      setEstado(false);

      // Show modal
      if (modalRef.current) {
        modalRef.current.showModal();
      }
    }
  };

  const closeTermsModal = () => {
    setEstado(false);
    setShowTermsModal(false);
  };

  const acceptTerms = () => {
    setEstado(true);
    setShowTermsModal(false);
  };

  // @ts-expect-error
  const [state, action] = useFormState(ConsultasRegistro, undefined);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl p-8 flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md overflow-hidden">
        <div className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0">
          <h2 className="text-2xl font-bold text-center text-[#f31260] mb-6">
            Registra Tu Consulta
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex space-x-4">
              <div className="flex-1 ">
                <label
                  htmlFor="fecha"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha:
                </label>
                <input
                  type="date"
                  id="fecha"
                  name="fecha"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                  value={formData.fecha}
                  onChange={handleInputChange}
                  ref={dateInputRef}
                />
               
              </div>
              <div className="flex-1 ">
                <label
                  htmlFor="hora"
                  className="block text-sm font-medium text-gray-700"
                >
                  Hora:
                </label>
                <input
                  type="time"
                  id="hora"
                  name="hora"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                  value={formData.hora}
                  onChange={handleInputChange}
                />
                
              </div>
            </div>
              {timeError && (
                  <p className="mt-1 text-sm text-red-600">{timeError}</p>
                )}
            <div>
              <label
                htmlFor="sede"
                className="block text-sm font-medium text-gray-700"
              >
                Sede:
              </label>
              <select
                id="sede"
                name="sede"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                value={formData.sede}
                onChange={handleInputChange}
              >
                <option value="">Selecciona sede</option>
                <option value="Sede Villa El Salvador">
                  Sede Villa El Salvador
                </option>
                <option value="Sede San Juan de Lurigancho">
                  Sede San Juan de Lurigancho
                </option>
                <option value="Sede Surco">Sede Surco</option>
                <option value="Sede Norte">Sede Norte</option>
                <option value="Sede Chiclayo">Sede Chiclayo</option>
                <option value="Sede Callao">Sede Callao</option>
                <option value="Sede Ate">Sede Ate</option>
                <option value="Sede Arequipa">Sede Arequipa</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="motivo"
                className="block text-sm font-medium text-gray-700"
              >
                Motivo:
              </label>
              <select
                id="motivo"
                name="motivo"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                value={formData.motivo}
                onChange={handleInputChange}
              >
                <option value="">Selecciona motivo</option>
                <option value="Cambio de turno">Cambio de turno</option>
                <option value="Evaluación de Recuperación">
                  Evaluación de Recuperación
                </option>
                <option value="Examen Sustitutorio">Examen Sustitutorio</option>
                <option value="Retiro De Ciclo - Carrera">
                  Retiro De Ciclo - Carrera
                </option>
                <option value="Validación De Constancia De Idioma Extranjero">
                  Validación De Constancia De Idioma Extranjero
                </option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="estado"
                name="estado"
                className="rounded text-pink-600 focus:ring-pink-500"
                checked={estado}
                value={valueEstudiante}
                onChange={handleCheckboxChange}
              />
              <label
                htmlFor="estado"
                className="ml-2 block text-sm text-gray-900"
              >
                Aceptar termino y condiciones
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-[#f31260] text-white py-3 px-4 rounded-full font-semibold text-lg hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
              disabled={!estado || !!dateError || !!timeError}
            >
              REGISTRAR
            </button>
          </form>
        </div>
        <div className="w-full md:w-1/2 md:pl-8 flex justify-center items-center">
          <Image
            src="/imgs/consultas_home.svg"
            alt="Ilustración de consulta"
            width={300}
            height={300}
            className="w-full max-w-sm h-auto"
          />
        </div>
      </div>
      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">
              Términos y Condiciones
            </h3>
            <div className="max-h-60 overflow-y-auto mb-4">
              <p>
                Al utilizar este servicio de citas y
                consultas académicas, usted acepta los siguientes términos y
                condiciones: <br/> <br/>  <b>Uso del Servicio:</b> Este servicio está destinado
                únicamente para estudiantes de universidades registradas. Al
                solicitar una cita o consulta, usted garantiza que proporciona
                información veraz y actualizada.<br/>  <br/> <b>Responsabilidad:</b> No nos
                hacemos responsables por la falta de asistencia a las citas
                programadas ni por cualquier inconveniente que surja como
                resultado de una cita o consulta.<br/> <br/>  <b>Protección de Datos:</b> Sus datos
                personales serán tratados con la máxima confidencialidad y se
                utilizarán únicamente para la gestión de citas y consultas. Al
                continuar, usted acepta cumplir con estos
                términos y condiciones.
              </p>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeTermsModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cerrar
              </button>
              <button
                onClick={acceptTerms}
                className="px-4 py-2 bg-[#f31260] text-white rounded-md hover:bg-pink-500"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      <dialog ref={modalRef} className="p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Consulta Registrada</h3>
        <p className="mb-4">Tu consulta ha sido enviada exitosamente.</p>
        <button
          onClick={() => modalRef.current?.close()}
          className="bg-[#f31260] text-white py-2 px-4 rounded hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50"
        >
          Cerrar
        </button>
      </dialog>
    </div>
  );
}
