import GuestLayout from '@/layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="auth-card">
                <div className="row g-0 h-100">
                    <div className="col-lg-6 d-none d-lg-flex auth-illustration">
                        <div className="auth-illustration-circle"></div>

                        <div className="auth-illustration-content">
                            <div className="auth-phone">
                                <div className="auth-phone-screen"></div>
                                <div className="auth-phone-button"></div>
                            </div>

                            <div className="auth-person">
                                <div className="auth-head"></div>
                                <div className="auth-body"></div>
                                <div className="auth-laptop"></div>
                            </div>

                            <div className="auth-bubble bubble-1">•••</div>
                            <div className="auth-bubble bubble-2"></div>
                            <div className="auth-bubble bubble-3"></div>
                        </div>
                    </div>

                    <div className="col-lg-6 auth-form-side">
                        <div className="auth-form-wrapper">
                            <div className="text-center mb-4">
                                <h1 className="auth-title">INSENTIF</h1>
                                <h2 className="auth-subtitle">LOGIN PAGE</h2>
                            </div>

                            {status && (
                                <div className="alert alert-success py-2 small">
                                    {status}
                                </div>
                            )}

                            <form onSubmit={submit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label auth-label">
                                        Email address
                                    </label>

                                    <div className="auth-input-group">
                                        <div className="auth-input-icon auth-icon-gold">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="2" />
                                                <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" />
                                            </svg>
                                        </div>

                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            autoComplete="username"
                                            autoFocus
                                            className={`form-control auth-input ${
                                                errors.email ? 'is-invalid' : ''
                                            }`}
                                            placeholder="Masukkan email"
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                    </div>

                                    {errors.email && (
                                        <div className="invalid-feedback d-block mt-2">
                                            {errors.email}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-2">
                                    <label htmlFor="password" className="form-label auth-label">
                                        Password
                                    </label>

                                    <div className="auth-input-group">
                                        <div className="auth-input-icon auth-icon-dark">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                <path
                                                    d="M7 11V8a5 5 0 0 1 10 0v3"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                />
                                                <path
                                                    d="M6 11h12v9H6v-9Z"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>

                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={data.password}
                                            autoComplete="current-password"
                                            className={`form-control auth-input auth-password-input ${
                                                errors.password ? 'is-invalid' : ''
                                            }`}
                                            placeholder="Masukkan password"
                                            onChange={(e) => setData('password', e.target.value)}
                                        />

                                        <button
                                            type="button"
                                            className="auth-eye-btn"
                                            onClick={() => setShowPassword(!showPassword)}
                                            aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                                        >
                                            {showPassword ? (
                                                <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
                                                    <path
                                                        d="M3 3l18 18"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                    />
                                                    <path
                                                        d="M10.6 10.6A2 2 0 0 0 13.4 13.4"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                    />
                                                    <path
                                                        d="M9.9 4.24A9.77 9.77 0 0 1 12 4c5 0 9 4.5 10 8a10.6 10.6 0 0 1-2.08 3.51"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                    />
                                                    <path
                                                        d="M6.61 6.61C4.8 7.86 3.53 9.75 2 12c1 3.5 5 8 10 8a9.4 9.4 0 0 0 4.15-.95"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
                                                    <path
                                                        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    />
                                                </svg>
                                            )}
                                        </button>
                                    </div>

                                    {errors.password && (
                                        <div className="invalid-feedback d-block mt-2">
                                            {errors.password}
                                        </div>
                                    )}
                                </div>

                                <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
                                    <div className="form-check">
                                        <input
                                            id="remember"
                                            name="remember"
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                        />
                                        <label htmlFor="remember" className="form-check-label auth-small-text">
                                            Remember me
                                        </label>
                                    </div>

                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="auth-forgot-link"
                                        >
                                            Forget password?
                                        </Link>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="btn auth-signin-btn w-100"
                                    disabled={processing}
                                >
                                    {processing ? 'PROCESSING...' : 'SIGN IN'}
                                </button>

                                {/* <div className="text-center mt-4 auth-register-text">
                                    DON&apos;T HAVE AN ACCOUNT?{' '}
                                    <Link href={route('register')} className="auth-create-link">
                                        CREATE AN ACCOUNT
                                    </Link>
                                </div> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}