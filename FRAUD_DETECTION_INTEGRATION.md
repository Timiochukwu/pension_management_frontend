# Fraud Detection Integration

## Overview

This document describes the ML-powered fraud detection integration added to the Pension Management Frontend application. The integration provides real-time fraud detection for transactions and comprehensive risk assessment for members.

## Features Added

### 1. Fraud Detection API Integration

**Location**: `src/services/fraudDetectionService.ts`

The service integrates with the backend ML endpoints:

- **POST /api/v1/ml/fraud-detection** - Detect fraud in transactions
- **GET /api/v1/ml/risk-assessment/{memberId}** - Assess member risk profile

Key functions:
- `detectFraud()` - Check a transaction for fraud indicators
- `assessMemberRisk()` - Get risk assessment for a specific member
- `checkTransaction()` - Helper function with automatic client info collection
- `getDeviceFingerprint()` - Browser fingerprinting utility
- `getClientInfo()` - Collect user agent and device information

### 2. TypeScript Types

**Location**: `src/types/index.ts`

Added comprehensive type definitions:

```typescript
interface FraudDetectionRequest {
  memberId: number;
  amount: number;
  paymentMethod: string;
  ipAddress?: string;
  userAgent?: string;
  timestamp?: string;
  deviceFingerprint?: string;
  velocityScore?: number;
  averageTransactionAmount?: number;
  transactionCount24h?: number;
  isNewDevice?: boolean;
  isNewLocation?: boolean;
  amountDeviationFromAverage?: number;
}

interface FraudDetectionResponse {
  fraudulent: boolean;
  riskScore: number;
  riskLevel: RiskLevel; // LOW | MEDIUM | HIGH | CRITICAL
  fraudIndicators: string[];
  recommendation: string;
  timestamp: string;
  confidenceScore: number;
  modelVersion?: string;
}

interface RiskAssessmentResponse {
  memberId: number;
  overallRiskScore: number;
  riskLevel: RiskLevel;
  riskFactors: RiskFactor[];
  recommendations: string[];
  assessmentDate: string;
  lastUpdated: string;
}

interface RiskFactor {
  factor: string;
  score: number;
  severity: RiskLevel;
  description: string;
}
```

### 3. Fraud Detection Page

**Location**: `src/pages/fraud/FraudDetectionPage.tsx`

**Route**: `/fraud-detection`

**Features**:
- Transaction fraud check form with member selection
- Amount and payment method inputs
- Real-time fraud detection with visual feedback
- Risk score and confidence score display
- Fraud indicators listing
- Color-coded risk levels with badges
- Responsive design with dark mode support

**UI Components**:
- Form with member dropdown (populated from members API)
- Amount input with currency formatting
- Payment method selector
- Analysis results card with:
  - Fraud status icon (CheckCircle or XCircle)
  - Risk score percentage
  - Risk level badge
  - Confidence score progress bar
  - List of fraud indicators
  - Model version info

### 4. Risk Assessment Page

**Location**: `src/pages/fraud/RiskAssessmentPage.tsx`

**Route**: `/risk-assessment`

**Features**:
- Member selection for risk profiling
- Overall risk summary with visual indicators
- Detailed risk factors breakdown
- Risk-based recommendations
- Real-time data refresh capability
- Color-coded risk levels throughout

**UI Components**:
- Member selection dropdown with search
- Risk summary cards showing:
  - Overall risk level and score
  - Member ID
  - Last assessment timestamp
- Risk factors table with:
  - Factor name and description
  - Individual risk scores
  - Severity badges
  - Progress bars for visual representation
- Recommendations panel
- Assessment disclaimer

### 5. Navigation Integration

**Updated**: `src/components/layout/DashboardLayout.tsx`

Added two new menu items:
- **Fraud Detection** - Shield icon
- **Risk Assessment** - TrendingUp icon

Positioned between "Payments" and "Reports" in the sidebar navigation.

### 6. Routing Configuration

**Updated**: `src/App.tsx`

