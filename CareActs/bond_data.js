const bondQuestionsData = {
    "Father / Mother": getUniversalQuestions(),
    "Brother / Sister": getSiblingQuestions(),
    "Son / Daughter": getChildQuestions(),
    "Partner": getPartnerQuestions(),
    "Crush": getPartnerQuestions(),
    "Best Friend": getFriendQuestions(),
    "Boss": getWorkQuestions(),
    "Manager": getWorkQuestions(),
    // Keep legacy keys just in case, or remove if confident
    "Father": getUniversalQuestions(),
    "Mother": getUniversalQuestions()
};

function getUniversalQuestions() {
    // ...
}

function getSiblingQuestions() {
    // ...
}

function getChildQuestions() {
    // ...
}

function getPartnerQuestions() {
    // ...
}

function getWorkQuestions() {
    // ...
}

function getFriendQuestions() {
    return [
        {
            id: 1,
            text: "How often do you talk or check in with each other?",
            options: [
                { text: "Often", score: 12.5 },
                { text: "Sometimes", score: 6.25 },
                { text: "Rarely", score: 0 }
            ]
        },
        {
            id: 2,
            text: "Can you be completely yourself around them?",
            options: [
                { text: "Yes", score: 12.5 },
                { text: "Mostly", score: 6.25 },
                { text: "Not really", score: 0 }
            ]
        },
        {
            id: 3,
            text: "Would you go to them when you’re struggling?",
            options: [
                { text: "Definitely", score: 12.5 },
                { text: "Maybe", score: 6.25 },
                { text: "Probably not", score: 0 }
            ]
        },
        {
            id: 4,
            text: "Have you made time or effort for them recently?",
            options: [
                { text: "Yes", score: 12.5 },
                { text: "A little", score: 6.25 },
                { text: "Not really", score: 0 }
            ]
        },
        {
            id: 5,
            text: "Do you still create fun or meaningful moments together?",
            options: [
                { text: "Often", score: 12.5 },
                { text: "Sometimes", score: 6.25 },
                { text: "Rarely", score: 0 }
            ]
        },
        {
            id: 6,
            text: "Do you know what’s going on in their life these days?",
            options: [
                { text: "Yes", score: 12.5 },
                { text: "Somewhat", score: 6.25 },
                { text: "Not really", score: 0 }
            ]
        },
        {
            id: 7,
            text: "Is there something unsaid or awkward between you?",
            options: [
                { text: "No", score: 12.5 },
                { text: "Maybe", score: 6.25 },
                { text: "Yes", score: 0 }
            ]
        },
        {
            id: 8,
            text: "Right now, how emotionally close do you feel?",
            options: [
                { text: "Very close", score: 12.5 },
                { text: "Neutral", score: 6.25 },
                { text: "Distant", score: 0 }
            ]
        }
    ];
}

function getUniversalQuestions() {
    // ...
}

function getSiblingQuestions() {
    // ...
}

function getChildQuestions() {
    // ...
}

function getPartnerQuestions() {
    // ...
}

function getWorkQuestions() {
    return [
        {
            id: 1,
            text: "Do you clearly understand what they expect from you?",
            options: [
                { text: "Yes", score: 12.5 },
                { text: "Sometimes", score: 6.25 },
                { text: "Not really", score: 0 }
            ]
        },
        {
            id: 2,
            text: "Do you feel comfortable approaching them with questions or concerns?",
            options: [
                { text: "Yes", score: 12.5 },
                { text: "A bit", score: 6.25 },
                { text: "No", score: 0 }
            ]
        },
        {
            id: 3,
            text: "Do you feel respected in your interactions with them?",
            options: [
                { text: "Yes", score: 12.5 },
                { text: "Sometimes", score: 6.25 },
                { text: "Rarely", score: 0 }
            ]
        },
        {
            id: 4,
            text: "Do they support you when work becomes challenging?",
            options: [
                { text: "Often", score: 12.5 },
                { text: "Occasionally", score: 6.25 },
                { text: "Rarely", score: 0 }
            ]
        },
        {
            id: 5,
            text: "Do you receive constructive feedback that helps you grow?",
            options: [
                { text: "Yes", score: 12.5 },
                { text: "Sometimes", score: 6.25 },
                { text: "Not really", score: 0 }
            ]
        },
        {
            id: 6,
            text: "Do they acknowledge your efforts or achievements?",
            options: [
                { text: "Often", score: 12.5 },
                { text: "Sometimes", score: 6.25 },
                { text: "Rarely", score: 0 }
            ]
        },
        {
            id: 7,
            text: "Is there tension or an issue you’re avoiding discussing?",
            options: [
                { text: "No", score: 12.5 },
                { text: "Maybe", score: 6.25 },
                { text: "Yes", score: 0 }
            ]
        },
        {
            id: 8,
            text: "Overall, how healthy does your working relationship feel?",
            options: [
                { text: "Strong", score: 12.5 },
                { text: "Okay", score: 6.25 },
                { text: "Strained", score: 0 }
            ]
        }
    ];
}

