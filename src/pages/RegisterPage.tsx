import { useState } from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export const userRegisterScheme = z.object({
    email: z.string().email({ message: 'El correo no es válido' }),
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    fullname: z.string().min(1, { message: "El nombre es requerido" }),
    phone: z.string().optional(),
})

export type UserRegisterFormValue = z.infer<typeof userRegisterScheme>

export const RegisterPage = () => {
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordTouched, setPasswordTouched] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<UserRegisterFormValue>({
        defaultValues: {
            fullname: "",
            email: "",
            password: "",
            phone: "",
        },
        resolver: zodResolver(userRegisterScheme),
    })

    const password = watch("password")
    const passwordsMatch = password === confirmPassword

    const onSubmit = handleSubmit((data) => {
        console.log(data)
    })

    return (
        <div className='h-full flex flex-col items-center mt-12 gap-5'>
            <h1 className='text-4xl font-bold capitalize'>Regístrate</h1>
            <p className='text-sm font-medium'>Por favor, rellene los siguientes campos:</p>

            <form
                className="flex flex-col items-center gap-4 w-full mt-10 sm:w-[400px] lg:w-[500px]"
                onSubmit={onSubmit}
            >
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input
                        type="text"
                        id="name"
                        placeholder="Ingrese su nombre completo"
                        {...register("fullname")}
                    />
                    {errors.fullname && (
                        <p className="text-red-500 text-sm">{errors.fullname.message}</p>
                    )}
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                        type="text"
                        id="phone"
                        placeholder="Ingrese su teléfono"
                        {...register("phone")}
                    />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        placeholder="Ingrese su correo"
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                        type="password"
                        id="password"
                        placeholder="Ingrese su contraseña"
                        {...register("password")}
                        onBlur={() => setPasswordTouched(true)}
                    />
                    {errors.password ? (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    ) : (
                        <p className="text-gray-500 text-sm">La contraseña debe tener al menos 6 caracteres.</p>
                    )}
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                    <Input
                        type="password"
                        id="confirmPassword"
                        placeholder="Repita la contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {passwordTouched && confirmPassword && !passwordsMatch && (
                        <p className="text-red-500 text-sm">Las contraseñas no coinciden</p>
                    )}
                </div>

                <Button
                    variant="secondary"
                    className="cursor-pointer"
                >
                    Registrarse
                </Button>
            </form>

            <p>¿Ya tienes una cuenta?
                <Link to="/login" className="text-pink-500 hover:underline"> Inicia sesión </Link>
            </p>
        </div>
    )
}
