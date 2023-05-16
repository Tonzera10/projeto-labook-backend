export interface PostDB {
    id: string,
    creator_id: string,
    content: string,
}

export class Post {
    constructor(
        private id: string,
        private creator_id: string,
        private content: string
    ) {}

    public getId(): string{
        return this.id;
    }

    public setId(value: string): void {
        this.id = value;
    }

    public getCreatorId(): string{
        return this.creator_id;
    }

    public setCreatorId(value: string): void{
        this.creator_id = value;
    }

    public getContent(): string{
        return this.content;
    }

    public setContent(value: string): void{
        this.content = value;
    }
}