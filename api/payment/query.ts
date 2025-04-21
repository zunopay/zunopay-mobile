import { GetReceiverParams, TransferDigitalParams } from "@/model/payment/params";
import apiClient from "../client"
import { PAYMENT_QUERY_KEYS } from "./keys"
import { Receiver } from "@/model/payment";

const { PAYMENT, RECEIVER, GET, TRANSFER } = PAYMENT_QUERY_KEYS;
export const fetchReceiver = async (params: GetReceiverParams) => {
    const response = await apiClient.get<Receiver>(`/${PAYMENT}/${GET}/${RECEIVER}`, { params });
    return response.data;
}

export const fetchDigitalTransferTransaction = async (params: TransferDigitalParams) : Promise<string> => {
	const response = await apiClient.get<string>(`${PAYMENT}/${GET}/${TRANSFER}`, { params })
	return response.data
}