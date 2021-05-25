export type LoginCredentials = {
    username: string,
    password: string
}

export type AuthenticatedUser = {
    username: string | undefined,
    token: string | undefined,
    authenticated: boolean,
}