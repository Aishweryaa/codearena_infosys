/**
 * CodeArena Reusable Global Frontend Utilities
 */
const Utils = {
    /**
     * Query single or multiple DOM elements cleanly
     */
    $: (selector) => document.querySelector(selector),
    $$: (selector) => document.querySelectorAll(selector),

    /**
     * Inject a dynamic, non-intrusive alert toast element into the viewport
     */
    showToast: (message, type = 'info') => {
        let container = document.querySelector('.toast-layer-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-layer-container';
            container.setAttribute('style', 'position:fixed; bottom:24px; right:24px; display:flex; flex-direction:column; gap:12px; z-index:9999;');
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        let bg = 'var(--bg-surface)';
        let border = 'var(--border-color)';
        if (type === 'success') border = 'var(--success)';
        if (type === 'error') border = 'var(--danger)';

        toast.setAttribute('style', `background:${bg}; border:1px solid ${border}; color:var(--text-main); padding:14px 24px; border-radius:var(--radius-md); box-shadow:var(--shadow); animation:fadeInUp 0.3s cubic-bezier(0.16,1,0.3,1) forwards; font-size:0.95rem; font-weight:500;`);
        toast.textContent = message;

        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(8px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    },

    /**
     * Humanize execution latency metric values
     */
    formatRuntimeMetrics: (ms) => {
        return ms < 1 ? `${(ms * 1000).toFixed(0)} µs` : `${ms.toFixed(1)} ms`;
    }
};

/**
 * Global Theme Toggling Engine System
 */
const ThemeEngine = {
    init() {
        // Run as soon as the DOM finishes building
        document.addEventListener('DOMContentLoaded', () => {
            const currentTheme = localStorage.getItem('codearena_theme') || 'dark';
            if (currentTheme === 'light') {
                document.body.classList.add('light-theme');
            }
            this.renderToggleButton();
        });
    },

    toggle() {
        if (document.body.classList.contains('light-theme')) {
            document.body.classList.remove('light-theme');
            localStorage.setItem('codearena_theme', 'dark');
            Utils.showToast('Switched to Dark Mode Theme', 'info');
        } else {
            document.body.classList.add('light-theme');
            localStorage.setItem('codearena_theme', 'light');
            Utils.showToast('Switched to Light Mode Theme', 'info');
        }
    },

	renderToggleButton() {
	    if (document.querySelector('.theme-slider-container')) return;
	    
	    // Main container card anchor
	    const container = document.createElement('div');
	    container.className = 'theme-slider-container';
	    container.setAttribute('style', 'position:fixed; top:24px; right:24px; display:flex; align-items:center; gap:10px; background:var(--bg-surface); border:1px solid var(--border-color); padding:8px 14px; border-radius:30px; box-shadow:var(--shadow); z-index:9999; font-size:0.85rem; font-weight:600; color:var(--text-muted); user-select:none;');

	    // Context status text node
	    const labelText = document.createElement('span');
	    labelText.id = 'theme-slider-text';
	    labelText.textContent = document.body.classList.contains('light-theme') ? 'Light Mode' : 'Dark Mode';

	    // Icon display state node wrapper
	    const modeIcon = document.createElement('span');
	    modeIcon.id = 'theme-slider-icon';
	    modeIcon.setAttribute('style', 'font-size:1rem; transition:transform 0.3s ease; display:inline-block;');
	    modeIcon.textContent = document.body.classList.contains('light-theme') ? '☀️' : '🌙';

	    // Sliding capsule track deck
	    const switchTrack = document.createElement('div');
	    switchTrack.setAttribute('style', 'width:42px; height:22px; background:var(--border-color); border-radius:11px; position:relative; cursor:pointer;');

	    // Sliding inner core pill thumb
	    const switchThumb = document.createElement('div');
	    switchThumb.id = 'theme-slider-thumb';
	    
	    const isLight = document.body.classList.contains('light-theme');
	    switchThumb.setAttribute('style', `width:16px; height:16px; background:${isLight ? 'var(--color-primary)' : 'var(--text-muted)'}; border-radius:50%; position:absolute; top:3px; left:${isLight ? '23px' : '3px'}; transition:all 0.25s cubic-bezier(0.2, 0, 0, 1);`);

	    // Assemble all modern interface pieces
	    switchTrack.appendChild(switchThumb);
	    container.appendChild(modeIcon); // Icon sits perfectly on the left side of text
	    container.appendChild(labelText);
	    container.appendChild(switchTrack);
	    
	    switchTrack.addEventListener('click', () => {
	        this.toggle();
	        
	        const activeLight = document.body.classList.contains('light-theme');
	        
	        // Core interface parameter adjustments on click
	        labelText.textContent = activeLight ? 'Light Mode' : 'Dark Mode';
	        modeIcon.textContent = activeLight ? '☀️' : '🌙';
	        
	        // Dynamic text indicator subtle scale animation pop
	        modeIcon.style.transform = 'scale(1.2)';
	        setTimeout(() => modeIcon.style.transform = 'scale(1)', 150);
	        
	        switchThumb.style.left = activeLight ? '23px' : '3px';
	        switchThumb.style.background = activeLight ? 'var(--color-primary)' : 'var(--text-muted)';
	    });
	    
	    document.body.appendChild(container);
	}



};

// Initialize the system automatically
ThemeEngine.init();
