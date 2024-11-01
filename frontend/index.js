import { backend } from "declarations/backend";

document.addEventListener('DOMContentLoaded', () => {
    const terminalContent = document.getElementById('terminalContent');
    const startBuildingBtn = document.getElementById('startBuildingBtn');
    const getStartedBtn = document.getElementById('getStartedBtn');
    const viewDocsBtn = document.getElementById('viewDocsBtn');

    async function simulateDeployment() {
        const lines = [
            { text: 'Initializing deployment on Internet Computer...', class: 'output' },
            { text: 'Verifying model configuration...', class: 'output' },
            { text: 'Uploading model to ICP network...', class: 'output' },
            { text: '✓ Model deployed successfully to: abcd-xyz.ic0.app', class: 'success' }
        ];

        try {
            const response = await backend.deployModel();
            
            for (let i = 0; i < lines.length; i++) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const line = document.createElement('div');
                line.className = 'terminal-line';
                line.innerHTML = `<span class="${lines[i].class}">${lines[i].text}</span>`;
                terminalContent.appendChild(line);
            }
        } catch (error) {
            const errorLine = document.createElement('div');
            errorLine.className = 'terminal-line';
            errorLine.innerHTML = `<span style="color: #ff5f56">Error: ${error.message}</span>`;
            terminalContent.appendChild(errorLine);
        }
    }

    function handleGetStarted() {
        // Clear previous terminal content except the first command
        while (terminalContent.children.length > 1) {
            terminalContent.removeChild(terminalContent.lastChild);
        }
        simulateDeployment();
    }

    startBuildingBtn.addEventListener('click', handleGetStarted);
    getStartedBtn.addEventListener('click', handleGetStarted);
    viewDocsBtn.addEventListener('click', () => {
        window.open('https://internetcomputer.org/docs', '_blank');
    });

    // Initial deployment simulation
    simulateDeployment();
});
