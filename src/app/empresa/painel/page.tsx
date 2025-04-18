'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function PainelEmpresa() {
  const router = useRouter()
  const [nome, setNome] = useState<string>('')

  useEffect(() => {
    const buscarEmpresa = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session?.user) {
        router.push('/login-empresa')
        return
      }

      const { data, error } = await supabase
        .from('empresas')
        .select('nome')
        .eq('user_id', session.user.id)
        .single()

      if (error || !data) {
        router.push('/empresa/cadastro')
        return
      }

      setNome(data.nome || '')
    }

    buscarEmpresa()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login-empresa')
  }

  const criarOportunidade = () => {
    router.push('/empresa/criar-oportunidade')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">
          Bem-vindo{nome ? `, ${nome}` : ''}!
        </h1>
        <p className="text-gray-700 mb-6">
          Aqui você pode criar novas oportunidades e visualizar as candidaturas recebidas.
        </p>
        <div className="flex flex-col gap-4">
          <button
            onClick={criarOportunidade}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Criar nova oportunidade
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  )
}
