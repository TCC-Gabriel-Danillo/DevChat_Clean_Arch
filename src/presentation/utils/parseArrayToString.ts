interface Args {
    separator?: string
    limit?: number
}
export const parseArrayToString = (arr?: any[], args?: Args) => arr?.slice(0, args?.limit).join(args?.separator) 