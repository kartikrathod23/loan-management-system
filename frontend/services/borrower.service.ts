import { api } from "./api";

export const getBorrowerProfile = async () => {
    const response = await api.get("/borrower/me");
    return response.data;
};

export const createBorrowerProfile = async (payload: any) => {
    const response = await api.post("/borrower/profile", payload);
    return response.data;
};

export const getBorrowerDashboard = async () => {
    const response = await api.get(
        "/dashboard/borrower"
    );
    return response.data;
};