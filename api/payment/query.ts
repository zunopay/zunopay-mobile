import { GetReceiverParams } from "@/model/payment/params";
import apiClient from "../client"
import { PAYMENT_QUERY_KEYS } from "./keys"
import { Receiver } from "@/model/payment";

const { PAYMENT, RECEIVER, GET } = PAYMENT_QUERY_KEYS;
export const fetchReceiver = async (params: GetReceiverParams) => {
    const response = await apiClient.get<Receiver>(`/${PAYMENT}/${GET}/${RECEIVER}`, { params });
    return response.data;
}