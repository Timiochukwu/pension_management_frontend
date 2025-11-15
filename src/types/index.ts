/**
 * TYPE DEFINITIONS
 *
 * These types match the backend DTOs from Spring Boot
 * Ensures type safety between frontend and backend
 */

// ============================================
// USER & AUTHENTICATION TYPES
// ============================================

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: string;
}

export const UserRole = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  MEMBER: 'MEMBER',
  EMPLOYER: 'EMPLOYER'
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  tokenType: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

// ============================================
// MEMBER TYPES
// ============================================

export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  employmentStatus: EmploymentStatus;
  accountType: AccountType;
  accountStatus: AccountStatus;
  enrollmentDate: string;
  totalContributions: number;
  availableBalance: number;
  createdAt: string;
  updatedAt: string;
}

export const EmploymentStatus = {
  EMPLOYED: 'EMPLOYED',
  SELF_EMPLOYED: 'SELF_EMPLOYED',
  UNEMPLOYED: 'UNEMPLOYED',
  RETIRED: 'RETIRED'
} as const;

export type EmploymentStatus = typeof EmploymentStatus[keyof typeof EmploymentStatus];

export const AccountType = {
  INDIVIDUAL: 'INDIVIDUAL',
  CORPORATE: 'CORPORATE',
  GOVERNMENT: 'GOVERNMENT'
} as const;

export type AccountType = typeof AccountType[keyof typeof AccountType];

export const AccountStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SUSPENDED: 'SUSPENDED',
  CLOSED: 'CLOSED'
} as const;

export type AccountStatus = typeof AccountStatus[keyof typeof AccountStatus];

export interface MemberRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  employmentStatus: EmploymentStatus;
  accountType: AccountType;
}

// ============================================
// CONTRIBUTION TYPES
// ============================================

export interface Contribution {
  id: number;
  memberId: number;
  memberName: string;
  amount: number;
  contributionType: ContributionType;
  paymentMethod: string;
  transactionReference: string;
  contributionDate: string;
  status: ContributionStatus;
  description: string;
  createdAt: string;
}

export const ContributionType = {
  REGULAR: 'REGULAR',
  VOLUNTARY: 'VOLUNTARY',
  EMPLOYER: 'EMPLOYER',
  GOVERNMENT_MATCHING: 'GOVERNMENT_MATCHING'
} as const;

export type ContributionType = typeof ContributionType[keyof typeof ContributionType];

export const ContributionStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  REVERSED: 'REVERSED'
} as const;

export type ContributionStatus = typeof ContributionStatus[keyof typeof ContributionStatus];

export interface ContributionRequest {
  memberId: number;
  amount: number;
  contributionType: ContributionType;
  paymentMethod: string;
  description?: string;
}

// ============================================
// BENEFIT CLAIM TYPES
// ============================================

export interface BenefitClaim {
  id: number;
  memberId: number;
  memberName: string;
  claimType: ClaimType;
  requestedAmount: number;
  approvedAmount: number;
  status: ClaimStatus;
  reason: string;
  supportingDocuments: string;
  submissionDate: string;
  reviewDate?: string;
  reviewedBy?: string;
  reviewComments?: string;
  paymentDate?: string;
  paymentReference?: string;
  createdAt: string;
  updatedAt: string;
}

export const ClaimType = {
  RETIREMENT: 'RETIREMENT',
  WITHDRAWAL: 'WITHDRAWAL',
  TEMPORARY: 'TEMPORARY',
  DISABILITY: 'DISABILITY',
  DEATH: 'DEATH'
} as const;

export type ClaimType = typeof ClaimType[keyof typeof ClaimType];

export const ClaimStatus = {
  PENDING: 'PENDING',
  UNDER_REVIEW: 'UNDER_REVIEW',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  PAID: 'PAID',
  CANCELLED: 'CANCELLED'
} as const;

export type ClaimStatus = typeof ClaimStatus[keyof typeof ClaimStatus];

export interface BenefitClaimRequest {
  memberId: number;
  claimType: ClaimType;
  requestedAmount: number;
  reason: string;
  supportingDocuments?: string;
}

export interface ClaimApprovalRequest {
  approvedAmount: number;
  reviewComments: string;
}

// ============================================
// PAYMENT TYPES
// ============================================

export interface Payment {
  id: number;
  memberId: number;
  amount: number;
  paymentMethod: string;
  paymentGateway: PaymentGateway;
  transactionReference: string;
  status: PaymentStatus;
  metadata: string;
  createdAt: string;
  updatedAt: string;
}

export const PaymentGateway = {
  PAYSTACK: 'PAYSTACK',
  FLUTTERWAVE: 'FLUTTERWAVE'
} as const;

export type PaymentGateway = typeof PaymentGateway[keyof typeof PaymentGateway];

export const PaymentStatus = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED'
} as const;

export type PaymentStatus = typeof PaymentStatus[keyof typeof PaymentStatus];

export interface PaymentRequest {
  memberId: number;
  amount: number;
  paymentMethod: string;
  paymentGateway: PaymentGateway;
}

// ============================================
// REPORT TYPES
// ============================================

export interface Report {
  id: number;
  reportType: ReportType;
  title: string;
  description: string;
  filePath: string;
  fileFormat: FileFormat;
  generatedBy: string;
  generatedAt: string;
  parameters: string;
  status: ReportStatus;
}

export const ReportType = {
  MEMBER_SUMMARY: 'MEMBER_SUMMARY',
  CONTRIBUTION_ANALYSIS: 'CONTRIBUTION_ANALYSIS',
  BENEFIT_CLAIMS: 'BENEFIT_CLAIMS',
  FINANCIAL_OVERVIEW: 'FINANCIAL_OVERVIEW',
  AUDIT_TRAIL: 'AUDIT_TRAIL'
} as const;

export type ReportType = typeof ReportType[keyof typeof ReportType];

export const FileFormat = {
  PDF: 'PDF',
  EXCEL: 'EXCEL',
  CSV: 'CSV'
} as const;

export type FileFormat = typeof FileFormat[keyof typeof FileFormat];

export const ReportStatus = {
  GENERATING: 'GENERATING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
} as const;

export type ReportStatus = typeof ReportStatus[keyof typeof ReportStatus];

export interface ReportRequest {
  reportType: ReportType;
  fileFormat: FileFormat;
  startDate?: string;
  endDate?: string;
  filters?: Record<string, any>;
}

// ============================================
// ANALYTICS TYPES
// ============================================

export interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  totalContributions: number;
  monthlyContributions: number;
  pendingClaims: number;
  approvedClaims: number;
  totalBalance: number;
  monthlyGrowth: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }[];
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface ErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  errors?: Record<string, string>;
}

// ============================================
// SEARCH & FILTER TYPES
// ============================================

export interface SearchParams {
  query?: string;
  page?: number;
  size?: number;
  sort?: string;
  filters?: Record<string, any>;
}
