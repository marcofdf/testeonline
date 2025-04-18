'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function CadastroCriador() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [userId, setUserId] = useState('')
  const [form, setForm] = useState({
    nome: '',
    nicho: '',
    tiktok: '',
    instagram: '',
    youtube: '',
    kwai: '',
  })

  useEffect(() => {
    const obterSessao = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session || !session.user) {
        router.push('/login')
        return
      }

      const emailUsuario = session.user.email!
      const idUsuario = session.user.id

      console.log('Email da sessão:', emailUsuario)
      console.log('User ID da sessão:', idUsuario)

      setEmail(emailUsuario)
      setUserId(idUsuario)
    }

    obterSessao()
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log('Enviando cadastro com:', { userId, email, ...form })

    const { error } = await supabase
      .from('criadores')
      .upsert([
        {
          user_id: userId,
          email,
          nome: form.nome,
          nicho: form.nicho,
          tiktok: form.tiktok,
          instagram: form.instagram,
          youtube: form.youtube,
          kwai: form.kwai,
          aprovado: false,
        },
      ])

    if (error) {
      console.error('Erro ao salvar no banco:', error)
      alert('Erro ao salvar dados.')
    } else {
      alert('Cadastro enviado para aprovação!')
      router.push('/cadastro/sucesso')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Finalizar Cadastro</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="nome" placeholder="Nome completo" value={form.nome} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <input type="text" name="nicho" placeholder="Nicho principal" value={form.nicho} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <input type="text" name="tiktok" placeholder="Link do TikTok" value={form.tiktok} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <input type="text" name="instagram" placeholder="Link do Instagram" value={form.instagram} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <input type="text" name="youtube" placeholder="Link do YouTube" value={form.youtube} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <input type="text" name="kwai" placeholder="Link do Kwai" value={form.kwai} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">Enviar</button>
        </form>
      </div>
    </div>
  )
}
