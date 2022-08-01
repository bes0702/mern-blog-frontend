import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';

import styles from './Login.module.scss';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors, isValid} } = useForm({
    defaultValues: {
      fullName: 'Вася Пупкин',
      email: 'vasya@test.ru',
      password: '1234',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      alert('Не удалось зарегистрироваться!!!');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to ='/' />
    }


  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field} 
          label="Полное имя"
          {... register('fullName', { required: 'Укажите полное имя'})}
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          {... register('email', { required: 'Укажите почту'})}
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          fullWidth />
        <TextField
          className={styles.field}
          label="Пароль"
          {... register('password', { required: 'Укажите пароль'})}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          fullWidth
        />
        <Button type='submit' disabled={!isValid} size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
