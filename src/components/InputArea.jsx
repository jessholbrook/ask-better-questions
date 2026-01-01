import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import './components.css';

const InputArea = ({ onSend, disabled }) => {
    const [input, setInput] = useState('');
    const textareaRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() && !disabled) {
            onSend(input);
            setInput('');
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto'; // Reset height
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const handleInput = (e) => {
        setInput(e.target.value);
        // Auto-expand
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    return (
        <div className="input-position-wrapper">
            <form className="input-container" onSubmit={handleSubmit}>
                <textarea
                    ref={textareaRef}
                    className="chat-input"
                    placeholder="Type your research question here..."
                    value={input}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    rows={1}
                />
                <button
                    type="submit"
                    className="send-button"
                    disabled={!input.trim() || disabled}
                    aria-label="Send message"
                >
                    <Send size={20} />
                </button>
            </form>
        </div>
    );
};

export default InputArea;
