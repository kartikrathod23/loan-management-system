import { Request, Response } from "express";
import { asyncHandler } from "../../shared/handlers/asyncHandler";
import { sendResponse } from "../../shared/responses/sendResponse";
import { getAdminDashboardStats, getBorrowerDashboard } from "./dashboard.service";

export const getAdminDashboard = asyncHandler(async (_req: Request, res: Response) => {
    const stats = await getAdminDashboardStats();
    sendResponse(res, 200, {
        success: true,
        message: "Dashboard stats fetched successfully",
        data: stats,
    });
});


export const getBorrowerDashboardData = asyncHandler(async (req: Request, res: Response) => {
    const dashboard =await getBorrowerDashboard(req.user!.userId);

    sendResponse(res, 200, {
        success: true,
        message: "Borrower dashboard fetched successfully",
        data: dashboard,
    });
});