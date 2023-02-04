import { OP, ORDER, QueryOptions } from "_/data/protocols/repositories/options";

export const parseArgsToMongo = (queryOptions?: QueryOptions) => {

    let filter = {}
    let order = {}

    if(!queryOptions) return { filter, order }

    const { filterArgs, orderArgs } = queryOptions

    if(filterArgs?.op === OP.CONTAINS || filterArgs?.op === OP.EQ){
        filter = {...filter, [filterArgs.field]: filterArgs.value}
    }
    if(filterArgs?.op === OP.IN){
        filter = {...filter, [filterArgs.field]: { $in: filterArgs.value }}
    }

    if(!orderArgs) return { filter, order }

    const orderMap = {
        [ORDER.ASC]: 1, 
        [ORDER.DESC]: -1
    }

    order = {[orderArgs.field]: orderMap[orderArgs.order ?? ORDER.ASC]}

    return { filter, order }
}