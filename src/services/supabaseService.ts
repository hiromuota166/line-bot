import { createClient, SupabaseClient } from '@supabase/supabase-js';
import 'dotenv/config';
import { Database } from '../types/database.types'; // パスを適切に調整

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Supabaseクライアントの型を指定
export const supabase: SupabaseClient<Database> = createClient(supabaseUrl!, supabaseAnonKey!);

// 型定義に基づいてfetchGroups関数に型を付ける
export const fetchGroups = async (): Promise<Database['public']['Tables']['groups']['Row'][]> => {
  const { data, error } = await supabase
    .from('groups')
    .select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const fetchOrderStatus = async (): Promise<Database['public']['Tables']['orders']['Row'][]> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('order_status', '進行中');

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const fetchMatches = async (): Promise<Database['public']['Tables']['matches']['Row'][]> => {
  const { data, error } = await supabase
    .from('matches')
    .select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const fetchCourtsWithPlayers = async (): Promise<any[]> => {
  const { data, error } = await supabase
    .from('courts')
    .select(`
      court_number,
      id,
      now_order_id (
        id,
        group1_first (name),
        group1_second (name),
        group2_first (name),
        group2_second (name)
      ),
      waiting_id (
        id,
        group1_first (name),
        group1_second (name),
        group2_first (name),
        group2_second (name)
      )
    `)
    .order('court_number', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
