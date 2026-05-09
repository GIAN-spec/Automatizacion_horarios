'use client'

import { useState, useEffect } from 'react'

interface Carrera {
  id_carrera: string
  nom_carrera: string
}

interface Ciclo {
  id_ciclo: number
  nom_ciclo: string
}

export default function CursoForm() {
  const [formData, setFormData] = useState({
    id_curso: '',
    creditos: '',
    nom_curso: '',
    id_carrera: '',
    modalidad: '',
    tipo_curso: '',
    id_ciclo: '',
  })
  const [carreras, setCarreras] = useState<Carrera[]>([])
  const [ciclos, setCiclos] = useState<Ciclo[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        const res = await fetch('/api/master-data')
        const data = await res.json()
        if (data.carreras) setCarreras(data.carreras)
        if (data.ciclos) setCiclos(data.ciclos)
      } catch (err) {
        console.error('Error fetching master data:', err)
      }
    }
    fetchMasterData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/cursos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage('Curso registrado exitosamente en la base de datos')
        setFormData({
          id_curso: '',
          creditos: '',
          nom_curso: '',
          id_carrera: '',
          modalidad: '',
          tipo_curso: '',
          id_ciclo: '',
        })
      } else {
        setStatus('error')
        setMessage(data.error || 'Error al registrar curso')
      }
    } catch (err) {
      console.error('❌ Error de conexión:', err)
      setStatus('error')
      setMessage('Error de conexión con el servidor')
    }

    setTimeout(() => {
      setStatus('idle')
      setMessage('')
    }, 4000)
  }

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <div className="form-header">
        <span className="form-icon">📚</span>
        <h3>Registrar Curso</h3>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="curso-id">ID Curso</label>
          <input
            id="curso-id"
            name="id_curso"
            type="text"
            placeholder="CUR-001"
            value={formData.id_curso}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="curso-creditos">Créditos</label>
          <input
            id="curso-creditos"
            name="creditos"
            type="number"
            placeholder="4"
            min="1"
            value={formData.creditos}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group form-group-full">
          <label htmlFor="curso-nombre">Nombre del Curso</label>
          <input
            id="curso-nombre"
            name="nom_curso"
            type="text"
            placeholder="Programación I"
            value={formData.nom_curso}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="curso-carrera">Carrera</label>
          <select
            id="curso-carrera"
            name="id_carrera"
            value={formData.id_carrera}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar carrera...</option>
            {carreras.map((c) => (
              <option key={c.id_carrera} value={c.id_carrera}>
                {c.nom_carrera} ({c.id_carrera})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="curso-modalidad">Modalidad</label>
          <select
            id="curso-modalidad"
            name="modalidad"
            value={formData.modalidad}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar...</option>
            <option value="Presencial">Presencial</option>
            <option value="Virtual">Virtual</option>
            <option value="Semipresencial">Semipresencial</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="curso-tipo">Tipo de Curso</label>
          <input
            id="curso-tipo"
            name="tipo_curso"
            type="text"
            placeholder="Obligatorio"
            value={formData.tipo_curso}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="curso-ciclo">Ciclo</label>
          <select
            id="curso-ciclo"
            name="id_ciclo"
            value={formData.id_ciclo}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar ciclo...</option>
            {ciclos.map((c) => (
              <option key={c.id_ciclo} value={c.id_ciclo}>
                {c.nom_ciclo}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" className="btn-submit" disabled={status === 'loading'}>
        {status === 'loading' ? (
          <span className="btn-loading">⏳ Guardando...</span>
        ) : (
          '📤 Registrar Curso'
        )}
      </button>

      {message && (
        <div className={`form-message ${status === 'success' ? 'form-message-success' : 'form-message-error'}`}>
          {status === 'success' ? '✅' : '❌'} {message}
        </div>
      )}
    </form>
  )
}
