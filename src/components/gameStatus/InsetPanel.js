import styled from 'styled-components';

const InsetPanel = styled.div`
    display: flex;

    align-items: center;
    justify-content: space-between;

    padding: 0.2rem 0.5rem;
    background: ${({ theme }) => theme.header.backgroundInset};
    border-radius: 0.5rem;

    font-size: 1.2rem;
    color: ${({ theme }) => theme.header.text};

    .title {
        font-size: 0.8rem;
        font-weight: bold;
        color: ${({ theme }) => theme.header.textSecondary};
    }
`;

export default InsetPanel;
