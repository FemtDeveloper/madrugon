interface PromoBanner {
    id:                    string;
    title:                 string;
    description:           string;
    image_url:             string;
    cta_label:             string;
    cta_url:               string;
    discount_text:         string;
    valid_from:            null;
    valid_until:           null;
    is_active:             boolean;
    is_modal:              boolean;
    modal_priority:        number;
    audience:              null;
    show_once_per_session: boolean;
    created_by:            null;
    updated_by:            null;
    created_at:            Date;
    updated_at:            Date;
}

