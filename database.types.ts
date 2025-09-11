export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      ad_applications: {
        Row: {
          created_at: string | null
          id: string
          message: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          slot_id: string
          status: string
          store_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          slot_id: string
          status?: string
          store_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          slot_id?: string
          status?: string
          store_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ad_applications_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ad_applications_slot_id_fkey"
            columns: ["slot_id"]
            isOneToOne: false
            referencedRelation: "ad_slots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ad_applications_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_assets: {
        Row: {
          alt_text: string | null
          approved_by: string | null
          created_at: string | null
          cta_label: string | null
          cta_url: string | null
          id: string
          image_url: string
          is_approved: boolean | null
          reservation_id: string
        }
        Insert: {
          alt_text?: string | null
          approved_by?: string | null
          created_at?: string | null
          cta_label?: string | null
          cta_url?: string | null
          id?: string
          image_url: string
          is_approved?: boolean | null
          reservation_id: string
        }
        Update: {
          alt_text?: string | null
          approved_by?: string | null
          created_at?: string | null
          cta_label?: string | null
          cta_url?: string | null
          id?: string
          image_url?: string
          is_approved?: boolean | null
          reservation_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ad_assets_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ad_assets_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "ad_reservations"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_reservations: {
        Row: {
          approved_by: string | null
          created_at: string | null
          currency: string
          end_date: string
          id: string
          notes: string | null
          payment_ref: string | null
          price: number
          slot_id: string
          start_date: string
          status: string
          store_id: string
          updated_at: string | null
        }
        Insert: {
          approved_by?: string | null
          created_at?: string | null
          currency?: string
          end_date: string
          id?: string
          notes?: string | null
          payment_ref?: string | null
          price: number
          slot_id: string
          start_date: string
          status?: string
          store_id: string
          updated_at?: string | null
        }
        Update: {
          approved_by?: string | null
          created_at?: string | null
          currency?: string
          end_date?: string
          id?: string
          notes?: string | null
          payment_ref?: string | null
          price?: number
          slot_id?: string
          start_date?: string
          status?: string
          store_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_reservations_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ad_reservations_slot_id_fkey"
            columns: ["slot_id"]
            isOneToOne: false
            referencedRelation: "ad_slots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ad_reservations_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_slots: {
        Row: {
          base_price: number
          created_at: string | null
          created_by: string | null
          currency: string
          description: string | null
          id: string
          image_requirements: string | null
          is_active: boolean | null
          placement: string
          sort_order: number | null
          title: string | null
          type: string
          updated_at: string | null
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          base_price?: number
          created_at?: string | null
          created_by?: string | null
          currency?: string
          description?: string | null
          id?: string
          image_requirements?: string | null
          is_active?: boolean | null
          placement: string
          sort_order?: number | null
          title?: string | null
          type: string
          updated_at?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          base_price?: number
          created_at?: string | null
          created_by?: string | null
          currency?: string
          description?: string | null
          id?: string
          image_requirements?: string | null
          is_active?: boolean | null
          placement?: string
          sort_order?: number | null
          title?: string | null
          type?: string
          updated_at?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_slots_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      brands: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          name: string
          owner_id: string | null
          slug: string
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name: string
          owner_id?: string | null
          slug: string
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name?: string
          owner_id?: string | null
          slug?: string
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "brands_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      cart_items: {
        Row: {
          cart_id: string | null
          created_at: string | null
          id: string
          price: number
          product_id: string | null
          quantity: number
          updated_at: string | null
          variant_id: string | null
        }
        Insert: {
          cart_id?: string | null
          created_at?: string | null
          id?: string
          price: number
          product_id?: string | null
          quantity?: number
          updated_at?: string | null
          variant_id?: string | null
        }
        Update: {
          cart_id?: string | null
          created_at?: string | null
          id?: string
          price?: number
          product_id?: string | null
          quantity?: number
          updated_at?: string | null
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "shopping_carts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          slug: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          slug: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          slug?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      coupons: {
        Row: {
          code: string
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          maximum_discount: number | null
          minimum_amount: number | null
          name: string
          per_user_limit: number | null
          type: string
          updated_at: string | null
          usage_limit: number | null
          used_count: number | null
          valid_from: string | null
          valid_until: string | null
          value: number
        }
        Insert: {
          code: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          maximum_discount?: number | null
          minimum_amount?: number | null
          name: string
          per_user_limit?: number | null
          type: string
          updated_at?: string | null
          usage_limit?: number | null
          used_count?: number | null
          valid_from?: string | null
          valid_until?: string | null
          value: number
        }
        Update: {
          code?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          maximum_discount?: number | null
          minimum_amount?: number | null
          name?: string
          per_user_limit?: number | null
          type?: string
          updated_at?: string | null
          usage_limit?: number | null
          used_count?: number | null
          valid_from?: string | null
          valid_until?: string | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "coupons_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      hero_slides: {
        Row: {
          created_at: string | null
          created_by: string | null
          cta_label: string | null
          cta_url: string | null
          id: string
          image_url: string
          is_active: boolean | null
          sort_order: number | null
          subtitle: string | null
          title: string
          updated_at: string | null
          updated_by: string | null
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          cta_label?: string | null
          cta_url?: string | null
          id?: string
          image_url: string
          is_active?: boolean | null
          sort_order?: number | null
          subtitle?: string | null
          title: string
          updated_at?: string | null
          updated_by?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          cta_label?: string | null
          cta_url?: string | null
          id?: string
          image_url?: string
          is_active?: boolean | null
          sort_order?: number | null
          subtitle?: string | null
          title?: string
          updated_at?: string | null
          updated_by?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hero_slides_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hero_slides_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      homepage_banners: {
        Row: {
          created_at: string | null
          created_by: string | null
          cta_label: string | null
          cta_url: string | null
          id: string
          image_url: string
          is_active: boolean | null
          placement: string
          sort_order: number | null
          title: string
          updated_at: string | null
          updated_by: string | null
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          cta_label?: string | null
          cta_url?: string | null
          id?: string
          image_url: string
          is_active?: boolean | null
          placement: string
          sort_order?: number | null
          title: string
          updated_at?: string | null
          updated_by?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          cta_label?: string | null
          cta_url?: string | null
          id?: string
          image_url?: string
          is_active?: boolean | null
          placement?: string
          sort_order?: number | null
          title?: string
          updated_at?: string | null
          updated_by?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "homepage_banners_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "homepage_banners_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      moderation_logs: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string | null
          id: string
          metadata: Json | null
          reason: string | null
          target_id: string
          target_type: string
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          reason?: string | null
          target_id: string
          target_type: string
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          reason?: string | null
          target_id?: string
          target_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "moderation_logs_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          data: Json | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string | null
          id: string
          order_id: string | null
          product_id: string | null
          product_snapshot: Json | null
          quantity: number
          store_id: string | null
          total_price: number
          unit_price: number
          variant_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_id?: string | null
          product_id?: string | null
          product_snapshot?: Json | null
          quantity: number
          store_id?: string | null
          total_price: number
          unit_price: number
          variant_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          order_id?: string | null
          product_id?: string | null
          product_snapshot?: Json | null
          quantity?: number
          store_id?: string | null
          total_price?: number
          unit_price?: number
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          billing_address: Json
          created_at: string | null
          currency: string | null
          discount_amount: number | null
          id: string
          notes: string | null
          order_number: string
          payment_method: string | null
          payment_reference: string | null
          payment_status: string | null
          shipping_address: Json
          shipping_amount: number | null
          status: string | null
          subtotal: number
          tax_amount: number | null
          total_amount: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          billing_address: Json
          created_at?: string | null
          currency?: string | null
          discount_amount?: number | null
          id?: string
          notes?: string | null
          order_number: string
          payment_method?: string | null
          payment_reference?: string | null
          payment_status?: string | null
          shipping_address: Json
          shipping_amount?: number | null
          status?: string | null
          subtotal: number
          tax_amount?: number | null
          total_amount: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          billing_address?: Json
          created_at?: string | null
          currency?: string | null
          discount_amount?: number | null
          id?: string
          notes?: string | null
          order_number?: string
          payment_method?: string | null
          payment_reference?: string | null
          payment_status?: string | null
          shipping_address?: Json
          shipping_amount?: number | null
          status?: string | null
          subtotal?: number
          tax_amount?: number | null
          total_amount?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      product_attributes: {
        Row: {
          created_at: string | null
          display_order: number | null
          id: string
          name: string
          product_id: string | null
          value: string
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          name: string
          product_id?: string | null
          value: string
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          name?: string
          product_id?: string | null
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_attributes_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_images: {
        Row: {
          alt_text: string | null
          created_at: string | null
          id: string
          image_url: string
          is_primary: boolean | null
          product_id: string | null
          sort_order: number | null
          variant_id: string | null
        }
        Insert: {
          alt_text?: string | null
          created_at?: string | null
          id?: string
          image_url: string
          is_primary?: boolean | null
          product_id?: string | null
          sort_order?: number | null
          variant_id?: string | null
        }
        Update: {
          alt_text?: string | null
          created_at?: string | null
          id?: string
          image_url?: string
          is_primary?: boolean | null
          product_id?: string | null
          sort_order?: number | null
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_images_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variants: {
        Row: {
          compare_price: number | null
          cost_price: number | null
          created_at: string | null
          id: string
          inventory_quantity: number | null
          is_active: boolean | null
          name: string | null
          price: number | null
          product_id: string | null
          sku: string | null
          updated_at: string | null
          variant_options: Json | null
          weight: number | null
        }
        Insert: {
          compare_price?: number | null
          cost_price?: number | null
          created_at?: string | null
          id?: string
          inventory_quantity?: number | null
          is_active?: boolean | null
          name?: string | null
          price?: number | null
          product_id?: string | null
          sku?: string | null
          updated_at?: string | null
          variant_options?: Json | null
          weight?: number | null
        }
        Update: {
          compare_price?: number | null
          cost_price?: number | null
          created_at?: string | null
          id?: string
          inventory_quantity?: number | null
          is_active?: boolean | null
          name?: string | null
          price?: number | null
          product_id?: string | null
          sku?: string | null
          updated_at?: string | null
          variant_options?: Json | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          base_price: number
          brand_id: string | null
          care_instructions: string | null
          category_id: string
          compare_price: number | null
          cost_price: number | null
          created_at: string | null
          description: string | null
          dimensions: Json | null
          gender: Database["public"]["Enums"]["product_gender"] | null
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          is_removed: boolean | null
          material: string | null
          moderated_at: string | null
          moderated_by: string | null
          moderation_reason: string | null
          moderation_status: string | null
          name: string
          rating: number | null
          review_count: number | null
          short_description: string | null
          sizes: string[]
          sku: string | null
          slug: string
          status: string | null
          store_id: string | null
          total_sales: number | null
          updated_at: string | null
          view_count: number | null
          weight: number | null
        }
        Insert: {
          base_price: number
          brand_id?: string | null
          care_instructions?: string | null
          category_id: string
          compare_price?: number | null
          cost_price?: number | null
          created_at?: string | null
          description?: string | null
          dimensions?: Json | null
          gender?: Database["public"]["Enums"]["product_gender"] | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          is_removed?: boolean | null
          material?: string | null
          moderated_at?: string | null
          moderated_by?: string | null
          moderation_reason?: string | null
          moderation_status?: string | null
          name: string
          rating?: number | null
          review_count?: number | null
          short_description?: string | null
          sizes?: string[]
          sku?: string | null
          slug: string
          status?: string | null
          store_id?: string | null
          total_sales?: number | null
          updated_at?: string | null
          view_count?: number | null
          weight?: number | null
        }
        Update: {
          base_price?: number
          brand_id?: string | null
          care_instructions?: string | null
          category_id: string
          compare_price?: number | null
          cost_price?: number | null
          created_at?: string | null
          description?: string | null
          dimensions?: Json | null
          gender?: Database["public"]["Enums"]["product_gender"] | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          is_removed?: boolean | null
          material?: string | null
          moderated_at?: string | null
          moderated_by?: string | null
          moderation_reason?: string | null
          moderation_status?: string | null
          name?: string
          rating?: number | null
          review_count?: number | null
          short_description?: string | null
          sizes?: string[]
          sku?: string | null
          slug?: string
          status?: string | null
          store_id?: string | null
          total_sales?: number | null
          updated_at?: string | null
          view_count?: number | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_moderated_by_fkey"
            columns: ["moderated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      promo_banners: {
        Row: {
          audience: Json | null
          created_at: string | null
          created_by: string | null
          cta_label: string | null
          cta_url: string | null
          description: string | null
          discount_text: string | null
          id: string
          image_url: string
          is_active: boolean | null
          is_modal: boolean | null
          modal_priority: number | null
          show_once_per_session: boolean | null
          title: string
          updated_at: string | null
          updated_by: string | null
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          audience?: Json | null
          created_at?: string | null
          created_by?: string | null
          cta_label?: string | null
          cta_url?: string | null
          description?: string | null
          discount_text?: string | null
          id?: string
          image_url: string
          is_active?: boolean | null
          is_modal?: boolean | null
          modal_priority?: number | null
          show_once_per_session?: boolean | null
          title: string
          updated_at?: string | null
          updated_by?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          audience?: Json | null
          created_at?: string | null
          created_by?: string | null
          cta_label?: string | null
          cta_url?: string | null
          description?: string | null
          discount_text?: string | null
          id?: string
          image_url?: string
          is_active?: boolean | null
          is_modal?: boolean | null
          modal_priority?: number | null
          show_once_per_session?: boolean | null
          title?: string
          updated_at?: string | null
          updated_by?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "promo_banners_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "promo_banners_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      promotion_events: {
        Row: {
          created_at: string | null
          event: string
          id: string
          promo_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event: string
          id?: string
          promo_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event?: string
          id?: string
          promo_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "promotion_events_promo_id_fkey"
            columns: ["promo_id"]
            isOneToOne: false
            referencedRelation: "promo_banners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "promotion_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          comment: string | null
          created_at: string | null
          id: string
          is_approved: boolean | null
          is_verified_purchase: boolean | null
          order_item_id: string | null
          product_id: string | null
          rating: number
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          comment?: string | null
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          is_verified_purchase?: boolean | null
          order_item_id?: string | null
          product_id?: string | null
          rating: number
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          comment?: string | null
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          is_verified_purchase?: boolean | null
          order_item_id?: string | null
          product_id?: string | null
          rating?: number
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_order_item_id_fkey"
            columns: ["order_item_id"]
            isOneToOne: false
            referencedRelation: "order_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      shopping_carts: {
        Row: {
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shopping_carts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      stores: {
        Row: {
          banner_url: string | null
          created_at: string | null
          description: string | null
          email: string | null
          id: string
          is_active: boolean | null
          is_verified: boolean | null
          logo_url: string | null
          name: string
          owner_id: string | null
          phone: string | null
          rating: number | null
          slug: string
          total_sales: number | null
          updated_at: string | null
          verification_date: string | null
          website_url: string | null
        }
        Insert: {
          banner_url?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          logo_url?: string | null
          name: string
          owner_id?: string | null
          phone?: string | null
          rating?: number | null
          slug: string
          total_sales?: number | null
          updated_at?: string | null
          verification_date?: string | null
          website_url?: string | null
        }
        Update: {
          banner_url?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          logo_url?: string | null
          name?: string
          owner_id?: string | null
          phone?: string | null
          rating?: number | null
          slug?: string
          total_sales?: string | null
          updated_at?: string | null
          verification_date?: string | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stores_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_addresses: {
        Row: {
          city: string
          country: string
          created_at: string | null
          id: string
          is_default: boolean | null
          postal_code: string | null
          state_province: string | null
          street_address: string
          type: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          city: string
          country: string
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          postal_code?: string | null
          state_province?: string | null
          street_address: string
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          city?: string
          country?: string
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          postal_code?: string | null
          state_province?: string | null
          street_address?: string
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_addresses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          permissions: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          permissions?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          permissions?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          ban_reason: string | null
          banned_at: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string
          first_name: string | null
          gender: string | null
          id: string
          is_active: boolean | null
          is_seller: boolean
          is_verified: boolean | null
          last_login: string | null
          last_name: string | null
          moderation_notes: string | null
          phone: string | null
          profile_image_url: string | null
          role_id: string | null
          suspended_until: string | null
          suspension_reason: string | null
          updated_at: string | null
          verification_date: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          ban_reason?: string | null
          banned_at?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email: string
          first_name?: string | null
          gender?: string | null
          id: string
          is_active?: boolean | null
          is_seller?: boolean
          is_verified?: boolean | null
          last_login?: string | null
          last_name?: string | null
          moderation_notes?: string | null
          phone?: string | null
          profile_image_url?: string | null
          role_id?: string | null
          suspended_until?: string | null
          suspension_reason?: string | null
          updated_at?: string | null
          verification_date?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          ban_reason?: string | null
          banned_at?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string
          first_name?: string | null
          gender?: string | null
          id?: string
          is_active?: boolean | null
          is_seller?: boolean
          is_verified?: boolean | null
          last_login?: string | null
          last_name?: string | null
          moderation_notes?: string | null
          phone?: string | null
          profile_image_url?: string | null
          role_id?: string | null
          suspended_until?: string | null
          suspension_reason?: string | null
          updated_at?: string | null
          verification_date?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      wishlists: {
        Row: {
          created_at: string | null
          id: string
          product_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          product_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wishlists_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wishlists_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      current_role_name: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_order_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      has_permission: {
        Args: { key: string }
        Returns: boolean
      }
      is_super_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      product_gender: "Hombre" | "Mujer" | "Niños/as" | "Remates"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      product_gender: ["Hombre", "Mujer", "Niños/as", "Remates"],
    },
  },
} as const
