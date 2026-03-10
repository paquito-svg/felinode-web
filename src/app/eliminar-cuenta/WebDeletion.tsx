"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function WebDeletion() {
    const [email, setEmail] = useState("");
    const [otpCode, setOtpCode] = useState("");
    const [step, setStep] = useState<"email" | "code">("email");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{
        type: "idle" | "error" | "success";
        message: string;
    }>({ type: "idle", message: "" });
    const [session, setSession] = useState<any>(null);

    // Initial check for session (e.g. after Google OAuth redirect)
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
            }
        );

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: "idle", message: "" });

        const { error } = await supabase.auth.signInWithOtp({
            email,
        });

        if (error) {
            setStatus({ type: "error", message: error.message });
        } else {
            setStatus({ type: "success", message: "Código enviado. Revisa tu correo electrónico." });
            setStep("code");
        }
        setLoading(false);
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: "idle", message: "" });

        const { data, error } = await supabase.auth.verifyOtp({
            email,
            token: otpCode,
            type: "email",
        });

        if (error) {
            setStatus({ type: "error", message: "Código incorrecto o expirado." });
        } else if (data.session) {
            setSession(data.session);
            setStatus({ type: "idle", message: "" });
        }
        setLoading(false);
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setStatus({ type: "idle", message: "" });

        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/eliminar-cuenta`,
            },
        });

        if (error) {
            setStatus({ type: "error", message: error.message });
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("¿Estás completamente seguro? Esta acción es irreversible y perderás todos tus datos.")) return;

        setLoading(true);
        setStatus({ type: "idle", message: "" });

        // Call the RPC function defined in Supabase to delete the user
        const { error } = await supabase.rpc("delete_user_account");

        if (error) {
            setStatus({ type: "error", message: `Error al eliminar la cuenta: ${error.message}` });
            setLoading(false);
        } else {
            await supabase.auth.signOut();
            setSession(null);
            setStep("email");
            setEmail("");
            setOtpCode("");
            setStatus({
                type: "success",
                message: "Tu cuenta ha sido eliminada permanentemente.",
            });
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "1.5rem", border: "1px solid #27272a", borderRadius: "0.75rem", backgroundColor: "#18181b", marginTop: "1.5rem" }}>
            {!session ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <p style={{ color: "#a1a1aa" }}>Inicia sesión para eliminar tu cuenta directamente desde la web:</p>

                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        style={{
                            padding: "0.75rem",
                            borderRadius: "0.5rem",
                            background: "white",
                            color: "#18181b",
                            fontWeight: "bold",
                            cursor: loading ? "not-allowed" : "pointer",
                            border: "none",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem"
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.8 15.69 17.59V20.34H19.26C21.35 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4" />
                            <path d="M12 23C14.97 23 17.46 22.01 19.26 20.34L15.69 17.59C14.71 18.25 13.46 18.66 12 18.66C9.18 18.66 6.78 16.76 5.92 14.22H2.23V17.08C4.04 20.67 7.72 23 12 23Z" fill="#34A853" />
                            <path d="M5.92 14.22C5.7 13.56 5.58 12.87 5.58 12.16C5.58 11.45 5.7 10.76 5.92 10.1V7.24H2.23C1.49 8.7 1.07 10.38 1.07 12.16C1.07 13.94 1.49 15.62 2.23 17.08L5.92 14.22Z" fill="#FBBC05" />
                            <path d="M12 5.66C13.62 5.66 15.06 6.22 16.21 7.31L19.34 4.18C17.45 2.42 14.97 1.34 12 1.34C7.72 1.34 4.04 3.65 2.23 7.24L5.92 10.1C6.78 7.56 9.18 5.66 12 5.66Z" fill="#EA4335" />
                        </svg>
                        Continuar con Google
                    </button>

                    <div style={{ display: "flex", alignItems: "center", textTransform: "uppercase", color: "#52525b", fontSize: "0.8rem", margin: "0.5rem 0" }}>
                        <div style={{ flex: 1, height: "1px", background: "#27272a" }}></div>
                        <span style={{ padding: "0 0.5rem" }}>O con tu correo</span>
                        <div style={{ flex: 1, height: "1px", background: "#27272a" }}></div>
                    </div>

                    {step === "email" ? (
                        <form onSubmit={handleSendOtp} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #27272a", background: "#09090b", color: "#fafafa" }}
                            />
                            <button
                                type="submit"
                                disabled={loading || !email}
                                style={{
                                    padding: "0.75rem",
                                    borderRadius: "0.5rem",
                                    background: "#3b82f6",
                                    color: "white",
                                    fontWeight: "bold",
                                    cursor: loading || !email ? "not-allowed" : "pointer",
                                    border: "none",
                                    opacity: loading || !email ? 0.7 : 1
                                }}
                            >
                                {loading ? "Enviando..." : "Enviar código de acceso"}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <p style={{ color: "#fafafa", fontSize: "0.9rem" }}>Ingresa el código de 6 dígitos enviado a <strong>{email}</strong></p>
                            <input
                                type="text"
                                placeholder="Código de 6 dígitos"
                                value={otpCode}
                                onChange={(e) => setOtpCode(e.target.value)}
                                required
                                maxLength={6}
                                style={{ padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #27272a", background: "#09090b", color: "#fafafa", letterSpacing: "0.2em", textAlign: "center", fontSize: "1.2rem" }}
                            />
                            <button
                                type="submit"
                                disabled={loading || otpCode.length < 6}
                                style={{
                                    padding: "0.75rem",
                                    borderRadius: "0.5rem",
                                    background: "#22c55e",
                                    color: "white",
                                    fontWeight: "bold",
                                    cursor: loading || otpCode.length < 6 ? "not-allowed" : "pointer",
                                    border: "none",
                                    opacity: loading || otpCode.length < 6 ? 0.7 : 1
                                }}
                            >
                                {loading ? "Verificando..." : "Verificar e Iniciar Sesión"}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setStep("email");
                                    setOtpCode("");
                                    setStatus({ type: "idle", message: "" });
                                }}
                                style={{ padding: "0.5rem", border: "none", background: "transparent", color: "#a1a1aa", cursor: "pointer", textDecoration: "underline" }}
                            >
                                Usar otro correo
                            </button>
                        </form>
                    )}

                    {status.type === "error" && <p style={{ color: "#ef4444", fontSize: "0.9rem", textAlign: "center" }}>{status.message}</p>}
                    {status.type === "success" && <p style={{ color: "#22c55e", fontSize: "0.9rem", textAlign: "center" }}>{status.message}</p>}
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <p style={{ color: "#fafafa", fontWeight: "bold" }}>Sesión iniciada como: {session.user.email}</p>
                    <p style={{ color: "#ef4444", fontSize: "0.9rem" }}>Advertencia: Al hacer clic en el botón de abajo, tu cuenta y todos tus datos (estadísticas, progreso, etc.) serán eliminados permanentemente sin posibilidad de recuperación.</p>
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        style={{
                            padding: "0.75rem",
                            borderRadius: "0.5rem",
                            background: "#ef4444",
                            color: "white",
                            fontWeight: "bold",
                            cursor: loading ? "not-allowed" : "pointer",
                            border: "none",
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? "Eliminando..." : "Eliminar mi cuenta permanentemente"}
                    </button>

                    <button
                        onClick={() => {
                            supabase.auth.signOut();
                            setSession(null);
                            setStep("email");
                            setEmail("");
                            setOtpCode("");
                            setStatus({ type: "idle", message: "" });
                        }}
                        style={{ padding: "0.5rem", border: "none", background: "transparent", color: "#a1a1aa", cursor: "pointer", textDecoration: "underline" }}
                    >
                        Cancelar y cerrar sesión
                    </button>

                    {status.type === "error" && <p style={{ color: "#ef4444", fontSize: "0.9rem", textAlign: "center" }}>{status.message}</p>}
                </div>
            )}
        </div>
    );
}
