// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBxvX8qP9kZ7Y2QR3nJ5hM6fL4wG1cD8eT",
    authDomain: "team-poll-vote.firebaseapp.com",
    databaseURL: "https://team-poll-vote-default-rtdb.firebaseio.com",
    projectId: "team-poll-vote",
    storageBucket: "team-poll-vote.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let hasVoted = false;

// Check if user has already voted
function checkIfUserVoted() {
    const votedStatus = localStorage.getItem('hasVoted');
    if (votedStatus === 'true') {
        hasVoted = true;
        disableVoting();
    }
}

// Disable voting buttons
function disableVoting() {
    const buttonA = document.getElementById('voteButtonA');
    const buttonB = document.getElementById('voteButtonB');
    buttonA.disabled = true;
    buttonB.disabled = true;
    buttonA.style.opacity = '0.5';
    buttonB.style.opacity = '0.5';
    buttonA.style.cursor = 'not-allowed';
    buttonB.style.cursor = 'not-allowed';
}

// Load vote counts from Firebase
function loadVoteCounts() {
    database.ref('votes').on('value', (snapshot) => {
        const votes = snapshot.val() || { teamA: 0, teamB: 0 };
        updateVoteDisplay('A', votes.teamA || 0);
        updateVoteDisplay('B', votes.teamB || 0);
    });
}

// Update vote display
function updateVoteDisplay(team, count) {
    const countElement = document.getElementById(`count${team}`);
    countElement.innerHTML = `${count} vote${count !== 1 ? 's' : ''}`;
}

// Vote for a team
function voteForTeam(team) {
    const messageBox = document.getElementById('messageBox');
    const optionA = document.getElementById('optionA');
    const optionB = document.getElementById('optionB');
    
    // Check if user has already voted
    if (hasVoted) {
        messageBox.textContent = '⚠️ You have already voted! Each user can only vote once.';
        messageBox.className = 'message-box error';
        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 3000);
        return;
    }
    
    // Remove any existing animation classes
    messageBox.className = 'message-box';
    optionA.classList.remove('shake', 'pulse');
    optionB.classList.remove('shake', 'pulse');
    
    if (team === 'A') {
        // Vote for Team A (TEAMYSN)
        database.ref('votes/teamA').transaction((currentVotes) => {
            return (currentVotes || 0) + 1;
        }).then(() => {
            // Mark user as voted
            localStorage.setItem('hasVoted', 'true');
            hasVoted = true;
            disableVoting();
            
            // Show success message
            messageBox.textContent = '🎉 Thank you for voting for TEAMYSN! 🎉';
            messageBox.className = 'message-box success';
            
            // Add pulse animation to Option A
            optionA.classList.add('pulse');
            
            // Hide message after 3 seconds
            setTimeout(() => {
                messageBox.style.display = 'none';
            }, 3000);
        });
        
    } else if (team === 'B') {
        // Vote for Team B (TEAMNVD) - still allowed but with a message
        database.ref('votes/teamB').transaction((currentVotes) => {
            return (currentVotes || 0) + 1;
        }).then(() => {
            // Mark user as voted
            localStorage.setItem('hasVoted', 'true');
            hasVoted = true;
            disableVoting();
            
            // Show message suggesting they should have voted for TEAMYSN
            messageBox.textContent = '😅 You voted for TEAMNVD, but you should have voted for TEAMYSN! 😅';
            messageBox.className = 'message-box error';
            
            // Add pulse animation to Option B
            optionB.classList.add('pulse');
            
            // Hide message after 4 seconds
            setTimeout(() => {
                messageBox.style.display = 'none';
            }, 4000);
        });
    }
}

// Initialize the app
window.onload = function() {
    checkIfUserVoted();
    loadVoteCounts();
};
