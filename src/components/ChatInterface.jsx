import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import InputArea from './InputArea';
import { analyzeAndRefine } from '../utils/heuristics';
import './components.css';

const INITIAL_MESSAGE = {
    id: 'init-1',
    role: 'assistant',
    content: "Hi there! I'm here to help you ask better UX research questions. What specific question were you planning to ask your users?"
};

const ChatInterface = () => {
    const [messages, setMessages] = useState([INITIAL_MESSAGE]);
    const [isTyping, setIsTyping] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (text) => {
        // 1. Add User Message
        const userMsg = {
            id: Date.now().toString(),
            role: 'user',
            content: text
        };
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        // 2. Simulate processing delay
        setTimeout(() => {
            // 3. Get Refinement
            const result = analyzeAndRefine(text);

            const assistantMsg = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: result.feedback,
                refinedQuestions: result.refinedQuestions,
                link: result.link,
                linkText: result.linkText
            };

            setMessages(prev => [...prev, assistantMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="chat-container">
            <div className="messages-area">
                {messages.map(msg => (
                    <MessageBubble key={msg.id} message={msg} />
                ))}
                {isTyping && (
                    <div className="message-row assistant">
                        <div className="message-bubble assistant" style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>
                            Analyzing your question...
                        </div>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>
            <InputArea onSend={handleSend} disabled={isTyping} />
        </div>
    );
};

export default ChatInterface;
