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
    .select(`
      id,
      match_id,
      order_num,
      is_doubles,
      group1_score,
      group2_score,
      tie_break,
      winner_team,
      order_status,
      group1_first:players!group1_first (name),
      group1_second:players!group1_second (name),
      group2_first:players!group2_first (name),
      group2_second:players!group2_second (name)
    `)
    .eq('order_status', '進行中');

  if (error) {
    throw new Error(error.message);
  }

  return data;
};