export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      courts: {
        Row: {
          court_number: number
          id: string
          now_order_id: string | null
          waiting_id: string | null
        }
        Insert: {
          court_number: number
          id?: string
          now_order_id?: string | null
          waiting_id?: string | null
        }
        Update: {
          court_number?: number
          id?: string
          now_order_id?: string | null
          waiting_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courts_now_order_id_fkey"
            columns: ["now_order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courts_waiting_id_fkey"
            columns: ["waiting_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          final_stage: boolean | null
          groupName: string
          id: string
          qualifying: number | null
        }
        Insert: {
          final_stage?: boolean | null
          groupName: string
          id?: string
          qualifying?: number | null
        }
        Update: {
          final_stage?: boolean | null
          groupName?: string
          id?: string
          qualifying?: number | null
        }
        Relationships: []
      }
      matches: {
        Row: {
          group1_id: string | null
          group2_id: string | null
          id: string
          match_num: number
          winner_id: string | null
        }
        Insert: {
          group1_id?: string | null
          group2_id?: string | null
          id?: string
          match_num: number
          winner_id?: string | null
        }
        Update: {
          group1_id?: string | null
          group2_id?: string | null
          id?: string
          match_num?: number
          winner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matches_group1_id_fkey"
            columns: ["group1_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_group2_id_fkey"
            columns: ["group2_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_winner_id_fkey"
            columns: ["winner_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          group1_first: string
          group1_score: number | null
          group1_second: string | null
          group2_first: string
          group2_score: number | null
          group2_second: string | null
          id: string
          is_doubles: boolean
          match_id: number
          order_num: string
          order_status: string
          tie_break: number | null
          winner_team: string | null
        }
        Insert: {
          group1_first: string
          group1_score?: number | null
          group1_second?: string | null
          group2_first: string
          group2_score?: number | null
          group2_second?: string | null
          id?: string
          is_doubles: boolean
          match_id: number
          order_num: string
          order_status: string
          tie_break?: number | null
          winner_team?: string | null
        }
        Update: {
          group1_first?: string
          group1_score?: number | null
          group1_second?: string | null
          group2_first?: string
          group2_score?: number | null
          group2_second?: string | null
          id?: string
          is_doubles?: boolean
          match_id?: number
          order_num?: string
          order_status?: string
          tie_break?: number | null
          winner_team?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_group1_first_fkey"
            columns: ["group1_first"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_group1_second_fkey"
            columns: ["group1_second"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_group2_first_fkey"
            columns: ["group2_first"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_group2_second_fkey"
            columns: ["group2_second"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_winner_team_fkey"
            columns: ["winner_team"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          group_id: string | null
          id: string
          name: string
        }
        Insert: {
          group_id?: string | null
          id?: string
          name: string
        }
        Update: {
          group_id?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
