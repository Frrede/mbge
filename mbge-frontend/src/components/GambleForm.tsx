import React from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';

export interface GambleFormProps {
  onGamble?: (name: string) => void
}

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
});

export function GambleForm(props: GambleFormProps) {
  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (props.onGamble) {
        props.onGamble(values.name);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box marginBottom={2}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          inputProps={{ 'data-testid': 'gamble-input' } as React.InputHTMLAttributes<HTMLInputElement>}
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
      </Box>
      <Button
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
        data-testid="gamble-button"
      >
        Gamble!
      </Button>
    </form>
  );
}
