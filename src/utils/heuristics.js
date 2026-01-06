/**
 * Heuristics for better UX research questions.
 * Based on NN/g and other best practices.
 */

const HEURISTICS = [
    {
        id: 'too-short',
        name: "Too Short",
        check: (q) => q.split(' ').length < 2,
        advice: "This looks like a topic rather than a specific question. Validating a topic is great, but to get actionable insights, try asking about a specific experience.",
        link: "https://www.nngroup.com/articles/user-interviews/",
        linkText: "NN/g: User Interviews",
        refine: (q) => [
            `Tell me about your experience with ${q}.`,
            `Walk me through how you typically handle ${q}.`,
            `What are your main challenges regarding ${q}?`
        ]
    },
    {
        id: 'why-question',
        name: "Avoid 'Why'",
        check: (q) => /^why\b/i.test(q),
        advice: "Asking 'Why' can sometimes make users feel defensive or lead them to rationalize their behavior instead of describing it. 'What' or 'How' questions often yield better behavioral data.",
        link: "https://www.nngroup.com/articles/interviewing-users/",
        linkText: "NN/g: Interviewing Users",
        refine: (q) => [
            "What was your goal when you made that decision?",
            "Walk me through your thought process.",
            "What factors influenced your choice?"
        ]
    },
    {
        id: 'future-prediction',
        name: "Avoid Future Prediction",
        check: (q) => /\b(would|will)\s+you\b/i.test(q) || /\b(buy|pay)\b/i.test(q),
        advice: "Users are notoriously bad at predicting their future behavior. Instead of asking what they *would* do, ask about what they *have done* in the past. This provides more reliable data based on actual behavior rather than aspirational intent.",
        link: "https://www.nngroup.com/articles/first-rule-of-usability-dont-listen-to-users/",
        linkText: "NN/g: The First Rule of Usability",
        refine: (q) => {
            const isPurchase = /\b(buy|pay)\b/i.test(q);
            if (isPurchase) {
                return [
                    "Tell me about the last time you bought a product like this. What was your decision process?",
                    "What factors influenced your decision the last time you purchased [Product Category]?",
                    "Can you walk me through your most recent purchase experience?"
                ];
            }
            return [
                "Tell me about a time when you encountered a similar situation in the past.",
                "Can you describe the last time you used a feature like this?",
                "Walk me through your actual workflow when you last performed this task."
            ];
        }
    },
    {
        id: 'leading-question',
        name: "Avoid Leading Questions",
        check: (q) => /\b(do|don't|did|didn't|is|isn't)\s+you\s+(like|love|hate|think)\b/i.test(q) || /\b(good|bad|easy|hard)\b/i.test(q),
        advice: "This question might be leading the user to a specific answer by embedding a judgment (like 'good', 'easy', or 'like'). Neutral questions allow users to express their true feelings without bias.",
        link: "https://www.nngroup.com/articles/10-survey-challenges/",
        linkText: "NN/g: Avoiding Leading Questions in Surveys",
        refine: (q) => [
            "How would you describe your experience with this feature?",
            "What are your thoughts on this interface?",
            "Talk me through your reaction to this screen."
        ]
    },
    {
        id: 'closed-ended',
        name: "Open vs. Closed",
        check: (q) => /^(did|do|does|is|isn't|are|aren't|have|has|was|were|can|could|should|will|won't)\b/i.test(q),
        advice: "This looks like a closed-ended (Yes/No) question. While useful for quant data, open-ended questions yield richer insights in qualitative interviews by encouraging storytelling.",
        link: "https://www.nngroup.com/articles/open-ended-questions/",
        linkText: "NN/g: Open-Ended vs. Closed-Ended Questions",
        refine: (q) => [
            "Walk me through how you...",
            "Tell me more about...",
            "What was your experience when..."
        ]
    },
    {
        id: 'double-barreled',
        name: "One Thing at a Time",
        check: (q) => /\b(and|or)\b/i.test(q) && q.length > 50,
        advice: "This might be a double-barreled question asking about multiple things at once. Splitting it ensures you get clear answers for each distinct topic.",
        link: "https://www.nngroup.com/articles/10-survey-challenges/", // Covers complex questions too
        linkText: "NN/g: Avoiding Double-Barreled Questions",
        refine: (q) => [
            "Let's focus on one aspect first. Tell me about [Topic A].",
            "Regarding [Topic B], how do you feel about...",
            "Can we break that down? First, what are your thoughts on..."
        ]
    }
];

export const analyzeAndRefine = (question) => {
    const trimmed = question.trim();

    // Find the first matching heuristic
    const match = HEURISTICS.find(h => h.check(trimmed));

    if (match) {
        return {
            feedback: match.advice,
            refinedQuestions: match.refine(trimmed),
            link: match.link,
            linkText: match.linkText
        };
    }

    // Fallback if no issues found
    return {
        feedback: "This looks like a solid, open-ended question! It's neutral and invites the user to share their story.",
        refinedQuestions: null,
        link: null,
        linkText: null
    };
};
