
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Link } from "react-router-dom"

export const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPasssword] = useState('')
    return (
        <div className='h-full flex flex-col items-center mt-12 gap-5'>
            <h1 className='text-4xl font-bold capitalize'>
                Iniciar sesión
            </h1>
            <>
                <form className="flex flex-col items-center gap-4 w-full mt-10 sm:w-[400px] lg:wll-[500px]">

                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" placeholder="Ingrese su correo"
                            value={email} onChange={(e) => setEmail(e.target.value)} />

                    </div>

                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input type="password" id="password" placeholder="Ingrese su contraseña"
                            value={password} onChange={(e) => setPasssword(e.target.value)} />
                    </div>

                    <Button variant="secondary" className="cursor-pointer">Iniciar sesión</Button>
                </form>
                <p>¿No tienes una cuenta?
                <Link to="/register" className="text-pink-500 hover:underline"> Regístrate</Link>
                </p>
              
            </>
        </div>
    )
}
