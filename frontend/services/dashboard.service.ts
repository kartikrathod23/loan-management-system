import { api } from "./api";

export const getDashboardStats = async () => {
    const response = await api.get("/dashboard/stats");
    return response.data;
};

export const getSanctionedLoans = async () => {
    const response = await api.get(
        "/disbursement/sanctioned-loans"
    );
    return response.data;
};

export const disburseLoan = async (
    loanId: string,
    payload: {
        transactionReference: string;
    }
) => {
    const response = await api.patch(
        `/disbursement/${loanId}/disburse`,
        payload
    );

    return response.data;
};

export const getPendingLoans = async () => {
    const response = await api.get(
        "/sanction/pending-loans"
    );

    return response.data;
};

export const sanctionLoan = async (
    loanId: string,
    payload: {
        decision: string;
        remarks: string;
    }
) => {

    const response = await api.patch(
        `/sanction/${loanId}/decision`,
        payload
    );

    return response.data;
};

export const getDisbursedLoans = async () => {

    const response = await api.get(
        "/repayment/active-loans"
    );

    return response.data;
};

export const collectRepayment = async (
    loanId: string,
    payload: {
        amount: number;
        transactionReference: string;
    }
) => {

    const response = await api.patch(
        `/repayment/${loanId}/collect`,
        payload
    );

    return response.data;
};



