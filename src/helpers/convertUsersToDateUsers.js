import { parseISO } from "date-fns"

export const convertUsersToDateUsers = ( users = [] ) => {

    return users.map( user => {
        
        user.fec_Dil = parseISO( user.fec_Dil );

        return user
    })
}