function getUniversalQuestions() {
    // ... (omitted for brevity, assume unchanged)
    // ...
}

function getSiblingQuestions() {
    // ... (omitted for brevity, assume unchanged)
    // ...
}

function getChildQuestions() {
    // ... (omitted for brevity, assume unchanged)
    // ...
}

function getPartnerQuestions() {
    return [
        {
            id: 1,
            text: "Do you have open and honest conversations?",
            options: [
                { text: "Yes, easily", score: 11.11 },
                { text: "Sometimes", score: 5.55 },
                { text: "Not really", score: 0 }
            ]
        },
        {
            id: 2,
            text: "Do you feel safe sharing vulnerable feelings with them?",
            options: [
                { text: "Yes", score: 11.11 },
                { text: "A little", score: 5.55 },
                { text: "No", score: 0 }
            ]
        },
        {
            id: 3,
            text: "Have you made a thoughtful effort for them recently?",
            options: [
                { text: "Yes", score: 11.11 },
                { text: "Not much", score: 5.55 },
                { text: "No", score: 0 }
            ]
        },
        {
            id: 4,
            text: "When you’re together, do you feel truly present with each other?",
            options: [
                { text: "Most of the time", score: 11.11 },
                { text: "Sometimes", score: 5.55 },
                { text: "Rarely", score: 0 }
            ]
        },
        {
            id: 5,
            text: "Do you express appreciation or affection openly?",
            options: [
                { text: "Often", score: 11.11 },
                { text: "Occasionally", score: 5.55 },
                { text: "Rarely", score: 0 }
            ]
        },
        {
            id: 6,
            text: "Is there an issue being avoided or left unresolved?",
            options: [
                { text: "No", score: 11.11 },
                { text: "Maybe", score: 5.55 },
                { text: "Yes", score: 0 }
            ]
        },
        {
            id: 7,
            text: "Do you understand what they are going through emotionally lately?",
            options: [
                { text: "Yes", score: 11.11 },
                { text: "Somewhat", score: 5.55 },
                { text: "Not really", score: 0 }
            ]
        },
        {
            id: 8,
            text: "How often do you express love or affection in words (like ‘I love you’, ‘I care about you’)?",
            options: [
                { text: "Often", score: 11.11 },
                { text: "Sometimes", score: 5.55 },
                { text: "Rarely", score: 0 }
            ]
        },
        {
            id: 9,
            text: "Right now, how emotionally close do you feel?",
            options: [
                { text: "Very close", score: 11.12 }, // Slight bump to hit 100 perfectly
                { text: "Neutral", score: 5.55 },
                { text: "Distant", score: 0 }
            ]
        }
    ];
}

function getUniversalQuestions() {
    // ... (omitted for brevity, assume unchanged)
    // ...
}

function getSiblingQuestions() {
    // ... (omitted for brevity, assume unchanged)
    // ...
}

function getChildQuestions() {
    return [
        {
            id: 1,
            text: "How often do you spend distraction-free time with your child?",
            options: [
                { text: "Often", score: 12.5 },
                { text: "Sometimes", score: 6.25 },
                { text: "Rarely", score: 0 }
            ]
        },
        {
            id: 2,
            text: "Does your child feel comfortable sharing feelings with you?",
            options: [
                { text: "Yes", score: 12.5 },
                { text: "Sometimes", score: 6.25 },
                { text: "Not really", score: 0 }
            ]
        },
        {
            id: 3,
            text: "Do you listen fully when they talk about their day or problems?",
            options: [
                { text: "Most of the time", score: 12.5 },
                { text: "Occasionally", score: 6.25 },
                { text: "Not much", score: 0 }
            ]
        },
        {
            id: 4,
            text: "How often do you express pride or appreciation for them?",
            options: [
                { text: "Often", score: 12.5 },
                { text: "Sometimes", score: 6.25 },
                { text: "Rarely", score: 0 }
            ]
        },
        {
            id: 5,
            text: "Do you know what they are currently excited or worried about?",
            options: [
                { text: "Yes", score: 12.5 },
                { text: "A little", score: 6.25 },
                { text: "Not really", score: 0 }
            ]
        },
        {
            id: 6,
            text: "After disagreements, do you reconnect calmly?",
            options: [
                { text: "Yes", score: 12.5 },
                { text: "Sometimes", score: 6.25 },
                { text: "Not really", score: 0 }
            ]
        },
        {
            id: 7,
            text: "Do you do enjoyable activities together (not just responsibilities)?",
            options: [
                { text: "Regularly", score: 12.5 },
                { text: "Occasionally", score: 6.25 },
                { text: "Almost never", score: 0 }
            ]
        },
        {
            id: 8,
            text: "Right now, how connected do you feel to your child emotionally?",
            options: [
                { text: "Very connected", score: 12.5 },
                { text: "Somewhat", score: 6.25 },
                { text: "Distant", score: 0 }
            ]
        }
    ];
}

