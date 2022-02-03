import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { ACTIONS } from '../../constants';
import { connect } from 'react-redux';

const containerEnter = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
`;

const modalEnter = keyframes`
    0% { transform: scale(0.8); }
    100% { transform: scale(1); }
`;

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 20px;
    background: rgba(0, 0, 0, 0.5);

    animation: ${containerEnter} 0.25s ease-in-out forwards;
`;

const StyledModal = styled.div`
    background: white;
    padding: 20px;
    border-radius: 6px;
    text-align: center;
    font-size: 18px;

    animation: ${modalEnter} 0.25s ease-in-out forwards;
`;

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch({ type: ACTIONS.CLOSE_MODAL }),
});

const Modal = ({ showCloseButton, children }) => (
    <ModalContainer>
        <StyledModal>
            {children}
        </StyledModal>
    </ModalContainer>
);

export default connect(null, mapDispatchToProps)(Modal);
