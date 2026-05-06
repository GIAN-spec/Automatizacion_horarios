'use client'

import { useState, useEffect } from 'react'

interface TipoAula {
  id_tipo_aula: string
  nom_tipo_aula: string
}

export default function AulaForm() {
  const [formData, setFormData] = useState({
    id_aula: '',
    nom_aula: '',
    id_tipo_aula: '',
    capacidad: '',
  })
  const [tiposAula, setTiposAula] = useState<TipoAula[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        const res = await fetch('/api/master-data')
        const data = await res.json()
        if (data.tiposAula) setTiposAula(data.tiposAula)
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
      const res = await fetch('/api/aulas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage('Aula registrada exitosamente en la base de datos')
        setFormData({
          id_aula: '',
          nom_aula: '',
          id_tipo_aula: '',
          capacidad: '',
        })
      } else {
        setStatus('error')
        setMessage(data.error || 'Error al registrar aula')
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
        <span className="form-icon">🏫</span>
        <h3>Registrar Aula</h3>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="aula-id">ID Aula</label>
          <input
            id="aula-id"
            name="id_aula"
            type="text"
            placeholder="AUL-001"
            value={formData.id_aula}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="aula-nombre">Nombre del Aula</label>
          <input
            id="aula-nombre"
            name="nom_aula"
            type="text"
            placeholder="Laboratorio A"
            value={formData.nom_aula}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="aula-tipo">Tipo de Aula</label>
          <select
            id="aula-tipo"
            name="id_tipo_aula"
            value={formData.id_tipo_aula}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar tipo...</option>
            {tiposAula.map((t) => (
              <option key={t.id_tipo_aula} value={t.id_tipo_aula}>
                {t.nom_tipo_aula} ({t.id_tipo_aula})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="aula-capacidad">Capacidad</label>
          <input
            id="aula-capacidad"
            name="capacidad"
            type="number"
            placeholder="40"
            min="1"
            value={formData.capacidad}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <button type="submit" className="btn-submit" disabled={status === 'loading'}>
        {status === 'loading' ? (
          <span className="btn-loading">⏳ Guardando...</span>
        ) : (
          '📤 Registrar Aula'
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
