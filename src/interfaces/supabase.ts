export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type Gender = "male" | "female" | "children";

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          brand: string | null;
          category: string | null;
          created_at: string;
          description: string | null;
          discount_percentage: number | null;
          regular_price: number | null;
          gender: Gender | null;
          sizes: string[];
          id: number;
          images: string[] | null;
          name: string | null;
          price: number | null;
          slug: string | null;
          user_id: string | null;
        };
        Insert: {
          brand?: string | null;
          category?: string | null;
          created_at?: string;
          description?: string | null;
          discount_percentage?: number | null;
          regular_price?: number | null;
          id?: number;
          images?: string[] | null;
          name?: string | null;
          price?: number | null;
          slug?: string | null;
          user_id?: string | null;
          sizes: string[];
        };
        Update: {
          brand?: string | null;
          category?: string | null;
          created_at?: string;
          description?: string | null;
          discount_percentage?: number | null;
          regular_price?: number | null;
          id?: number;
          images?: string[] | null;
          name?: string | null;
          price?: number | null;
          slug?: string | null;
          user_id?: string | null;
          sizes: string[];
        };
        Relationships: [
          {
            foreignKeyName: "public_products_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      user_favorites: {
        Row: {
          created_at: string;
          id: number;
          product_id: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          product_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          product_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      users: {
        Row: {
          age: number | null;
          avatar: string | null;
          brand: string | null;
          city: string | null;
          created_at: string;
          id: string;
          isSeller: boolean | null;
          name: string | null;
        };
        Insert: {
          age?: number | null;
          avatar?: string | null;
          brand?: string | null;
          city?: string | null;
          created_at?: string;
          id?: string;
          isSeller?: boolean | null;
          name?: string | null;
        };
        Update: {
          age?: number | null;
          avatar?: string | null;
          brand?: string | null;
          city?: string | null;
          created_at?: string;
          id?: string;
          isSeller?: boolean | null;
          name?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
