import { User } from "../users/user.model";
import { UserRole } from "../users/user.types";
import { Loan } from "../loans/loan.model";
import { LoanStatus } from "../loans/loan.types";
import { Document } from "../documents/document.model";
import { Borrower } from "../borrower/borrower.model";

export const getAdminDashboardStats = async () => {
    const [totalUsers, totalBorrowers, totalLoans, pendingLoans, sanctionedLoans, activeLoans, rejectedLoans,] = await Promise.all([
        User.countDocuments(),
        User.countDocuments({
            role: UserRole.BORROWER,
        }),

        Loan.countDocuments(),
        Loan.countDocuments({
            status: LoanStatus.PENDING,
        }),

        Loan.countDocuments({
            status: LoanStatus.SANCTIONED,
        }),

        Loan.countDocuments({
            status: LoanStatus.ACTIVE,
        }),

        Loan.countDocuments({
            status: LoanStatus.REJECTED,
        }),
    ]);

    const disbursedAmountResult = await Loan.aggregate([
        {
            $match: {
                status: LoanStatus.ACTIVE,
            },
        },

        {
            $group: {
                _id: null,

                totalDisbursed: {
                    $sum: "$principalAmount",
                },
            },
        },
    ]);

    const totalDisbursedAmount = disbursedAmountResult[0]?.totalDisbursed || 0;

    return {
        totalUsers,
        totalBorrowers,
        totalLoans,
        pendingLoans,
        sanctionedLoans,
        activeLoans,
        rejectedLoans,
        totalDisbursedAmount,
    };
};

export const getBorrowerDashboard = async (userId: string) => {

    const borrower = await Borrower.findOne({
        userId,
    });

    const loans = await Loan.find({
        borrowerId: userId,
    }).sort({
        createdAt: -1,
    });

    const documents = await Document.find({
        borrowerId: userId,
    }).sort({
        createdAt: -1,
    });

    const totalLoans = loans.length;
    const activeLoans = loans.filter(
        (loan) => loan.status === LoanStatus.ACTIVE
    ).length;

    const rejectedLoans = loans.filter(
        (loan) => loan.status === LoanStatus.REJECTED
    ).length;

    const totalBorrowedAmount = loans.reduce(
        (sum, loan) => sum + loan.principalAmount,
        0
    );

    return {
        borrower,
        summary: {
            totalLoans,
            activeLoans,
            rejectedLoans,
            totalBorrowedAmount,
        },
        loans,
        documents,
    };
};