import { render, screen, fireEvent } from '@testing-library/react';
import Select from './Select';

describe('Select', () => {
    const mockOptions = [
        { key: '1', name: 'Option 1' },
        { key: '2', name: 'Option 2' },
    ];

    const mockOnChange = jest.fn();

    it('should render the select component with placeholder', () => {
        render(
            <Select
                options={mockOptions}
                value=""
                onChange={mockOnChange}
                placeholder="Select an option"
            />
        );
        expect(screen.getByText('Select an option')).toBeInTheDocument();
    });

    it('should render options correctly', () => {
        render(
            <Select
                options={mockOptions}
                value=""
                onChange={mockOnChange}
                placeholder="Select an option"
            />
        );
        mockOptions.forEach((option) => {
            expect(screen.getByText(option.name)).toBeInTheDocument();
        });
    });

    it('should call onChange when an option is selected', async () => {
        render(
            <Select
                options={mockOptions}
                value=""
                onChange={mockOnChange}
                placeholder="Select an option"
            />
        );
        const selectElement = screen.getByRole('combobox') as HTMLSelectElement; // Assert as HTMLSelectElement

        // Simulate selecting an option
        fireEvent.change(selectElement, { target: { value: '1' } });

        // Assert that the mock function was called
        expect(mockOnChange).toHaveBeenCalled();
    });

    it('should select the correct value when passed as a prop', () => {
        render(
            <Select
                options={mockOptions}
                value="2"
                onChange={mockOnChange}
                placeholder="Select an option"
            />
        );

        const option = screen.getByRole('option', { name: 'Option 2' }) as HTMLOptionElement;
        expect(option.selected).toBe(true);
    });

    it('should display the default placeholder if none is provided', () => {
        render(
            <Select
                options={mockOptions}
                value=""
                onChange={mockOnChange}
            />
        );

        const defaultPlaceholder = screen.getByText('Select value');
        expect(defaultPlaceholder).toBeInTheDocument();
    });
});
