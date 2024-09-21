export interface Comment {
    id: number;
    parent_id: number;
    display_name: string;
    text: string;
    created_at: string;
}
export interface Post {
    id: string;
    post_url: string;
    title: string;
    created_at: string;
    num_hugs: number;
    patient_description: string;
    assessment: string;
    question: string;
    comments: Record<string, Comment>;
}

export interface PostResponse {
    data: Post[];
    first: number;
    prev: number | null;
    next: number | null;
    last: number;
    pages: number;
    items: number;
}