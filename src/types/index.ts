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

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  MEMBER = 'MEMBER',
  EMPLOYER = 'EMPLOYER'
}

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

export enum EmploymentStatus {
  EMPLOYED = 'EMPLOYED',
  SELF_EMPLOYED = 'SELF_EMPLOYED',
  UNEMPLOYED = 'UNEMPLOYED',
  RETIRED = 'RETIRED'
}

export enum AccountType {
  INDIVIDUAL = 'INDIVIDUAL',
  CORPORATE = 'CORPORATE',
  GOVERNMENT = 'GOVERNMENT'
}

export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  CLOSED = 'CLOSED'
}

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

export enum ContributionType {
  REGULAR = 'REGULAR',
  VOLUNTARY = 'VOLUNTARY',
  EMPLOYER = 'EMPLOYER',
  GOVERNMENT_MATCHING = 'GOVERNMENT_MATCHING'
}

export enum ContributionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REVERSED = 'REVERSED'
}

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

export enum ClaimType {
  RETIREMENT = 'RETIREMENT',
  WITHDRAWAL = 'WITHDRAWAL',
  TEMPORARY = 'TEMPORARY',
  DISABILITY = 'DISABILITY',
  DEATH = 'DEATH'
}

export enum ClaimStatus {
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED'
}

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

export enum PaymentGateway {
  PAYSTACK = 'PAYSTACK',
  FLUTTERWAVE = 'FLUTTERWAVE'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED'
}

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

export enum ReportType {
  MEMBER_SUMMARY = 'MEMBER_SUMMARY',
  CONTRIBUTION_ANALYSIS = 'CONTRIBUTION_ANALYSIS',
  BENEFIT_CLAIMS = 'BENEFIT_CLAIMS',
  FINANCIAL_OVERVIEW = 'FINANCIAL_OVERVIEW',
  AUDIT_TRAIL = 'AUDIT_TRAIL'
}

export enum FileFormat {
  PDF = 'PDF',
  EXCEL = 'EXCEL',
  CSV = 'CSV'
}

export enum ReportStatus {
  GENERATING = 'GENERATING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

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
