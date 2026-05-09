import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const [carreras, ciclos, tiposAula] = await Promise.all([
      prisma.carrera.findMany({
        orderBy: { nom_carrera: 'asc' },
      }),
      prisma.ciclo.findMany({
        orderBy: { id_ciclo: 'asc' },
      }),
      prisma.tipo_aula.findMany({
        orderBy: { nom_tipo_aula: 'asc' },
      }),
    ])

    return NextResponse.json({
      carreras,
      ciclos,
      tiposAula,
    })
  } catch (error) {
    console.error('Error fetching master data:', error)
    return NextResponse.json(
      { error: 'Error al obtener datos maestros' },
      { status: 500 }
    )
  }
}
