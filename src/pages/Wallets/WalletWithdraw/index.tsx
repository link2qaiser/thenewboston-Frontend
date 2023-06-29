import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Formik, FormikHelpers} from 'formik';

import Button, {ButtonType} from 'components/Button';
import {Input} from 'components/FormElements';
import {createWalletWithdraw} from 'dispatchers/wallets';
import {useActiveWallet} from 'hooks';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import yup, {accountNumberSchema} from 'utils/yup';
import * as S from './Styles';

const WalletWithdraw: SFC = ({className}) => {
  const activeWallet = useActiveWallet();
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    accountNumber: '',
    amount: '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues, {resetForm}: FormikHelpers<FormValues>): Promise<void> => {
    try {
      const requestData = {
        account_number: values.accountNumber,
        amount: parseInt(values.amount, 10),
      };
      await dispatch(createWalletWithdraw(activeWallet!.id, requestData));
      resetForm();
    } catch (error) {
      console.error(error);
      displayErrorToast('Error withdrawing funds');
    }
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
          {({dirty, errors, isSubmitting, isValid, touched}) => (
            <Form>
              <Input errors={errors} label="Amount" name="amount" touched={touched} type="number" />
              <Input errors={errors} label="Account Number" name="accountNumber" touched={touched} />
              <Button
                dirty={dirty}
                disabled={isSubmitting}
                isSubmitting={isSubmitting}
                isValid={isValid}
                text="Withdraw"
                type={ButtonType.submit}
              />
            </Form>
          )}
        </Formik>
      </S.Panel>
      <S.Panel>
        <h4>Withdraws</h4>
      </S.Panel>
    </S.Container>
  );
};

export default WalletWithdraw;
