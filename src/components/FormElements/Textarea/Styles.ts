import {Field as UField} from 'formik';
import styled from 'styled-components';

import {colors, inputStyle} from 'styles';

export const ErrorMessage = styled.div`
  color: ${colors.palette.red['400']};
  font-size: 12px;
  margin-top: 6px;
`;

export const Field = styled(UField)`
  ${inputStyle};
  border: 1px solid ${({$error}) => ($error ? colors.palette.red['400'] : colors.border)};
  display: block;
  height: auto;
  resize: vertical;
  width: 100%;
`;

export const Label = styled.h2`
  font-size: 12px;
  margin-bottom: 8px;
`;

export const SecondaryContainer = styled.div`
  margin-bottom: 32px;
`;