Added protected routes:
```typescript
<Route path="/fraud-detection" element={
  <ProtectedRoute>
    <DashboardLayout>
      <FraudDetectionPage />
    </DashboardLayout>
  </ProtectedRoute>
} />

<Route path="/risk-assessment" element={
  <ProtectedRoute>
    <DashboardLayout>
      <RiskAssessmentPage />
    </DashboardLayout>
  </ProtectedRoute>
} />
```

## API Integration Details

### Backend API Endpoints

Based on the OpenAPI specification:

#### 1. Fraud Detection
```
POST /api/v1/ml/fraud-detection
Content-Type: application/json

Request Body:
{
  "memberId": 123,
  "amount": 50000.00,
  "paymentMethod": "BANK_TRANSFER",
  "ipAddress": "192.168.1.1",
  "userAgent": "Mozilla/5.0...",
  "timestamp": "2025-11-23T19:00:00Z",
  "deviceFingerprint": "abc123...",
  "velocityScore": 0.75,
  "averageTransactionAmount": 30000.00,
  "transactionCount24h": 3,
  "isNewDevice": false,
  "isNewLocation": false,
  "amountDeviationFromAverage": 0.67
}

Response:
{
  "success": true,
  "data": {
    "fraudulent": false,
    "riskScore": 0.23,
    "riskLevel": "LOW",
    "fraudIndicators": [],
    "recommendation": "Transaction appears legitimate - proceed with normal processing",
    "timestamp": "2025-11-23T19:00:01Z",
    "confidenceScore": 0.92,
    "modelVersion": "v2.1.0"
  }
}
```

#### 2. Risk Assessment
```
GET /api/v1/ml/risk-assessment/{memberId}

Response:
{
  "success": true,
  "data": {
    "memberId": 123,
    "overallRiskScore": 0.35,
    "riskLevel": "MEDIUM",
    "riskFactors": [
      {
        "factor": "Transaction Velocity",
        "score": 0.45,
        "severity": "MEDIUM",
        "description": "Higher than average transaction frequency detected"
      },
      {
        "factor": "Account Age",
        "score": 0.15,
        "severity": "LOW",
        "description": "Relatively new account (< 6 months)"
      }
    ],
    "recommendations": [
      "Monitor large transactions for the next 30 days",
      "Require additional verification for withdrawals over ₦100,000"
    ],
    "assessmentDate": "2025-11-23T19:00:00Z",
    "lastUpdated": "2025-11-23T19:00:00Z"
  }
}
```

### Error Handling

The integration includes comprehensive error handling:

1. **Network Errors**: Caught by axios interceptors in `api.ts`
2. **Validation Errors**: Form validation prevents invalid submissions
3. **API Errors**: Displayed via toast notifications
4. **Loading States**: Visual feedback during API calls
5. **Empty States**: Helpful messages when no data available

## Usage Examples

### Check a Transaction for Fraud

```typescript
import { checkTransaction } from './services/fraudDetectionService';

// Basic usage
const result = await checkTransaction(
  memberId: 123,
  amount: 50000,
  paymentMethod: 'BANK_TRANSFER'
);

if (result.fraudulent) {
  console.log(`Fraud detected! Risk: ${result.riskLevel}`);
  console.log('Indicators:', result.fraudIndicators);
}
```

### Assess Member Risk

```typescript
import { assessMemberRisk } from './services/fraudDetectionService';

const assessment = await assessMemberRisk(123);
console.log(`Member ${assessment.memberId} has ${assessment.riskLevel} risk`);
console.log('Risk factors:', assessment.riskFactors);
```

### Using with React Query

```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { detectFraud, assessMemberRisk } from './services/fraudDetectionService';

// Mutation for fraud detection
const { mutate, isPending } = useMutation({
  mutationFn: (data) => detectFraud(data),
  onSuccess: (result) => {
    if (result.fraudulent) {
      toast.error('Fraud detected!');
    }
  }
});

// Query for risk assessment
const { data, isLoading } = useQuery({
  queryKey: ['risk-assessment', memberId],
  queryFn: () => assessMemberRisk(memberId),
  enabled: !!memberId
});
```

## Security Considerations

