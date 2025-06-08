import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/dashboard';
import { useUser } from '../hooks';
import { useEffect, useState } from 'react';
import { getSession, getUserRole } from '../actions';
import { Loader } from '../components/shared/Loader';
import { supabase } from '../supabase/client';

export const DashboardLayout = () => {
    const navigate = useNavigate();
    const { isLoading } = useUser();
    const [roleLoading, setRoleLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAuthAndRole = async () => {
            try {
                // 1. Verificar sesión primero
                const currentSession = await getSession();
                if (!currentSession) {
                    navigate('/login', { replace: true });
                    return;
                }

                // 2. Verificar rol
                const role = await getUserRole(currentSession.session?.user.id as string);
                if (role !== 'admin') {
                    navigate('/', { replace: true });
                    return;
                }

                setIsAdmin(true);
            } catch (error) {
                console.error('Error verifying session or role:', error);
                navigate('/login', { replace: true });
            } finally {
                setRoleLoading(false);
            }
        };

        checkAuthAndRole();

        // Suscripción a cambios de autenticación
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_OUT' || !session) {
                navigate('/login', { replace: true });
            }
        });

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, [navigate]);

    // Mostrar loader mientras se verifican credenciales
    if (isLoading || roleLoading || !isAdmin) {
        return <Loader />;
    }

    return (
        <div className='flex bg-gray-100 min-h-screen font-montserrat'>
            <Sidebar />
            <main className='container m-5 mt-7 flex-1 text-slate-800 ml-[140px] lg:ml-[270px]'>
                <Outlet />
            </main>
        </div>
    );
};