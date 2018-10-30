import React from 'react';
import { PageHeader } from 'components';
import ConnectedPaymentTermsTable from './PaymentTermsTable/PaymentTermsTable';

const PaymentTerms = () => (
  <div>
    <PageHeader
      bigText="Company Payment Terms"
      smallText="Manage payment terms for customers and suppliers"
    />
    <ConnectedPaymentTermsTable />
  </div>
);

export default PaymentTerms;
