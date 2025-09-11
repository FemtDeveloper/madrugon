interface PromoBanner {
    id:          string;
    title?:      string | null;
    description?:string | null;
    image_url:   string;
    cta_label?:  string | null;
    cta_url?:    string | null;
    position:    number;
    is_active:   boolean;
    user_id?:    string | null;
    created_at:  Date;
    updated_at:  Date;
}

interface PromoModal {
    id:                    string;
    image_url:             string;
    cta_url?:              string | null;
    position:              number;
    is_active:             boolean;
    show_once_per_session: boolean;
    user_id?:              string | null;
    created_at:            Date;
    updated_at:            Date;
}

