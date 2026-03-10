"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function WebDeletion() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{
        type: "idle" | "error" | "success";
        message: string;
    }>({ type: "idle", message: "" });
    const [session, setSession] = useState<any>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: "idle", message: "" });

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setStatus({ type: "error", message: error.message });
        } else if (data.session) {
            setSession(data.session);
        }
        setLoading(false);
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
                <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <p style={{ color: "#a1a1aa" }}>Inicia sesión para eliminar tu cuenta directamente desde la web:</p>
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #27272a", background: "#09090b", color: "#fafafa" }}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #27272a", background: "#09090b", color: "#fafafa" }}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: "0.75rem",
                            borderRadius: "0.5rem",
                            background: "#3b82f6",
                            color: "white",
                            fontWeight: "bold",
                            cursor: loading ? "not-allowed" : "pointer",
                            border: "none"
                        }}
                    >
                        {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                    </button>
                    {status.type === "error" && <p style={{ color: "#ef4444", fontSize: "0.9rem" }}>{status.message}</p>}
                    {status.type === "success" && <p style={{ color: "#22c55e", fontSize: "0.9rem" }}>{status.message}</p>}
                </form>
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
                            border: "none"
                        }}
                    >
                        {loading ? "Eliminando..." : "Eliminar mi cuenta permanentemente"}
                    </button>

                    <button
                        onClick={() => {
                            supabase.auth.signOut();
                            setSession(null);
                            setStatus({ type: "idle", message: "" });
                        }}
                        style={{ padding: "0.5rem", border: "none", background: "transparent", color: "#a1a1aa", cursor: "pointer", textDecoration: "underline" }}
                    >
                        Cancelar y cerrar sesión
                    </button>

                    {status.type === "error" && <p style={{ color: "#ef4444", fontSize: "0.9rem" }}>{status.message}</p>}
                </div>
            )}
        </div>
    );
}
