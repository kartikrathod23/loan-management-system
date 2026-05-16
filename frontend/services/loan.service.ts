import { api } from "./api";

export const applyLoan = async (payload: {
    principalAmount: number;
    tenureDays: number;
    interestRate: number;
}) => {
    const response = await api.post("/loans/apply", payload);
    return response.data;
};

export const getMyLoans = async () => {
    const response = await api.get("/loans/my-loans");
    return response.data;
};