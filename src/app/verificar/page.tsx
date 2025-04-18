'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Verificar() {
  const router = useRouter()

  useEffect(() => {
    const verificarCadastro = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session?.user) {
        router.push('/login')
        return
      }

      const userId = session.user.id

      const { data, error } = await supabase
        .from('criadores')
        .select('aprovado')
        .eq('user_id', userId)
        .single()

      if (error) {
        console.error('Erro ao buscar criador:', error)
        router.push('/cadastro')
        return
      }

      if (!data) {
        router.push('/cadastro')
      } else if (!data.aprovado) {
        router.push('/aguardando')
      } else {
        router.push('/painel')
      }
    }

    verificarCadastro()
  }, [router])

  return <p className="text-center mt-10">Verificando cadastro...</p>
}