function getUniversalQuestions() {
    return [
        {
            id: 1,
            text: "How often do you have meaningful conversations with them?",
            options: [
                { text: "Often", score: 12.5 },
                { text: "Sometimes", score: 6.25 },
                { text: "Rarely", score: 0 }
            ]
        },
        {
            id: 2,
            text: "When was the last time you expressed appreciation to them?",
            options: [
                { text: "Recently", score: 12.5 },
                { text: "A while ago", score: 6.25 },
                { text: "I can’t remember", score: 0 }
            ]
        },
        {
            id: 3,
            text: "Can you share personal feelings or struggles with them?",
            options: [
                { text: "Yes, easily", score: 12.5 },
                { text: "A little", score: 6.25 },
                { text: "Not really", score: 0 }
            ]
        },
        {
            id: 4,
            text: "Have you done something thoughtful for them lately?",
            options: [
                { text: "Yes", score: 12.5 },
                { text: "Not sure", score: 6.25 },
                { text: "No", score: 0 }
            ]
        },
        {
            id: 5,
            text: "Is there something unsaid or unresolved between you?",
            options: [
                { text: "No", score: 12.5 },     // Inverted logic: 'No' is good
                { text: "Maybe", score: 6.25 },
                { text: "Yes", score: 0 }
            ]
        },
        {
            id: 6,
            text: "How much quality time do you spend with them?",
            options: [
                { text: "Enough", score: 12.5 },
                { text: "Not much", score: 6.25 },
                { text: "Almost none", score: 0 }
            ]
        },
        {
            id: 7,
            text: "Do you understand what stresses or worries them these days?",
            options: [
                { text: "Yes", score: 12.5 },
                { text: "A bit", score: 6.25 },
                { text: "No", score: 0 }
            ]
        },
        {
            id: 8,
            text: "Right now, how close do you feel to them emotionally?",
            options: [
                { text: "Close", score: 12.5 },
                { text: "Neutral", score: 6.25 },
                { text: "Distant", score: 0 }
            ]
        }
    ];
}

function getSiblingQuestions() {
    return [
        {
            id: 1,
            text: "How often do you talk or check in with them?",
            options: [
                { text: "Often", score: 12.5 },
                { text: "Sometimes", score: 6.25 },
                { text: "Rarely", score: 0 }
            ]
        },
        {
            id: 2,
            text: "Can you be yourself around them without pretending?",
            options: [
                { text: "Yes", score: 12.5 },
                { text: "Mostly", score: 6.25 },
                { text: "Not really", score: 0 }
            ]
        },
        {
            id: 3,
            text: "Do you spend fun or relaxed time together?",
            options: [
                { text: "Regularly", score: 12.5 },
                { text: "Occasionally", score: 6.25 },
                { text: "Almost never", score: 0 }
            ]
        },
        {
            id: 4,
            text: "Would you feel comfortable asking them for help?",
            options: [
                { text: "Yes", score: 12.5 },
                { text: "Maybe", score: 6.25 },
                { text: "No", score: 0 }
            ]
        },
        {
            id: 5,
            text: "Is there old tension or hurt still between you?",
            options: [
                { text: "No", score: 12.5 },
                { text: "A little", score: 6.25 },
                { text: "Yes", score: 0 }
            ]
        },
        {
            id: 6,
            text: "Have you made an effort to connect recently?",
            options: [
                { text: "Yes", score: 12.5 },
                { text: "Not much", score: 6.25 },
                { text: "No", score: 0 }
            ]
        },
        {
            id: 7,
            text: "Do you know what’s going on in their life right now?",
            options: [
                { text: "Yes", score: 12.5 },
                { text: "Somewhat", score: 6.25 },
                { text: "Not really", score: 0 }
            ]
        },
        {
            id: 8,
            text: "Right now, how close do you feel to them emotionally?",
            options: [
                { text: "Close", score: 12.5 },
                { text: "Neutral", score: 6.25 },
                { text: "Distant", score: 0 }
            ]
        }
    ];
}
