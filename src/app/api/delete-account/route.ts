import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        // 1. Validar que vengan los enviroment variables necesarios
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseServiceKey) {
            return NextResponse.json(
                { error: 'Server configuration missing: Supabase URL or Service Role Key' },
                { status: 500 }
            );
        }

        // 2. Extraer el token de acceso de la propia app móvil/web del header
        const authHeader = req.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { error: 'Missing or invalid Authorization header' },
                { status: 401 }
            );
        }

        const token = authHeader.replace('Bearer ', '');

        // 3. Crear el cliente de Supabase usando el Service Role de Admin para poder verficar y borrar
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        });

        // 4. Asegurarnos que el token pertenece a un usuario válido antes de hacer algo
        const {
            data: { user },
            error: userError,
        } = await supabaseAdmin.auth.getUser(token);

        if (userError || !user) {
            return NextResponse.json(
                { error: 'Invalid token or user does not exist' },
                { status: 401 }
            );
        }

        // 5. Eliminar la cuenta del usuario definitivamente (utilizando la API Admin)
        const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(user.id);

        if (deleteError) {
            console.error('Error deleting user:', deleteError.message);
            return NextResponse.json(
                { error: 'Failed to delete the user account from Supabase.' },
                { status: 500 }
            );
        }

        // 6. Retornar caso exitoso
        return NextResponse.json(
            { success: true, message: 'La cuenta y registros han sido eliminados permanentemente.' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Unexpected error in delete-account API:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
