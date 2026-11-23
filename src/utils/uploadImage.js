import { supabase } from '../../utils/supabase.js'

export async function uploadImage(file, folder = 'general') {
  if (!file) return null
  const ext = file.name.split('.').pop()
  const path = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
  const { error } = await supabase.storage
    .from('media')
    .upload(path, file, { contentType: file.type, upsert: false })
  if (error) throw error
  const { data } = supabase.storage.from('media').getPublicUrl(path)
  return data.publicUrl
}