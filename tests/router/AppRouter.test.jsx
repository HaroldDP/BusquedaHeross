import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../src/auth";
import { MemoryRouter } from "react-router-dom";
import { AppRouter } from "../../src/router/AppRouter";

describe('Pruebas en <AppRouter />', () => { 

    test('Debe mostrar el login si no esta autenticado', () => { 

        const contextValue = {
            logged:false,
        }

        render (
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
            
        );
        expect(screen.getAllByText('Login').length).toBe(2)

     });

     test('Debe de mostrar el componente de Marvel si esta autenticado', () => {  

        const contextValue = {
            logged:true,
            user:{

                id: 'ABC',
                name: 'Juan Carlos'

            }
        }

        render (
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
            
        );
        // Indicar que es  si es mayor o igual a ese numero que estamos viendo
        expect(screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1);

    });

});