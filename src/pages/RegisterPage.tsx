import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'
import styles from './AuthPage.module.css'

// 🔥 Form type
type RegisterForm = {
  name: string
  email: string
  password: string
}

export default function RegisterPage(): React.ReactElement {
 const { register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState<RegisterForm>({
    name: '',
    email: '',
    password: '',
  })

  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const update = (key: keyof RegisterForm, value: string): void => {
  const updatedForm = { ...form, [key]: value }
  setForm(updatedForm)

  // 🔥 Smart validation (only for password)
  if (key === 'password') {
    if (value.length < 4) {
      setError('Password must be at least 4 characters.')
    } else {
      setError('')
    }
  }
}
  // 🔥 Better: form submit instead of button click
  const handleSubmit = async (
    _: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
   const errorMsg = register({
  name: form.name,
  email: form.email,
  password: form.password,
})

if (errorMsg) {
  setError(errorMsg)
  setLoading(false)
  return
}

if (!form.password || form.password.length < 4) {
  setError('Password must be at least 4 characters.')
  return
}

setLoading(false)
navigate('/login') // ✅ go to login instead
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brand}>⌂ HotelHub</div>

        <h1 className={styles.title}>Create account</h1>
        <p className={styles.sub}>
          Start exploring India's best hotels today.
        </p>

        {error && <div className={styles.error}>{error}</div>}

        {/* 🔥 Use form */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter name"
              value={form.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                update('name', e.target.value)
              }
            />
          </div>

          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={form.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                update('email', e.target.value)
              }
            />
          </div>

          <div className={styles.field}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Min. 4 characters"
              value={form.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                update('password', e.target.value)
              }
            />
          </div>

          <button
            type="submit"
            className={`btn btn-primary ${styles.submitBtn}`}
            disabled={loading}
          >
            {loading ? 'Creating account…' : 'Sign Up Free →'}
          </button>
        </form>

        <p className={styles.switch}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>

      <div className={styles.visual} aria-hidden="true">
        <div className={styles.orb} />
        <p className={styles.quote}>
          "Not all those who wander are lost."
        </p>
        <span className={styles.quoteBy}>
          — J.R.R. Tolkien
        </span>
      </div>
    </div>
  )
}

