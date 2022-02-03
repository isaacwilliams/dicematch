import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ACTIONS } from '../../constants';
import { connect } from 'react-redux';

const containerEnter = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
`;

const modalEnter = keyframes`
    0% { transform: scale(0.9); }
    100% { transform: scale(1); }
`;

const containerExit = keyframes`
    0% { opacity: 1; }
    50% { opacity: 1; }
    100% { opacity: 0; }
`;

const modalExit = keyframes`
    0% { transform: scale(1); }
    100% { transform: scale(0.9) }
`;

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.7);

    animation: ${containerEnter} 0.25s ease-in-out forwards;

    &.closing {
        animation: ${containerExit} 0.25s ease-in-out forwards;
    }
`;

const StyledModal = styled.div`
    padding: 1rem;
    border-radius: 0.8rem;
    text-align: center;
    font-size: 1rem;

    color: ${(({ theme }) => theme.foreground)};
    background: ${(({ theme }) => theme.modal.background)};

    animation: ${modalEnter} 0.25s ease-in-out forwards;

    .closing & {
        animation: ${modalExit} 0.25s ease-in-out forwards;
    }
`;

const CloseButton = styled.button`
    position: absolute;

    top: 0;
    right: 0;

    width: 3rem;
    height: 3rem;

    border 0;

    font-size: 1rem;
    font-family: inherit;
    color: ${(({ theme }) => theme.foreground)};

    background: transparent;
`;

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch({ type: ACTIONS.CLOSE_MODAL }),
});

const Modal = ({ showCloseButton, children, closeModal }) => {
    const [closing, setClosing] = useState();

    const handleCloseClick = () => {
        setClosing(true);
        setTimeout(() => {
            closeModal();
            setClosing(false);
        }, 250);
    };

    return (
        <ModalContainer className={closing ? 'closing' : undefined}>
            <StyledModal>
                {showCloseButton && <CloseButton onClick={handleCloseClick}>X</CloseButton>}
                {children}
            </StyledModal>
        </ModalContainer>
    );
}

export default connect(null, mapDispatchToProps)(Modal);
