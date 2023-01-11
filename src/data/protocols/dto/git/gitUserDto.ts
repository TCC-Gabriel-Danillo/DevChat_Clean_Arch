import { User } from "_/domain/models";

export interface GitUser {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name: string;
    company?: any;
    blog: string;
    location: string;
    email?: any;
    hireable?: any;
    bio: string;
    twitter_username?: any;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: Date;
    updated_at: Date;
}

export const mapGitUserToUser = (gitUser: GitUser, techs: Array<string>): User => {
    return {
        email: gitUser.email, 
        id: String(gitUser.id), 
        photoUrl: gitUser.avatar_url, 
        techs: techs, 
        username: gitUser.login, 
    }
}