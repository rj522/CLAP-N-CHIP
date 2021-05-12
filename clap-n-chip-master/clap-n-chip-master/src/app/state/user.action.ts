export class AddEmail {
    static readonly type = '[Product List] Add to cart';
    constructor(public email: string ) {}
}
  
export class AddId {
    static readonly type = '[Cart] Empty cart';
    constructor(public id: string) {}
}

export class AddArtistId {
    static readonly type = '[Cart] Artist Id';
    constructor(public id: string) {}
}