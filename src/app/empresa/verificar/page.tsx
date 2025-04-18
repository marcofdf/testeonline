'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function VerificarEmpresa() {
  const router = useRouter()
  const [mensagem, setMensagem] = useState('Verificando cadastro da empresa...')

  useEffect(() => {
    const verificar = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

      if (sessionError || !sessionData?.session?.user) {
        setMensagem('Sessão não encontrada. Redirecionando para login...')
        setTimeout(() => router.push('/login-empresa'), 2000)
        return
      }

      const user_id = sessionData.session.user.id
      console.log('🔍 Verificando empresa para user_id:', user_id)

      const { data, error } = await supabase
        .from('empresas')
        .select('aprovado')
        .eq('user_id', user_id)
        .single()

      if (error) {
        console.error('❌ Erro ao buscar empresa:', error)
        setMensagem('Erro ao verificar empresa. Redirecionando para login...')
        setTimeout(() => router.push('/login-empresa'), 3000)
        return
      }

      if (!data) {
        console.warn('⚠️ Nenhuma empresa encontrada. Voltando para login...')
        setMensagem('Empresa não encontrada. Redirecionando...')
        setTimeout(() => router.push('/login-empresa'), 3000)
        return
      }

      if (data.aprovado === true) {
        console.log('✅ Empresa aprovada. Indo para painel.')
        router.push('/empresa/painel')
      } else {
        console.log('⏳ Empresa ainda não aprovada. Indo para aguardando.')
        router.push('/empresa/aguardando')
      }
    }

    verificar()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-yellow-700">🔄 {mensagem}</h1>
        <p className="text-gray-700 mt-4 text-sm">Caso demore, tente novamente mais tarde.</p>
      </div>
    </div>
  )
}
