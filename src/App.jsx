import styles from './App.module.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState, useRef, useEffect } from 'react'
import { ValidationScheme } from './components/validationScheme/ValidationScheme'

const { validationSchema } = ValidationScheme()

const sendFormData = (formData) => {
  console.log(formData)
}

function App() {
  const buttonRef = useRef(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  })

  const onSubmit = (data) => {
    setIsSubmitted(true)
    sendFormData(data)
  }

  useEffect(() => {
    if (isValid) {
      buttonRef.current.focus()
    }
  }, [isValid])

  return (
    <div className={styles['registration-form']}>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles['form-group']}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="E-mail"
            {...register('email')}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && (
            <div className={styles['error']}>{errors.email.message}</div>
          )}
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="password">Пароль:</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            {...register('password')}
            aria-invalid={errors.password ? 'true' : 'false'}
          />
          {isSubmitted && errors.password && (
            <div className={styles['error']}>{errors.password.message}</div>
          )}
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="confirmPassword">Подтверждение пароля:</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Repeat password"
            {...register('confirmPassword')}
            aria-invalid={errors.confirmPassword ? 'true' : 'false'}
          />
          {isSubmitted && errors.confirmPassword && (
            <div className={styles['error']}>
              {errors.confirmPassword.message}
            </div>
          )}
        </div>
        <button
          type="submit"
          ref={buttonRef}
          disabled={!isValid}
          className={styles['submit-button']}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  )
}

export default App
