import { apiLinks } from "@app/utils"
import Axios from "axios"

export const getRequestForUser  = async () => {
    return await  Axios.get(`${apiLinks.getReservationDetail.user}`)
        .then((res) => {
            return res.data
        })
}