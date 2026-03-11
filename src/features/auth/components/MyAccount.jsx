import { useState } from "react";
import {
    Box, Container, Typography, TextField, Button,
    Grid, Avatar, Divider, IconButton, InputAdornment,
    Alert, Snackbar, Chip, CircularProgress, Tab, Tabs,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import BadgeIcon from "@mui/icons-material/Badge";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LogoutIcon from "@mui/icons-material/Logout";

const COLORS = {
    black: "#0a0a0a",
    darkGray: "#111111",
    midGray: "#1a1a1a",
    surface: "#242424",
    surfaceHover: "#2e2e2e",
    border: "#2e2e2e",
    white: "#ffffff",
    offWhite: "#e8e8e8",
    muted: "#888888",
    accent: "#0070d2",
    accentHover: "#005bb5",
    gold: "#f0a500",
    red: "#e8002d",
    green: "#00c853",
};

// ── Validaciones ───────────────────────────────────────────
const validate = {
    nombre: (v) => {
        if (!v.trim()) return "El nombre es obligatorio";
        if (v.trim().length < 2) return "Mínimo 2 caracteres";
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(v)) return "Solo se permiten letras";
        return "";
    },
    apellido: (v) => {
        if (!v.trim()) return "El apellido es obligatorio";
        if (v.trim().length < 2) return "Mínimo 2 caracteres";
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(v)) return "Solo se permiten letras";
        return "";
    },
    email: (v) => {
        if (!v.trim()) return "El correo es obligatorio";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Correo no válido";
        return "";
    },
    telefono: (v) => {
        if (!v.trim()) return "El teléfono es obligatorio";
        if (!/^\+?[\d\s\-]{7,15}$/.test(v)) return "Teléfono no válido";
        return "";
    },
    password: (v) => {
        if (!v) return "La contraseña es obligatoria";
        if (v.length < 8) return "Mínimo 8 caracteres";
        return "";
    },
    passwordNueva: (v) => {
        if (!v) return "";
        if (v.length < 8) return "Mínimo 8 caracteres";
        if (!/[A-Z]/.test(v)) return "Debe incluir al menos una mayúscula";
        if (!/[0-9]/.test(v)) return "Debe incluir al menos un número";
        if (!/[!@#$%^&*]/.test(v)) return "Debe incluir un carácter especial (!@#$%^&*)";
        return "";
    },
    passwordConfirm: (v, nueva) => {
        if (!v && !nueva) return "";
        if (v !== nueva) return "Las contraseñas no coinciden";
        return "";
    },
    passwordActual: (v) => {
        if (!v) return "Ingresa tu contraseña actual";
        return "";
    },
};

// ── Fuerza contraseña ──────────────────────────────────────
const passwordStrength = (v) => {
    if (!v) return { level: 0, label: "", color: "" };
    let score = 0;
    if (v.length >= 8)         score++;
    if (/[A-Z]/.test(v))      score++;
    if (/[0-9]/.test(v))      score++;
    if (/[!@#$%^&*]/.test(v)) score++;
    if (v.length >= 12)       score++;
    if (score <= 1) return { level: score, label: "Muy débil",  color: COLORS.red };
    if (score === 2) return { level: score, label: "Débil",     color: "#ff6d00" };
    if (score === 3) return { level: score, label: "Regular",   color: COLORS.gold };
    if (score === 4) return { level: score, label: "Fuerte",    color: "#76c442" };
    return              { level: score, label: "Muy fuerte", color: COLORS.green };
};

// ── Estilos TextField ──────────────────────────────────────
const fieldSx = (hasError) => ({
    "& .MuiOutlinedInput-root": {
        background: COLORS.midGray,
        borderRadius: "10px",
        color: COLORS.white,
        "& fieldset": { borderColor: hasError ? COLORS.red : COLORS.border },
        "&:hover fieldset": { borderColor: hasError ? COLORS.red : COLORS.accent },
        "&.Mui-focused fieldset": { borderColor: hasError ? COLORS.red : COLORS.accent },
        "&.Mui-disabled": { background: COLORS.surface },
    },
    "& .MuiInputLabel-root": { color: COLORS.muted },
    "& .MuiInputLabel-root.Mui-focused": { color: COLORS.accent },
    "& .MuiFormHelperText-root": { color: hasError ? COLORS.red : COLORS.muted },
    "& .MuiInputAdornment-root .MuiSvgIcon-root": { color: COLORS.muted },
});

const cardSx = {
    background: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "16px",
    p: { xs: 3, md: 4 },
};

// ══════════════════════════════════════════════════════════
//  LOGIN
// ══════════════════════════════════════════════════════════
const LoginForm = ({ onLogin, onSwitch }) => {
    const [form,   setForm]   = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [show,   setShow]   = useState(false);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");

    const handleChange = (field) => (e) => {
        setForm((p) => ({ ...p, [field]: e.target.value }));
        setErrors((p) => ({ ...p, [field]: validate[field] ? validate[field](e.target.value) : "" }));
        setServerError("");
    };

    const handleSubmit = async () => {
        const errs = {
            email:    validate.email(form.email),
            password: validate.password(form.password),
        };
        setErrors(errs);
        if (Object.values(errs).some(Boolean)) return;

        setLoading(true);
        await new Promise((r) => setTimeout(r, 1200)); // simula API
        setLoading(false);

        // Simula: cualquier email válido con contraseña ≥8 chars → login ok
        onLogin({ nombre: form.email.split("@")[0], email: form.email });
    };

    return (
        <Box sx={cardSx}>
            <Box sx={{ textAlign: "center", mb: 3.5 }}>
                <Box sx={{
                    width: 56, height: 56, borderRadius: "14px",
                    background: `linear-gradient(135deg, ${COLORS.accent}, #00aaff)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    mx: "auto", mb: 2,
                    boxShadow: `0 0 24px ${COLORS.accent}44`,
                }}>
                    <LoginIcon sx={{ color: "white", fontSize: 26 }} />
                </Box>
                <Typography sx={{ color: COLORS.white, fontWeight: 800, fontSize: "1.4rem", letterSpacing: "-0.5px" }}>
                    Iniciar sesión
                </Typography>
                <Typography sx={{ color: COLORS.muted, fontSize: "0.85rem", mt: 0.5 }}>
                    Accede a tu cuenta SonyStore
                </Typography>
            </Box>

            {serverError && (
                <Alert severity="error" sx={{ mb: 2, background: "#2a0a0a", color: COLORS.white, border: `1px solid ${COLORS.red}44` }}>
                    {serverError}
                </Alert>
            )}

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                    fullWidth label="Correo electrónico"
                    value={form.email}
                    onChange={handleChange("email")}
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={fieldSx(!!errors.email)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start"><EmailIcon fontSize="small" /></InputAdornment>
                        ),
                    }}
                />

                <TextField
                    fullWidth label="Contraseña"
                    type={show ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange("password")}
                    error={!!errors.password}
                    helperText={errors.password}
                    sx={fieldSx(!!errors.password)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start"><LockIcon fontSize="small" /></InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShow((s) => !s)} edge="end" sx={{ color: COLORS.muted }}>
                                    {show ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <Button
                    fullWidth variant="contained"
                    onClick={handleSubmit}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <LoginIcon fontSize="small" />}
                    sx={{
                        mt: 0.5,
                        background: `linear-gradient(90deg, ${COLORS.accent}, #005bb5)`,
                        color: "white", fontWeight: 700, textTransform: "none",
                        borderRadius: "10px", py: 1.3, fontSize: "0.95rem",
                        boxShadow: `0 8px 24px ${COLORS.accent}33`,
                        "&:hover": { background: `linear-gradient(90deg, ${COLORS.accentHover}, #004a9e)`, transform: "translateY(-1px)" },
                        transition: "all 0.2s",
                    }}
                >
                    {loading ? "Iniciando sesión..." : "Iniciar sesión"}
                </Button>
            </Box>

            <Divider sx={{ borderColor: COLORS.border, my: 3 }} />

            <Box sx={{ textAlign: "center" }}>
                <Typography sx={{ color: COLORS.muted, fontSize: "0.85rem" }}>
                    ¿No tienes cuenta?{" "}
                    <Box
                        component="span"
                        onClick={onSwitch}
                        sx={{ color: COLORS.accent, fontWeight: 700, cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                    >
                        Regístrate aquí
                    </Box>
                </Typography>
            </Box>
        </Box>
    );
};

// ══════════════════════════════════════════════════════════
//  REGISTER
// ══════════════════════════════════════════════════════════
const RegisterForm = ({ onRegister, onSwitch }) => {
    const [form, setForm] = useState({
        nombre: "", apellido: "", email: "", telefono: "", password: "", passwordConfirm: "",
    });
    const [errors,  setErrors]  = useState({});
    const [show,    setShow]    = useState({ password: false, confirm: false });
    const [loading, setLoading] = useState(false);
    const strength = passwordStrength(form.password);

    const handleChange = (field) => (e) => {
        const val = e.target.value;
        setForm((p) => ({ ...p, [field]: val }));
        if (field === "password") {
            setErrors((p) => ({
                ...p,
                password:        validate.passwordNueva(val),
                passwordConfirm: validate.passwordConfirm(form.passwordConfirm, val),
            }));
        } else if (field === "passwordConfirm") {
            setErrors((p) => ({ ...p, passwordConfirm: validate.passwordConfirm(val, form.password) }));
        } else {
            setErrors((p) => ({ ...p, [field]: validate[field] ? validate[field](val) : "" }));
        }
    };

    const handleSubmit = async () => {
        const errs = {
            nombre:          validate.nombre(form.nombre),
            apellido:        validate.apellido(form.apellido),
            email:           validate.email(form.email),
            telefono:        validate.telefono(form.telefono),
            password:        validate.passwordNueva(form.password),
            passwordConfirm: validate.passwordConfirm(form.passwordConfirm, form.password),
        };
        if (!form.password) errs.password = "La contraseña es obligatoria";
        if (!form.passwordConfirm) errs.passwordConfirm = "Confirma tu contraseña";
        setErrors(errs);
        if (Object.values(errs).some(Boolean)) return;

        setLoading(true);
        await new Promise((r) => setTimeout(r, 1400));
        setLoading(false);
        onRegister({ nombre: form.nombre, apellido: form.apellido, email: form.email, telefono: form.telefono });
    };

    return (
        <Box sx={cardSx}>
            <Box sx={{ textAlign: "center", mb: 3.5 }}>
                <Box sx={{
                    width: 56, height: 56, borderRadius: "14px",
                    background: `linear-gradient(135deg, ${COLORS.accent}, #00aaff)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    mx: "auto", mb: 2,
                    boxShadow: `0 0 24px ${COLORS.accent}44`,
                }}>
                    <AppRegistrationIcon sx={{ color: "white", fontSize: 26 }} />
                </Box>
                <Typography sx={{ color: COLORS.white, fontWeight: 800, fontSize: "1.4rem", letterSpacing: "-0.5px" }}>
                    Crear cuenta
                </Typography>
                <Typography sx={{ color: COLORS.muted, fontSize: "0.85rem", mt: 0.5 }}>
                    Únete a SonyStore hoy
                </Typography>
            </Box>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth label="Nombre"
                        value={form.nombre} onChange={handleChange("nombre")}
                        error={!!errors.nombre} helperText={errors.nombre}
                        sx={fieldSx(!!errors.nombre)}
                        InputProps={{ startAdornment: <InputAdornment position="start"><BadgeIcon fontSize="small" /></InputAdornment> }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth label="Apellido"
                        value={form.apellido} onChange={handleChange("apellido")}
                        error={!!errors.apellido} helperText={errors.apellido}
                        sx={fieldSx(!!errors.apellido)}
                        InputProps={{ startAdornment: <InputAdornment position="start"><BadgeIcon fontSize="small" /></InputAdornment> }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth label="Correo electrónico"
                        value={form.email} onChange={handleChange("email")}
                        error={!!errors.email} helperText={errors.email}
                        sx={fieldSx(!!errors.email)}
                        InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon fontSize="small" /></InputAdornment> }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth label="Teléfono"
                        value={form.telefono} onChange={handleChange("telefono")}
                        error={!!errors.telefono} helperText={errors.telefono}
                        sx={fieldSx(!!errors.telefono)}
                        InputProps={{ startAdornment: <InputAdornment position="start"><PhoneIcon fontSize="small" /></InputAdornment> }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth label="Contraseña"
                        type={show.password ? "text" : "password"}
                        value={form.password} onChange={handleChange("password")}
                        error={!!errors.password} helperText={errors.password}
                        sx={fieldSx(!!errors.password)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><LockIcon fontSize="small" /></InputAdornment>,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShow((s) => ({ ...s, password: !s.password }))} edge="end" sx={{ color: COLORS.muted }}>
                                        {show.password ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    {/* Barra de fuerza */}
                    {form.password && (
                        <Box sx={{ mt: 1 }}>
                            <Box sx={{ display: "flex", gap: 0.5, mb: 0.4 }}>
                                {[1,2,3,4,5].map((i) => (
                                    <Box key={i} sx={{
                                        flex: 1, height: 4, borderRadius: 2,
                                        background: i <= strength.level ? strength.color : COLORS.border,
                                        transition: "background 0.3s",
                                    }} />
                                ))}
                            </Box>
                            <Typography sx={{ color: strength.color, fontSize: "0.7rem", fontWeight: 600 }}>
                                {strength.label}
                            </Typography>
                        </Box>
                    )}
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth label="Confirmar contraseña"
                        type={show.confirm ? "text" : "password"}
                        value={form.passwordConfirm} onChange={handleChange("passwordConfirm")}
                        error={!!errors.passwordConfirm} helperText={errors.passwordConfirm}
                        sx={fieldSx(!!errors.passwordConfirm)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><LockIcon fontSize="small" /></InputAdornment>,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShow((s) => ({ ...s, confirm: !s.confirm }))} edge="end" sx={{ color: COLORS.muted }}>
                                        {show.confirm ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                {/* Requisitos contraseña */}
                <Grid size={{ xs: 12 }}>
                    <Box sx={{ background: COLORS.midGray, border: `1px solid ${COLORS.border}`, borderRadius: "10px", p: 2 }}>
                        <Typography sx={{ color: COLORS.muted, fontSize: "0.72rem", fontWeight: 600, mb: 1, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                            Requisitos
                        </Typography>
                        {[
                            { rule: form.password.length >= 8,         text: "Mínimo 8 caracteres" },
                            { rule: /[A-Z]/.test(form.password),       text: "Al menos una mayúscula" },
                            { rule: /[0-9]/.test(form.password),       text: "Al menos un número" },
                            { rule: /[!@#$%^&*]/.test(form.password),  text: "Un carácter especial (!@#$%^&*)" },
                        ].map(({ rule, text }) => (
                            <Box key={text} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.4 }}>
                                <Box sx={{
                                    width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
                                    background: rule ? COLORS.green : COLORS.border,
                                    transition: "background 0.2s",
                                }} />
                                <Typography sx={{ fontSize: "0.76rem", color: rule ? COLORS.green : COLORS.muted, transition: "color 0.2s" }}>
                                    {text}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Button
                        fullWidth variant="contained"
                        onClick={handleSubmit}
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <AppRegistrationIcon fontSize="small" />}
                        sx={{
                            mt: 0.5,
                            background: `linear-gradient(90deg, ${COLORS.accent}, #005bb5)`,
                            color: "white", fontWeight: 700, textTransform: "none",
                            borderRadius: "10px", py: 1.3, fontSize: "0.95rem",
                            boxShadow: `0 8px 24px ${COLORS.accent}33`,
                            "&:hover": { background: `linear-gradient(90deg, ${COLORS.accentHover}, #004a9e)`, transform: "translateY(-1px)" },
                            transition: "all 0.2s",
                        }}
                    >
                        {loading ? "Creando cuenta..." : "Crear cuenta"}
                    </Button>
                </Grid>
            </Grid>

            <Divider sx={{ borderColor: COLORS.border, my: 3 }} />
            <Box sx={{ textAlign: "center" }}>
                <Typography sx={{ color: COLORS.muted, fontSize: "0.85rem" }}>
                    ¿Ya tienes cuenta?{" "}
                    <Box component="span" onClick={onSwitch}
                        sx={{ color: COLORS.accent, fontWeight: 700, cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                    >
                        Inicia sesión
                    </Box>
                </Typography>
            </Box>
        </Box>
    );
};

// ══════════════════════════════════════════════════════════
//  PERFIL (usuario autenticado)
// ══════════════════════════════════════════════════════════
const ProfileView = ({ user, onLogout }) => {
    const [editMode, setEditMode] = useState(false);
    const [saving,   setSaving]   = useState(false);
    const [snack,    setSnack]    = useState({ open: false, msg: "", type: "success" });
    const [profile,  setProfile]  = useState(user);
    const [draft,    setDraft]    = useState(user);
    const [profileErrors, setProfileErrors] = useState({});

    const [changingPass, setChangingPass] = useState(false);
    const [showPass, setShowPass] = useState({ actual: false, nueva: false, confirm: false });
    const [passForm, setPassForm] = useState({ passwordActual: "", passwordNueva: "", passwordConfirm: "" });
    const [passErrors, setPassErrors] = useState({});
    const strength = passwordStrength(passForm.passwordNueva);

    const showSnack = (msg, type = "success") => setSnack({ open: true, msg, type });

    const handleDraftChange = (field) => (e) => {
        const val = e.target.value;
        setDraft((p) => ({ ...p, [field]: val }));
        setProfileErrors((p) => ({ ...p, [field]: validate[field] ? validate[field](val) : "" }));
    };

    const handleSaveProfile = async () => {
        const errs = {
            nombre:   validate.nombre(draft.nombre || ""),
            apellido: validate.apellido(draft.apellido || ""),
            email:    validate.email(draft.email),
            telefono: validate.telefono(draft.telefono || ""),
        };
        setProfileErrors(errs);
        if (Object.values(errs).some(Boolean)) return;
        setSaving(true);
        await new Promise((r) => setTimeout(r, 1200));
        setProfile(draft);
        setEditMode(false);
        setSaving(false);
        showSnack("Perfil actualizado correctamente ✓");
    };

    const handlePassChange = (field) => (e) => {
        const val = e.target.value;
        setPassForm((p) => ({ ...p, [field]: val }));
        if (field === "passwordNueva") {
            setPassErrors((p) => ({
                ...p,
                passwordNueva:   validate.passwordNueva(val),
                passwordConfirm: validate.passwordConfirm(passForm.passwordConfirm, val),
            }));
        } else if (field === "passwordConfirm") {
            setPassErrors((p) => ({ ...p, passwordConfirm: validate.passwordConfirm(val, passForm.passwordNueva) }));
        } else {
            setPassErrors((p) => ({ ...p, [field]: validate[field](val) }));
        }
    };

    const handleSavePassword = async () => {
        const errs = {
            passwordActual:  validate.passwordActual(passForm.passwordActual),
            passwordNueva:   validate.passwordNueva(passForm.passwordNueva) || (!passForm.passwordNueva ? "Ingresa la nueva contraseña" : ""),
            passwordConfirm: validate.passwordConfirm(passForm.passwordConfirm, passForm.passwordNueva) || (!passForm.passwordConfirm ? "Confirma la contraseña" : ""),
        };
        setPassErrors(errs);
        if (Object.values(errs).some(Boolean)) return;
        setSaving(true);
        await new Promise((r) => setTimeout(r, 1200));
        setPassForm({ passwordActual: "", passwordNueva: "", passwordConfirm: "" });
        setPassErrors({});
        setChangingPass(false);
        setSaving(false);
        showSnack("Contraseña actualizada correctamente ✓");
    };

    const Section = ({ title, subtitle, children }) => (
        <Box sx={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: "16px", p: { xs: 2.5, md: 3.5 }, mb: 3 }}>
            <Box sx={{ mb: 2 }}>
                <Typography sx={{ color: COLORS.white, fontWeight: 700, fontSize: "1rem" }}>{title}</Typography>
                {subtitle && <Typography sx={{ color: COLORS.muted, fontSize: "0.82rem", mt: 0.3 }}>{subtitle}</Typography>}
            </Box>
            <Divider sx={{ borderColor: COLORS.border, mb: 3 }} />
            {children}
        </Box>
    );

    return (
        <>
            {/* Avatar card */}
            <Box sx={{
                display: "flex", flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "center", sm: "flex-start" },
                gap: 3, mb: 3,
                background: COLORS.surface, border: `1px solid ${COLORS.border}`,
                borderRadius: "16px", p: { xs: 2.5, md: 3.5 },
            }}>
                <Box sx={{ position: "relative", flexShrink: 0 }}>
                    <Avatar sx={{
                        width: 88, height: 88,
                        background: `linear-gradient(135deg, ${COLORS.accent}, #00aaff)`,
                        fontSize: "1.8rem", fontWeight: 900,
                        boxShadow: `0 0 24px ${COLORS.accent}44`,
                    }}>
                        {(profile.nombre?.[0] || "?").toUpperCase()}
                        {(profile.apellido?.[0] || "").toUpperCase()}
                    </Avatar>
                    <IconButton size="small" sx={{
                        position: "absolute", bottom: 0, right: 0,
                        background: COLORS.accent, color: "white", width: 26, height: 26,
                        "&:hover": { background: COLORS.accentHover },
                    }}>
                        <CameraAltIcon sx={{ fontSize: 13 }} />
                    </IconButton>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography sx={{ color: COLORS.white, fontWeight: 800, fontSize: "1.25rem" }}>
                        {profile.nombre} {profile.apellido}
                    </Typography>
                    <Typography sx={{ color: COLORS.muted, fontSize: "0.88rem", mb: 1.5 }}>
                        {profile.email}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <Chip
                            icon={<CheckCircleIcon sx={{ fontSize: "14px !important", color: `${COLORS.green} !important` }} />}
                            label="Cuenta verificada"
                            size="small"
                            sx={{
                                background: `${COLORS.green}18`, color: COLORS.green,
                                border: `1px solid ${COLORS.green}44`,
                                fontWeight: 600, fontSize: "0.72rem", "& .MuiChip-icon": { ml: 0.5 },
                            }}
                        />
                    </Box>
                </Box>
                <Button
                    variant="outlined"
                    startIcon={<LogoutIcon fontSize="small" />}
                    onClick={onLogout}
                    sx={{
                        borderColor: COLORS.border, color: COLORS.muted,
                        textTransform: "none", borderRadius: "9px", fontWeight: 600,
                        alignSelf: { xs: "stretch", sm: "flex-start" },
                        "&:hover": { borderColor: COLORS.red, color: COLORS.red },
                    }}
                >
                    Cerrar sesión
                </Button>
            </Box>

            {/* Info personal */}
            <Section title="Información personal" subtitle="Actualiza tus datos de perfil">
                <Grid container spacing={2.5}>
                    {[
                        { field: "nombre",   label: "Nombre",               icon: <BadgeIcon fontSize="small" /> },
                        { field: "apellido", label: "Apellido",             icon: <BadgeIcon fontSize="small" /> },
                        { field: "email",    label: "Correo electrónico",   icon: <EmailIcon fontSize="small" /> },
                        { field: "telefono", label: "Teléfono",             icon: <PhoneIcon fontSize="small" /> },
                    ].map(({ field, label, icon }) => (
                        <Grid size={{ xs: 12, sm: 6 }} key={field}>
                            <TextField
                                fullWidth label={label}
                                value={editMode ? (draft[field] || "") : (profile[field] || "")}
                                onChange={handleDraftChange(field)}
                                disabled={!editMode}
                                error={!!profileErrors[field]}
                                helperText={profileErrors[field]}
                                sx={fieldSx(!!profileErrors[field])}
                                InputProps={{ startAdornment: <InputAdornment position="start">{icon}</InputAdornment> }}
                            />
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ display: "flex", gap: 1.5, mt: 3, justifyContent: "flex-end" }}>
                    {!editMode ? (
                        <Button variant="outlined" startIcon={<EditIcon fontSize="small" />}
                            onClick={() => { setDraft(profile); setEditMode(true); }}
                            sx={{ borderColor: COLORS.border, color: COLORS.white, textTransform: "none", borderRadius: "9px", fontWeight: 600, "&:hover": { borderColor: COLORS.accent, color: COLORS.accent, background: `${COLORS.accent}11` } }}
                        >
                            Editar perfil
                        </Button>
                    ) : (
                        <>
                            <Button variant="outlined" startIcon={<CancelIcon fontSize="small" />}
                                onClick={() => { setDraft(profile); setProfileErrors({}); setEditMode(false); }}
                                disabled={saving}
                                sx={{ borderColor: COLORS.border, color: COLORS.muted, textTransform: "none", borderRadius: "9px", fontWeight: 600, "&:hover": { borderColor: COLORS.red, color: COLORS.red } }}
                            >
                                Cancelar
                            </Button>
                            <Button variant="contained"
                                startIcon={saving ? <CircularProgress size={16} color="inherit" /> : <SaveIcon fontSize="small" />}
                                onClick={handleSaveProfile} disabled={saving}
                                sx={{ background: `linear-gradient(90deg, ${COLORS.accent}, #005bb5)`, color: "white", textTransform: "none", borderRadius: "9px", fontWeight: 700, "&:hover": { background: `linear-gradient(90deg, ${COLORS.accentHover}, #004a9e)` } }}
                            >
                                {saving ? "Guardando..." : "Guardar cambios"}
                            </Button>
                        </>
                    )}
                </Box>
            </Section>

            {/* Seguridad */}
            <Section title="Seguridad" subtitle="Cambia tu contraseña de acceso">
                {!changingPass ? (
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Box sx={{ width: 40, height: 40, borderRadius: "10px", background: `${COLORS.accent}18`, border: `1px solid ${COLORS.accent}33`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <LockIcon sx={{ color: COLORS.accent, fontSize: 20 }} />
                            </Box>
                            <Box>
                                <Typography sx={{ color: COLORS.white, fontWeight: 600, fontSize: "0.9rem" }}>Contraseña</Typography>
                                <Typography sx={{ color: COLORS.muted, fontSize: "0.78rem" }}>Última actualización: hace 30 días</Typography>
                            </Box>
                        </Box>
                        <Button variant="outlined" startIcon={<EditIcon fontSize="small" />}
                            onClick={() => setChangingPass(true)}
                            sx={{ borderColor: COLORS.border, color: COLORS.white, textTransform: "none", borderRadius: "9px", fontWeight: 600, "&:hover": { borderColor: COLORS.accent, color: COLORS.accent, background: `${COLORS.accent}11` } }}
                        >
                            Cambiar contraseña
                        </Button>
                    </Box>
                ) : (
                    <Grid container spacing={2.5}>
                        <Grid size={{ xs: 12 }}>
                            <TextField fullWidth label="Contraseña actual"
                                type={showPass.actual ? "text" : "password"}
                                value={passForm.passwordActual} onChange={handlePassChange("passwordActual")}
                                error={!!passErrors.passwordActual} helperText={passErrors.passwordActual}
                                sx={fieldSx(!!passErrors.passwordActual)}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><LockIcon fontSize="small" /></InputAdornment>,
                                    endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPass((p) => ({ ...p, actual: !p.actual }))} edge="end" sx={{ color: COLORS.muted }}>{showPass.actual ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}</IconButton></InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField fullWidth label="Nueva contraseña"
                                type={showPass.nueva ? "text" : "password"}
                                value={passForm.passwordNueva} onChange={handlePassChange("passwordNueva")}
                                error={!!passErrors.passwordNueva} helperText={passErrors.passwordNueva}
                                sx={fieldSx(!!passErrors.passwordNueva)}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><LockIcon fontSize="small" /></InputAdornment>,
                                    endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPass((p) => ({ ...p, nueva: !p.nueva }))} edge="end" sx={{ color: COLORS.muted }}>{showPass.nueva ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}</IconButton></InputAdornment>,
                                }}
                            />
                            {passForm.passwordNueva && (
                                <Box sx={{ mt: 1 }}>
                                    <Box sx={{ display: "flex", gap: 0.5, mb: 0.4 }}>
                                        {[1,2,3,4,5].map((i) => (
                                            <Box key={i} sx={{ flex: 1, height: 4, borderRadius: 2, background: i <= strength.level ? strength.color : COLORS.border, transition: "background 0.3s" }} />
                                        ))}
                                    </Box>
                                    <Typography sx={{ color: strength.color, fontSize: "0.7rem", fontWeight: 600 }}>{strength.label}</Typography>
                                </Box>
                            )}
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField fullWidth label="Confirmar contraseña"
                                type={showPass.confirm ? "text" : "password"}
                                value={passForm.passwordConfirm} onChange={handlePassChange("passwordConfirm")}
                                error={!!passErrors.passwordConfirm} helperText={passErrors.passwordConfirm}
                                sx={fieldSx(!!passErrors.passwordConfirm)}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><LockIcon fontSize="small" /></InputAdornment>,
                                    endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPass((p) => ({ ...p, confirm: !p.confirm }))} edge="end" sx={{ color: COLORS.muted }}>{showPass.confirm ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}</IconButton></InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Box sx={{ display: "flex", gap: 1.5, justifyContent: "flex-end" }}>
                                <Button variant="outlined" startIcon={<CancelIcon fontSize="small" />}
                                    onClick={() => { setPassForm({ passwordActual: "", passwordNueva: "", passwordConfirm: "" }); setPassErrors({}); setChangingPass(false); }}
                                    disabled={saving}
                                    sx={{ borderColor: COLORS.border, color: COLORS.muted, textTransform: "none", borderRadius: "9px", fontWeight: 600, "&:hover": { borderColor: COLORS.red, color: COLORS.red } }}
                                >
                                    Cancelar
                                </Button>
                                <Button variant="contained"
                                    startIcon={saving ? <CircularProgress size={16} color="inherit" /> : <SaveIcon fontSize="small" />}
                                    onClick={handleSavePassword} disabled={saving}
                                    sx={{ background: `linear-gradient(90deg, ${COLORS.accent}, #005bb5)`, color: "white", textTransform: "none", borderRadius: "9px", fontWeight: 700, "&:hover": { background: `linear-gradient(90deg, ${COLORS.accentHover}, #004a9e)` } }}
                                >
                                    {saving ? "Guardando..." : "Actualizar contraseña"}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                )}
            </Section>

            <Snackbar open={snack.open} autoHideDuration={3000}
                onClose={() => setSnack((s) => ({ ...s, open: false }))}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert severity={snack.type} onClose={() => setSnack((s) => ({ ...s, open: false }))}
                    sx={{ background: COLORS.surface, color: COLORS.white, border: `1px solid ${COLORS.border}`, "& .MuiAlert-icon": { color: COLORS.green } }}
                >
                    {snack.msg}
                </Alert>
            </Snackbar>
        </>
    );
};

// ══════════════════════════════════════════════════════════
//  COMPONENTE PRINCIPAL
// ══════════════════════════════════════════════════════════
export const MyAccount = () => {
    const [tab,  setTab]  = useState(0);      // 0 = login, 1 = register
    const [user, setUser] = useState(null);   // null = no autenticado
    const [snack, setSnack] = useState({ open: false, msg: "" });

    const handleLogin = (userData) => {
        setUser(userData);
        setSnack({ open: true, msg: `¡Bienvenido de vuelta, ${userData.nombre}!` });
    };

    const handleRegister = (userData) => {
        setUser(userData);
        setSnack({ open: true, msg: `¡Cuenta creada! Bienvenido, ${userData.nombre}!` });
    };

    const handleLogout = () => {
        setUser(null);
        setTab(0);
        setSnack({ open: true, msg: "Sesión cerrada correctamente" });
    };

    return (
        <Box sx={{ background: COLORS.black, minHeight: "100vh", pb: 10 }}>

            {/* Encabezado */}
            <Box sx={{
                background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${COLORS.accent}18 0%, transparent 70%),
                             linear-gradient(180deg, #0a0f1e 0%, ${COLORS.black} 100%)`,
                pt: { xs: 6, md: 8 }, pb: { xs: 4, md: 6 },
                textAlign: "center",
            }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5, mb: 1 }}>
                    <PersonIcon sx={{ color: COLORS.accent, fontSize: 24 }} />
                    <Typography sx={{ color: COLORS.accent, fontWeight: 700, fontSize: "0.78rem", letterSpacing: "2.5px", textTransform: "uppercase" }}>
                        {user ? "Perfil" : "Acceso"}
                    </Typography>
                </Box>
                <Typography variant="h3" sx={{
                    fontWeight: 900, color: COLORS.white,
                    fontSize: { xs: "1.8rem", md: "2.6rem" },
                    letterSpacing: "-1px",
                }}>
                    Mi Cuenta
                </Typography>
            </Box>

            <Container maxWidth={user ? "md" : "sm"}>

                {/* ── Sin sesión: tabs Login / Register ── */}
                {!user && (
                    <>
                        <Box sx={{
                            background: COLORS.surface,
                            border: `1px solid ${COLORS.border}`,
                            borderRadius: "12px", mb: 2.5, overflow: "hidden",
                        }}>
                            <Tabs
                                value={tab}
                                onChange={(_, v) => setTab(v)}
                                variant="fullWidth"
                                sx={{
                                    "& .MuiTab-root": {
                                        color: COLORS.muted, textTransform: "none",
                                        fontWeight: 600, fontSize: "0.9rem", py: 1.8,
                                    },
                                    "& .Mui-selected": { color: `${COLORS.white} !important` },
                                    "& .MuiTabs-indicator": { background: COLORS.accent, height: 3 },
                                }}
                            >
                                <Tab label="Iniciar sesión" icon={<LoginIcon fontSize="small" />} iconPosition="start" />
                                <Tab label="Crear cuenta"   icon={<AppRegistrationIcon fontSize="small" />} iconPosition="start" />
                            </Tabs>
                        </Box>

                        {tab === 0
                            ? <LoginForm   onLogin={handleLogin}      onSwitch={() => setTab(1)} />
                            : <RegisterForm onRegister={handleRegister} onSwitch={() => setTab(0)} />
                        }
                    </>
                )}

                {/* ── Con sesión: perfil ── */}
                {user && <ProfileView user={user} onLogout={handleLogout} />}
            </Container>

            <Snackbar open={snack.open} autoHideDuration={3000}
                onClose={() => setSnack((s) => ({ ...s, open: false }))}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert severity="success" onClose={() => setSnack((s) => ({ ...s, open: false }))}
                    sx={{ background: COLORS.surface, color: COLORS.white, border: `1px solid ${COLORS.border}`, "& .MuiAlert-icon": { color: COLORS.green } }}
                >
                    {snack.msg}
                </Alert>
            </Snackbar>
        </Box>
    );
};