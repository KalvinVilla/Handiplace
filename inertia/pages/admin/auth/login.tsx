import { useForm } from "@inertiajs/react";
import { type FormEvent } from "react";
import { LoginShell } from "~/components/admin/layout/login_shell.js";

export default function LoginPage() {

    const { errors, post, processing, data, setData} = useForm({'email': '', 'password': ''})

    const submit = (event: FormEvent) => {
        event.preventDefault()

        if (processing) return

        post('http://localhost:3333/admin/login', { onFinish: () => {
            setData('password', '')
        }})
    }

    return (
        <LoginShell title="Sign to your account">
            <form method="POST" action="" onSubmit={submit}>
                {'code' in errors && errors.code === 'E_INVALID_CREDENTIALS' && (
                    <div>
                        Invalid credentials
                    </div>
                )}
                <h1>
                    Sign in
                </h1>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={data.password} onChange={(e) => setData('password', e.target.value)}/>
                <button type="submit" disabled={processing}>{processing ? 'Loading ...' : "Login"}</button>
            </form>

        </LoginShell>
    )

}