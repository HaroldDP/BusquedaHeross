import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

// mocked del Navigate
const mockedUseNavigate = jest.fn();

// Crear un mock de la libreria para extraer parte del react-router-dom

jest.mock ('react-router-dom', () => ({
    // estamos diciendo que solamente queremos  aun un mock del useNavigate
    ...jest.requireActual('react-router-dom'),
    // no varegresar  propiamente la funcion navigate sino el MockedUseNavigate
    useNavigate: () => mockedUseNavigate,

}));


describe('Pruebas en <SearchPage/>', () => { 
    // Lo hacemos antes de los test  para limpiar de cualquier mock que halla
    beforeEach (() => jest.clearAllMocks());

     test('Debe de mostrarse correctamente con los valores por defecto', () => { 

        const { container }= render(

            <MemoryRouter>
                    <SearchPage/>
            </MemoryRouter>
        );
        expect (container).toMatchSnapshot();
        
    });


    test('Debe de mostrar a Batman y el input con el valor del queryString', () => { 

         render(
            // El initialEntries nos informa en donde estamos parados
            <MemoryRouter initialEntries={['/search?q=batman']}>
                    <SearchPage/>
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        expect (input.value).toBe('batman');

        const img = screen.getByRole('img');
        expect(img.src).toContain('assets/heroes/dc-batman.jpg');
        
        // Cuando tenemos varios div y lo queremos diferenciar dbemos utilizar un aria-label
        const alert = screen.getByLabelText('alert-danger');
        // console.log(alert.style.display)
        expect(alert.style.display).toBe('none');
        
    });

    test('Debe mostrar un error si no se encuentra el hero', () => {

        render(
            // El initialEntries nos informa en donde estamos parados
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                    <SearchPage/>
            </MemoryRouter>
        );

         // Cuando tenemos varios div y lo queremos diferenciar dbemos utilizar un aria-label
         const alert = screen.getByLabelText('alert-danger');
         // console.log(alert.style.display)
         expect(alert.style.display).toBe('');

    });

    test('Debe de llamar el navigate  a la pantalla nueva', () => {
        
        const inputValue = 'superman';

        render(
            // El initialEntries nos informa en donde estamos parados
            <MemoryRouter initialEntries={['/search']}>
                    <SearchPage/>
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        //fireEvent.change utilizado cuando se  desea verificar el ingreso un valor en una caja de texto
        fireEvent.change(input, {target: {name: 'searchText',  value: inputValue}})

        // Se crea un area-label para llamar el formulario
        const form = screen.getByRole('form');
        // Siempre utilizamos un submit para disparar el evento
        fireEvent.submit(form);

        expect( mockedUseNavigate ).toHaveBeenCalledWith(`?q=${inputValue}`)




    });



});