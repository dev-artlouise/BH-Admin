import { Grid } from '@mui/material';

import CompanyForm from 'layout/Companies-Section/CompanyForm';
import CompanyContent from 'layout/Companies-Section/CompanyContent';

const CompaniesSection = () => {
  return (
    <Grid container spacing={6} columns={12}>
      <Grid item xs={4} md={5}>
        <CompanyForm />
      </Grid>

      <Grid item xs={8} md={7}>
        <CompanyContent />
      </Grid>
    </Grid>
  );
};

export default CompaniesSection;
