import { useEffect, useState } from 'react'
import Notice from '../../components/notice/Notice.jsx'
import { authService } from '../../services/auth/authService.js'
import { useAuth } from '../../hooks/auth/useAuth.js'

export default function Profile() {
  const { profile, refreshProfile, logout } = useAuth(); const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '' }); const [message, setMessage] = useState(''); const [busy, setBusy] = useState(false)
  useEffect(() => { if (profile) setForm(({ ...profile })) }, [profile])
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = async (e) => { e.preventDefault(); setBusy(true); setMessage(''); try { const emailChanged = profile.email !== form.email; await authService.updateProfile(form); if (emailChanged) { logout(); return } await refreshProfile(); setMessage('Profile updated.') } catch (err) { setMessage(err.message) } finally { setBusy(false) } }
  const deactivate = async () => { if (confirm('Deactivate your account?')) { await authService.deactivate(); logout() } }
  return <main className="page narrow"><header className="page-hero page-hero--small"><span className="eyebrow">Your account</span><h1>Profile</h1></header><Notice message={message} type={message.includes('updated') ? 'success' : 'error'} /><form className="form form--grid panel" onSubmit={submit}><label>First name<input name="firstName" required value={form.firstName} onChange={change} /></label><label>Last name<input name="lastName" required value={form.lastName} onChange={change} /></label><label>Email<input name="email" type="email" required value={form.email} onChange={change} /></label><label>Phone<input name="phoneNumber" required value={form.phoneNumber} onChange={change} /></label><small className="span-2">Changing your email signs you out so a new token can be issued.</small><button className="button button--primary" disabled={busy}>Save changes</button><button className="button button--danger" type="button" onClick={deactivate}>Deactivate account</button></form></main>
}