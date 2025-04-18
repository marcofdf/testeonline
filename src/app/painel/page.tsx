'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Painel() {
  const router = useRouter()
  const [nome, setNome] = useState<string>('')

  useEffect(() => {
    const buscarCriador = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session?.user) {
        router.push('/login')
        return
      }

      const { data, error } = await supabase
        .from('criadores')
        .select('nome')
        .eq('user_id', session.user.id)
        .single()

      if (error || !data) {
        router.push('/cadastro')
        return
      }

      setNome(data.nome || '')
    }

    buscarCriador()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Bem-vindo{nome ? `, ${nome}` : ''}!</h1>
        <p className="text-gray-700 mb-6">
          Este é o início do seu painel de criador de conteúdo.
        </p>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Sair
        </button>
      </div>
    </div>
  )
}
