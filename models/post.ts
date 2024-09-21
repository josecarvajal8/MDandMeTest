export interface Comment {
    id: number;
    parent_id: number;
    display_name: string;
    text: string;
    created_at: string;
}
export interface Post {
    post_url: string;
    title: string;
    created_at: string;
    num_hugs: number;
    patient_description: string;
    assessment: string;
    question: string;
    comments: Record<string, Comment>;
}