1. **Device Fingerprinting**: Basic canvas fingerprinting implemented
2. **Client Info Collection**: Automatic collection of user agent and timestamp
3. **Protected Routes**: All fraud detection pages require authentication
4. **API Authorization**: JWT tokens automatically added to requests
5. **HTTPS Only**: API base URL should use HTTPS in production

## Configuration

### Environment Variables

Make sure these are set in your `.env` file:

```env
VITE_API_URL=http://localhost:1110/api
```

For production:
```env
VITE_API_URL=https://your-production-api.com/api
```

## Testing

### Manual Testing Steps

1. **Fraud Detection Page**:
   - Navigate to `/fraud-detection`
   - Select a member from the dropdown
   - Enter a transaction amount
   - Choose a payment method
   - Click "Check for Fraud"
   - Verify the results display correctly

2. **Risk Assessment Page**:
   - Navigate to `/risk-assessment`
   - Select a member from the dropdown
   - Verify risk assessment loads
   - Check risk factors display correctly
   - Verify recommendations show up

3. **Navigation**:
   - Verify "Fraud Detection" menu item appears
   - Verify "Risk Assessment" menu item appears
   - Check active state highlighting works
   - Test mobile responsive menu

### Backend Requirements

For full testing, ensure the backend has:
- ML models trained and deployed
- `/api/v1/ml/fraud-detection` endpoint active
- `/api/v1/ml/risk-assessment/{memberId}` endpoint active
- Valid member data in the database

## UI/UX Features

1. **Visual Feedback**:
   - Loading spinners during API calls
   - Toast notifications for success/error
   - Color-coded risk levels (green, yellow, orange, red)
   - Icon indicators (CheckCircle, XCircle, Shield, AlertTriangle)

2. **Dark Mode Support**:
   - All components support dark mode
   - Proper color contrast maintained
   - Theme-aware background and text colors

3. **Responsive Design**:
   - Mobile-first approach
   - Grid layouts adapt to screen size
   - Sidebar collapses on mobile

4. **Accessibility**:
   - Proper ARIA labels
   - Keyboard navigation support
   - Screen reader friendly

## Future Enhancements

Potential improvements:

1. **Real-time Monitoring**: WebSocket integration for live fraud alerts
2. **Historical Data**: View past fraud checks and risk assessments
3. **Batch Processing**: Check multiple transactions at once
4. **Export Reports**: Download fraud analysis reports
5. **Custom Rules**: Allow admins to set custom fraud thresholds
6. **Dashboard Widget**: Show fraud statistics on main dashboard
7. **Notifications**: Email/SMS alerts for high-risk transactions
8. **Audit Trail**: Track all fraud detection activities

## Troubleshooting

### Common Issues

1. **"Member not found" error**:
   - Ensure members are loaded from the API
   - Check API connectivity
   - Verify member IDs are correct

2. **"Failed to check transaction" error**:
   - Check backend ML service is running
   - Verify API URL is correct
   - Check network tab for detailed error

3. **Empty dropdown**:
   - Verify members API is working
   - Check console for errors
   - Ensure user has permissions

4. **Dark mode issues**:
   - Check `dark:` Tailwind classes
   - Verify theme toggle is working
   - Clear browser cache

## Dependencies

New dependencies added:
- None (uses existing stack)

Existing dependencies used:
- React 19.2.0
- TypeScript 5.9.3
- Axios 1.13.2
- TanStack React Query 5.90.9
- Lucide React 0.553.0
- React Hot Toast 2.6.0
- Tailwind CSS 3.4.18

## File Structure

```
src/
├── services/
│   └── fraudDetectionService.ts         # ML API integration
├── pages/
│   └── fraud/
│       ├── FraudDetectionPage.tsx       # Transaction fraud check
│       └── RiskAssessmentPage.tsx       # Member risk profiling
├── types/
│   └── index.ts                         # Updated with fraud types
├── components/
│   └── layout/
│       └── DashboardLayout.tsx          # Updated navigation
└── App.tsx                              # Updated routes
```

## Contact

For issues or questions about this integration:
- Check the OpenAPI docs at `/v3/api-docs`
- Review backend ML service logs
- Contact the ML team for model-specific questions

---

**Version**: 1.0.0
**Date**: November 23, 2025
**Author**: Claude Code Integration
