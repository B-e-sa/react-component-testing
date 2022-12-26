import {
    queryByText,
    render, waitFor,
    waitForElementToBeRemoved
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import List from './List';

describe('List Component', () => {
    test('if renders list items', () => {
        const { getByText, rerender } = render(<List initialItems={['n1', 'n2', 'n3']} />);

        expect(getByText('n1')).toBeInTheDocument();
        expect(getByText('n2')).toBeInTheDocument();
        expect(getByText('n3')).toBeInTheDocument();
    });

    it('should be able to add new item to the list', async () => {
        const {
            getByText,
            getByPlaceholderText,
            debug,
            findByText
        } = render(<List initialItems={[]}/>);

        const addButton = getByText('add');
        const input = getByPlaceholderText('Item Name');

        await userEvent.type(input, 'new');

        await userEvent.click(addButton)
        // test condition
        // .then(() => expect(getByText('new')).toBeInTheDocument());

        /* user and server connection condition
        * findBy waits to element be on screen
        * expect(await findByText('new')).toBeInTheDocument();
        */

        // more convenient way
        await waitFor(() => {
            expect(getByText('new')).toBeInTheDocument();
        });

        debug();
    });

    it('should be able to remove element from the list', async () => {
        const { getAllByText, queryByText } = render(<List initialItems={['n1']}/>);

        const removeButtons = getAllByText('remove');

        await userEvent.click(removeButtons[0]);

        await waitFor(() => {
            expect(queryByText('n1')).not.toBeInTheDocument()
        });
    });
});