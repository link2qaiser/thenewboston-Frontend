import React, {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Formik, FormikHelpers} from 'formik';
import orderBy from 'lodash/orderBy';

import Button, {ButtonType} from 'components/Button';
import ExpandableWire from 'components/ExpandableWire';
import {CORE_TRANSACTION_FEE} from 'constants/protocol';
import {createWalletWithdraw} from 'dispatchers/wallets';
import {WireType} from 'enums';
import {useActiveWallet} from 'hooks';
import {getWires} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';
import yup, {accountNumberSchema} from 'utils/yup';
import * as S from './Styles';

const WalletWithdraw: SFC = ({className}) => {
  const activeWallet = useActiveWallet();
  const dispatch = useDispatch<AppDispatch>();
  const wires = useSelector(getWires);

  const initialValues = {
    accountNumber: '',
    amount: '',
  };

  type FormValues = typeof initialValues;

  const getTotal = (amount: string): number => {
    return parseInt(amount, 10) + CORE_TRANSACTION_FEE;
  };

  const handleSubmit = async (values: FormValues, {resetForm}: FormikHelpers<FormValues>): Promise<void> => {
    try {
      const requestData = {
        account_number: values.accountNumber,
        amount: getTotal(values.amount),
      };
      await dispatch(createWalletWithdraw(activeWallet!.id, requestData));
      resetForm();
    } catch (error) {
      console.error(error);
      displayErrorToast('Error withdrawing funds');
    }
  };

  const renderWithdraws = () => {
    if (!activeWallet) return [];

    return orderBy(Object.values(wires), ['created_date'], ['desc'])
      .filter((wire) => wire.core === activeWallet.core.id && wire.wire_type === WireType.WITHDRAW)
      .map((wire) => <ExpandableWire key={wire.id} wire={wire} />);
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      accountNumber: accountNumberSchema.required(),
      amount: yup.number().integer('Amount must be an integer').moreThan(1).required(),
    });
  }, []);

  if (!activeWallet) return null;

  return (
    <S.Container className={className}>
      <S.Panel>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
          {({dirty, errors, isSubmitting, isValid, touched, values}) => (
            <S.Form>
              <S.Input errors={errors} label="Amount" name="amount" touched={touched} type="number" />
              <S.Input errors={errors} label="Account Number" name="accountNumber" touched={touched} />
              <S.DetailRowContainer>
                <S.DetailRow>
                  <S.Label>Fee</S.Label>
                  <S.Value>{CORE_TRANSACTION_FEE}</S.Value>
                </S.DetailRow>
                <S.Line />
                <S.DetailRow>
                  <S.Label>Total</S.Label>
                  <S.Value>{values.amount ? getTotal(values.amount).toLocaleString() : '-'}</S.Value>
                </S.DetailRow>
              </S.DetailRowContainer>
              <Button
                dirty={dirty}
                disabled={isSubmitting}
                isSubmitting={isSubmitting}
                isValid={isValid}
                text="Withdraw"
                type={ButtonType.submit}
              />
            </S.Form>
          )}
        </Formik>
      </S.Panel>
      <S.Panel>
        <h4>Withdraws</h4>
        {renderWithdraws()}
      </S.Panel>
    </S.Container>
  );
};

export default WalletWithdraw;
