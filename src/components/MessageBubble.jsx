import React from 'react';
import { motion } from 'framer-motion';
import { User, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';
import './components.css';

const MessageBubble = ({ message }) => {
    const isUser = message.role === 'user';

    return (
        <motion.div
            className={`message-row ${isUser ? 'user' : 'assistant'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, type: "spring", damping: 15 }}
        >
            {!isUser && (
                <div style={{
                    marginRight: 'var(--spacing-sm)',
                    marginTop: 'var(--spacing-xs)',
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'var(--bg-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Sparkles size={16} color="var(--accent-primary)" />
                </div>
            )}

            <div className={`message-bubble ${isUser ? 'user' : 'assistant'}`}>
                {message.content}

                {/* Render Refined Feedback Card */}
                {message.refinedQuestions && message.refinedQuestions.length > 0 && (
                    <div style={{
                        marginTop: 'var(--spacing-md)',
                        paddingTop: 'var(--spacing-md)',
                        borderTop: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        {/* Link to Source */}
                        {message.link && (
                            <a
                                href={message.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    fontSize: '0.75rem',
                                    color: 'var(--accent-primary)',
                                    textDecoration: 'none',
                                    marginBottom: 'var(--spacing-sm)',
                                    fontWeight: 500
                                }}
                            >
                                {message.linkText || 'Learn more'} <ExternalLink size={12} />
                            </a>
                        )}

                        {/* Multiple Options */}
                        <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: 'var(--spacing-xs)', fontSize: '0.9rem' }}>
                            Better Ways to Ask:
                        </strong>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                            {message.refinedQuestions.map((q, idx) => (
                                <div key={idx} style={{
                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                    padding: 'var(--spacing-sm) var(--spacing-md)',
                                    borderRadius: 'var(--radius-md)',
                                    borderLeft: '2px solid var(--accent-primary)',
                                    fontSize: '0.95rem'
                                }}>
                                    {q}
                                </div>
                            ))}
                        </div>

                    </div>
                )}
            </div>

            {isUser && (
                <div style={{
                    marginLeft: 'var(--spacing-sm)',
                    marginTop: 'var(--spacing-xs)',
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <User size={16} color="white" />
                </div>
            )}
        </motion.div>
    );
};

export default MessageBubble;
