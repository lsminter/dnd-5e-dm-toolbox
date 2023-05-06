import { createClient } from '@supabase/supabase-js'
import {supabaseKey, supabaseUrl} from './config'

export const supabase = createClient(
  supabaseUrl,
  supabaseKey,
)