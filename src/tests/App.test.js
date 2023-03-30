import React from 'react';
import { render, screen, fireEvent, getByTestId } from '@testing-library/react';
import App from '../App';
import fetchApi from '../services/fetchApi';
import mockFetchApi, { mockData } from './mockData';
import { act } from 'react-dom/test-utils';

describe('Desenvolva testes para atingir 30% de cobertura total da aplicação', () => {


  jest.mock('../services/fetchApi');

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData)
      })
    );
  })


  test('Verifica se o input de filtrar por texto é renderizado na tela', () => {
    render(<App />);
    const textFilterInput = screen.getByPlaceholderText('Filtrar por nome');
    expect(textFilterInput).toBeInTheDocument();
  });
  test('Verifica se o input de filtrar por coluna é renderizado na tela', () => {
    render(<App />);
    const columnFilterInput = screen.getByTestId('column-filter');
    expect(columnFilterInput).toBeInTheDocument();
  });
  test('Verifica se o input de comparação  é renderizado na tela', () => {
    render(<App />);
    const comparisonFilterInput = screen.getByTestId('comparison-filter');
    expect(comparisonFilterInput).toBeInTheDocument();
  });
  test('Verifica se o input de valor é renderizado na tela', () => {
    render(<App />);
    const valueFilterInput = screen.getByTestId('value-filter');
    expect(valueFilterInput).toBeInTheDocument();
  });
  test('Verifica se o input de valor é renderizado na tela', () => {
    render(<App />);
    const valueFilterInput = screen.getByTestId('value-filter');
    expect(valueFilterInput).toBeInTheDocument();
  });
  test('Verifica se o botão de aplicar filtro é renderizado na tela', () => {
    render(<App />);
    const applyfilterBtn = screen.getByRole('button', { name: 'Aplicar filtro' });
    expect(applyfilterBtn).toBeInTheDocument();
  });
  test('Verifica se uma table é renderizada na tela', () => {
    render(<App />);
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });
  test('função é chamada ao alterar valor do input de filtrar por texto', () => {
    render(<App />)
    const textFilterInput = screen.getByPlaceholderText('Filtrar por nome');
    fireEvent.change(textFilterInput, { target: { value: 'Novo valor' } });
    expect(textFilterInput.value).toBe('Novo valor');
  });
  test('função é chamada ao alterar valor do input de filtrar por coluna', () => {
    render(<App />)
    const columnFilterInput = screen.getByTestId('column-filter');
    fireEvent.change(columnFilterInput, { target: { value: 'diameter' } });
    expect(columnFilterInput.value).toBe('diameter');
  });
  test('função é chamada ao alterar valor do input de filtrar por coluna', () => {
    render(<App />)
    const columnFilterInput = screen.getByTestId('column-filter');
    fireEvent.change(columnFilterInput, { target: { value: 'diameter' } });
    expect(columnFilterInput.value).toBe('diameter');
  });
  test('função é chamada ao alterar valor do input de comparação', () => {
    render(<App />)
    const comparisonFilterInput = screen.getByTestId('comparison-filter');
    fireEvent.change(comparisonFilterInput, { target: { value: 'igual a' } });
    expect(comparisonFilterInput.value).toBe('igual a');
  });
  test('função é chamada ao alterar valor do input de valor', () => {
    render(<App />)
    const valueFilterInput = screen.getByTestId('value-filter');
    fireEvent.change(valueFilterInput, { target: { value: '40' } });
    expect(valueFilterInput.value).toBe('40');
  });
  test('teste se ao aplicar o filtro population maior que 4500000000 o planeta Coruscant é exibido', async () => {
    mockFetchApi();
    await act(async () => {
      render(<App />)
    })
    const columnFilterInput = screen.getByTestId('column-filter');
    expect(global.fetch).toHaveBeenCalled();
    fireEvent.change(columnFilterInput, { target: { value: 'population' } });
    const comparisonFilterInput = screen.getByTestId('comparison-filter');
    fireEvent.change(comparisonFilterInput, { target: { value: 'maior que' } });
    const valueFilterInput = screen.getByTestId('value-filter');
    fireEvent.change(valueFilterInput, { target: { value: '4500000000' } });
    const applyfilterBtn = screen.getByRole('button', { name: 'Aplicar filtro' });
    fireEvent.click(applyfilterBtn);
    const Coruscant = await screen.findByText(/coruscant/i)
    expect(Coruscant).toBeInTheDocument();
  });
  /*   test('testa se os planetas são renderizados na tela', async () => {
      mockFetchApi.mockResolvedValueOnce(mockData);
      render(<App />);
      const planetNames = await screen.findAllByText(/^[A-Z]/);
      expect(planetNames).toHaveLength(10);
    }); */

})



