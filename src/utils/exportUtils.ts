/**
 * EXPORT UTILITIES
 *
 * Functions for exporting data to CSV and Excel formats
 */

/**
 * Convert array of objects to CSV string
 */
export const convertToCSV = (data: any[], headers: string[]): string => {
  if (!data || data.length === 0) return '';

  // Create header row
  const headerRow = headers.join(',');

  // Create data rows
  const dataRows = data.map(item => {
    return headers.map(header => {
      const value = item[header];
      // Handle values that contain commas or quotes
      if (value && (value.toString().includes(',') || value.toString().includes('"'))) {
        return `"${value.toString().replace(/"/g, '""')}"`;
      }
      return value || '';
    }).join(',');
  });

  return [headerRow, ...dataRows].join('\n');
};

/**
 * Download data as CSV file
 */
export const downloadCSV = (data: any[], filename: string, headers: string[]) => {
  try {
    const csv = convertToCSV(data, headers);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      throw new Error('Browser does not support file downloads');
    }
  } catch (error) {
    console.error('Error downloading CSV:', error);
    throw new Error('Failed to download CSV file');
  }
};

/**
 * Download data as JSON file
 */
export const downloadJSON = (data: any[], filename: string) => {
  try {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}.json`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      throw new Error('Browser does not support file downloads');
    }
  } catch (error) {
    console.error('Error downloading JSON:', error);
    throw new Error('Failed to download JSON file');
  }
};

/**
 * Format date for export
 */
export const formatDateForExport = (date: string | Date): string => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-GB');
};

/**
 * Format currency for export
 */
export const formatCurrencyForExport = (amount: number): string => {
  return `₦${amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

/**
 * Export members data
 */
export const exportMembers = (members: any[], format: 'csv' | 'json' = 'csv') => {
  const headers = [
    'id',
    'firstName',
    'lastName',
    'email',
    'phoneNumber',
    'dateOfBirth',
    'gender',
    'address',
    'city',
    'state',
    'country',
    'employmentStatus',
    'accountType',
    'accountStatus',
    'enrollmentDate',
    'totalContributions',
    'availableBalance',
  ];

  const filename = `members_export_${new Date().toISOString().split('T')[0]}`;

  if (format === 'csv') {
    downloadCSV(members, filename, headers);
  } else {
    downloadJSON(members, filename);
  }
};

/**
 * Export contributions data
 */
export const exportContributions = (contributions: any[], format: 'csv' | 'json' = 'csv') => {
  const headers = [
    'id',
    'memberName',
    'amount',
    'contributionType',
    'paymentMethod',
    'transactionReference',
    'contributionDate',
    'status',
    'description',
  ];

  const filename = `contributions_export_${new Date().toISOString().split('T')[0]}`;

  if (format === 'csv') {
    downloadCSV(contributions, filename, headers);
  } else {
    downloadJSON(contributions, filename);
  }
};

/**
 * Export benefit claims data
 */
export const exportBenefitClaims = (claims: any[], format: 'csv' | 'json' = 'csv') => {
  const headers = [
    'id',
    'memberName',
    'claimType',
    'requestedAmount',
    'approvedAmount',
    'status',
    'reason',
    'submissionDate',
    'reviewDate',
    'reviewedBy',
    'paymentDate',
    'paymentReference',
  ];

  const filename = `benefit_claims_export_${new Date().toISOString().split('T')[0]}`;

  if (format === 'csv') {
    downloadCSV(claims, filename, headers);
  } else {
    downloadJSON(claims, filename);
  }
};
