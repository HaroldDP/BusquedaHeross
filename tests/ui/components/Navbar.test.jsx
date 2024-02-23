import { fireEvent, render, screen, } from "@testing-library/react";
import { AuthContext } from "../../../src/auth";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { Navbar } from "../../../src/ui";

const mockedUseNavigate = jest.fn();

jest.mock ('react-router-dom', () => ({
    // estamos diciendo que solamente queremos  aun un mock del useNavigate
    ...jest.requireActual('react-router-dom'),
    // no varegresar  propiamente la funcion navigate sino el MockedUseNavigate
    useNavigate: () => mockedUseNavigate,

}));

describe('Pruebas en <Navbar/>', () => { 

    const contextValue = {
        logged: true,
        user:{
            name: 'Juan carlos'
        },
        // cuando tenemos llemar algo tenemos que hacer un jest.fn()
        logout: jest.fn()
    }

        // si recomienda  hacer un BeforeEach cuando hacemos un muckup para Limpiarlo y  las pruebas y nos salga como son.
        beforeEach(() => jest.clearAllMocks());


    test('Debe mostrar el nombre del usuario logueado', () => { 

        render(

            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar/>
                </MemoryRouter>
            </AuthContext.Provider>

        );

        expect(screen.getByText('Juan carlos')).toBeTruthy();

    });

    test('Debe de llamar el logout y navigate  cuando se hace click en el boton ', () => { 
       
        render(

            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar/>
                </MemoryRouter>
            </AuthContext.Provider>

        );

        const logoutBtn = screen.getByRole('button');
        fireEvent.click(logoutBtn);

        expect(contextValue.logout).toHaveBeenCalled()
        expect(mockedUseNavigate).toHaveBeenCalledWith("/login", {"replace": true})
    })
});