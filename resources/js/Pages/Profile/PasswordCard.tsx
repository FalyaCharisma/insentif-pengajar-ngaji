import { useMemo, useState } from "react";
import { useForm } from "@inertiajs/react";

import CardSection from "@/Components/CardSection";
import FormInput from "@/Components/forms/FormInput";
import {
    Eye,
    EyeOff,
    ShieldCheck,
    CheckCircle2,
    XCircle,
} from "lucide-react";

export default function PasswordCard() {
    const passwordForm = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const [showCurrent, setShowCurrent] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        passwordForm.patch(route("profile.password"), {
            preserveScroll: true,
            onSuccess: () => {
                passwordForm.reset();
            },
        });
    };

    const isConfirmationFilled =
            passwordForm.data.password_confirmation.length > 0;

    const isPasswordMatch =
        passwordForm.data.password ===
        passwordForm.data.password_confirmation;

    const password = passwordForm.data.password;

    const checks = useMemo(
        () => ({
            length: password.length >= 8,
            upper: /[A-Z]/.test(password),
            lower: /[a-z]/.test(password),
            number: /\d/.test(password),
            symbol: /[^A-Za-z0-9]/.test(password),
        }),
        [password]
    );

    const score = Object.values(checks).filter(Boolean).length;

    const strength =
        score <= 2 ? "Lemah" : score <= 4 ? "Sedang" : "Kuat";

    const progressColor =
        score <= 2
            ? "bg-red-500"
            : score <= 4
            ? "bg-yellow-500"
            : "bg-green-500";

    return (
        <CardSection
            title="Keamanan Akun"
            subtitle="Ubah password akun untuk menjaga keamanan."
        >
            <form onSubmit={submit} className="space-y-5">
                <div className="relative">
                    <FormInput
                        label="Password Saat Ini"
                        type={showCurrent ? "text" : "password"}
                        value={passwordForm.data.current_password}
                        onChange={(e) =>
                            passwordForm.setData(
                                "current_password",
                                e.target.value
                            )
                        }
                        error={passwordForm.errors.current_password}
                        required
                    />

                    <button
                        type="button"
                        onClick={() => setShowCurrent(!showCurrent)}
                        className="absolute right-4 top-[42px] text-slate-500"
                    >
                        {showCurrent ? (
                            <EyeOff size={18} />
                        ) : (
                            <Eye size={18} />
                        )}
                    </button>
                </div>

                <div className="relative">
                    <FormInput
                        label="Password Baru"
                        type={showPassword ? "text" : "password"}
                        value={passwordForm.data.password}
                        onChange={(e) =>
                            passwordForm.setData(
                                "password",
                                e.target.value
                            )
                        }
                        error={passwordForm.errors.password}
                        required
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-[42px] text-slate-500"
                    >
                        {showPassword ? (
                            <EyeOff size={18} />
                        ) : (
                            <Eye size={18} />
                        )}
                    </button>
                </div>

                <div className="space-y-2 rounded-xl bg-slate-50 p-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                            Kekuatan Password
                        </span>

                        <span
                            className={`text-sm font-semibold ${
                                score <= 2
                                    ? "text-red-600"
                                    : score <= 4
                                    ? "text-yellow-600"
                                    : "text-green-600"
                            }`}
                        >
                            {strength}
                        </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                        <div
                            className={`h-full rounded-full transition-all duration-300 ${progressColor}`}
                            style={{
                                width: `${score * 20}%`,
                            }}
                        />
                    </div>

                    <div className="grid gap-2 pt-2 text-sm">
                        <Requirement
                            valid={checks.length}
                            text="Minimal 8 karakter"
                        />

                        <Requirement
                            valid={checks.upper}
                            text="Mengandung huruf besar"
                        />

                        <Requirement
                            valid={checks.lower}
                            text="Mengandung huruf kecil"
                        />

                        <Requirement
                            valid={checks.number}
                            text="Mengandung angka"
                        />

                        <Requirement
                            valid={checks.symbol}
                            text="Mengandung simbol"
                        />
                    </div>
                </div>

                <div className="relative">
                    
                    <FormInput
                        label="Konfirmasi Password Baru"
                        type={showConfirmation ? "text" : "password"}
                        value={passwordForm.data.password_confirmation}
                        onChange={(e) =>
                            passwordForm.setData(
                                "password_confirmation",
                                e.target.value
                            )
                        }
                        error={passwordForm.errors.password_confirmation}
                        required
                    />

                    {isConfirmationFilled && (
                        <div className="flex items-center gap-2 text-sm">
                            {isPasswordMatch ? (
                                <>
                                    <CheckCircle2
                                        size={18}
                                        className="text-green-600"
                                    />
                                    <span className="text-green-600">
                                        Password sesuai
                                    </span>
                                </>
                            ) : (
                                <>
                                    <XCircle
                                        size={18}
                                        className="text-red-600"
                                    />
                                    <span className="text-red-600">
                                        Password tidak sesuai
                                    </span>
                                </>
                            )}
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={() =>
                            setShowConfirmation(!showConfirmation)
                        }
                        className="absolute right-4 top-[42px] text-slate-500"
                    >
                        {showConfirmation ? (
                            <EyeOff size={18} />
                        ) : (
                            <Eye size={18} />
                        )}
                    </button>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={
                            passwordForm.processing ||
                            !isPasswordMatch ||
                            !isConfirmationFilled
                        }
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            bg-indigo-600
                            px-5
                            py-2.5
                            text-sm
                            font-medium
                            text-white
                            transition
                            hover:bg-indigo-700
                            disabled:opacity-50
                        "
                    >
                        <ShieldCheck size={18} />

                        {passwordForm.processing
                            ? "Menyimpan..."
                            : "Ubah Password"}
                    </button>
                </div>
            </form>
        </CardSection>
    );
}

type RequirementProps = {
    valid: boolean;
    text: string;
};

function Requirement({
    valid,
    text,
}: RequirementProps) {
    return (
        <div className="flex items-center gap-2">
            {valid ? (
                <CheckCircle2
                    size={18}
                    className="text-green-600"
                />
            ) : (
                <XCircle
                    size={18}
                    className="text-slate-400"
                />
            )}

            <span
                className={
                    valid
                        ? "text-green-700"
                        : "text-slate-500"
                }
            >
                {text}
            </span>
        </div>
    );
}