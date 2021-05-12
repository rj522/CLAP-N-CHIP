import { Portfolio } from './portfolio';

export class Artist {
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
    portfolio? : Portfolio;
    post_ids? : string[];
}



