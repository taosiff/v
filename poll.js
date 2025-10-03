let votesA = 0;
let votesB = 0;

function voteForTeam(team) {
    const messageBox = document.getElementById('messageBox');
    const optionA = document.getElementById('optionA');
    const optionB = document.getElementById('optionB');
    
    // Remove any existing animation classes
    messageBox.className = 'message-box';
    optionA.classList.remove('shake', 'pulse');
    optionB.classList.remove('shake', 'pulse');
    
    if (team === 'A') {
        // Vote for Team A is allowed
        votesA++;
        updateVoteCount('A', votesA);
        
        // Show success message
        messageBox.textContent = '🎉 Thank you for voting for TEAMYSN! 🎉';
        messageBox.className = 'message-box success';
        
        // Add pulse animation to Option A
        optionA.classList.add('pulse');
        
        // Hide message after 3 seconds
        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 3000);
        
    } else if (team === 'B') {
        // Vote for Team B is NOT allowed
        // Show error message
        messageBox.textContent = '❌ Sorry! Please vote for TEAMYSN ❌';
        messageBox.className = 'message-box error';
        
        // Add shake animation to Option B
        optionB.classList.add('shake');
        
        // Hide message after 3 seconds
        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 3000);
    }
}

function updateVoteCount(team, count) {
    const countElement = document.getElementById(`count${team}`);
    countElement.textContent = `${count} vote${count !== 1 ? 's' : ''}`;
}

