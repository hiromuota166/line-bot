import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

export const fetchGroups = async () => {
  const { data, error } = await supabase
    .from('groups')
    .select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const fetchOrderStatus = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('order_status', '進行中');

  if (error) {
    throw new Error(error.message);
  }

  return data;
};