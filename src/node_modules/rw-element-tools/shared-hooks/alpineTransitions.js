const alpineTransitions = (name = "fade") => {
    const transitions = {
        dim: {
            enter: 'transition-all duration-300',
            enterStart: 'opacity-25',
            enterEnd: 'opacity-100',
            leave: 'transition-all duration-300',
            leaveStart: 'opacity-100',
            leaveEnd: 'opacity-25'
        },
        // Basic transitions
        fade: {
            enter: 'transition-all duration-300',
            enterStart: 'opacity-0',
            enterEnd: 'opacity-100',
            leave: 'transition-all duration-300',
            leaveStart: 'opacity-100',
            leaveEnd: 'opacity-0'
        },

        // Slide transitions
        slideDown: {
            enter: 'transition-all duration-300',
            enterStart: 'opacity-0 -translate-y-4',
            enterEnd: 'opacity-100 translate-y-0',
            leave: 'transition-all duration-300',
            leaveStart: 'opacity-100 translate-y-0',
            leaveEnd: 'opacity-0 -translate-y-4'
        },

        slideUp: {
            enter: 'transition-all duration-300',
            enterStart: 'opacity-0 translate-y-4',
            enterEnd: 'opacity-100 translate-y-0',
            leave: 'transition-all duration-300',
            leaveStart: 'opacity-100 translate-y-0',
            leaveEnd: 'opacity-0 translate-y-4'
        },

        slideRight: {
            enter: 'transition-all duration-300',
            enterStart: 'opacity-0 -translate-x-4',
            enterEnd: 'opacity-100 translate-x-0',
            leave: 'transition-all duration-300',
            leaveStart: 'opacity-100 translate-x-0',
            leaveEnd: 'opacity-0 -translate-x-4'
        },

        slideLeft: {
            enter: 'transition-all duration-300',
            enterStart: 'opacity-0 translate-x-4',
            enterEnd: 'opacity-100 translate-x-0',
            leave: 'transition-all duration-300',
            leaveStart: 'opacity-100 translate-x-0',
            leaveEnd: 'opacity-0 translate-x-4'
        },

        // Scale transitions
        scale: {
            enter: 'transition-all duration-300',
            enterStart: 'opacity-0 scale-95',
            enterEnd: 'opacity-100 scale-100',
            leave: 'transition-all duration-300',
            leaveStart: 'opacity-100 scale-100',
            leaveEnd: 'opacity-0 scale-95'
        },

        scaleUp: {
            enter: 'transition-all duration-300',
            enterStart: 'opacity-0 scale-75',
            enterEnd: 'opacity-100 scale-100',
            leave: 'transition-all duration-300',
            leaveStart: 'opacity-100 scale-100',
            leaveEnd: 'opacity-0 scale-75'
        },

        scaleDown: {
            enter: 'transition-all !duration-[2s]',
            enterStart: 'opacity-0 scale-125 rotate-45',
            enterEnd: 'opacity-100 scale-100 rotate-0',
            leave: 'transition-all !duration-[2s]',
            leaveStart: 'opacity-100 scale-100 rotate-0',
            leaveEnd: 'opacity-0 scale-125 rotate-45'
        },

        // Combined transitions
        slideDownScale: {
            enter: 'transition-all duration-300',
            enterStart: 'opacity-0 -translate-y-4 scale-95',
            enterEnd: 'opacity-100 translate-y-0 scale-100',
            leave: 'transition-all duration-300',
            leaveStart: 'opacity-100 translate-y-0 scale-100',
            leaveEnd: 'opacity-0 -translate-y-4 scale-95'
        },

        slideUpScale: {
            enter: 'transition-all duration-300',
            enterStart: 'opacity-0 translate-y-4 scale-95',
            enterEnd: 'opacity-100 translate-y-0 scale-100',
            leave: 'transition-all duration-300',
            leaveStart: 'opacity-100 translate-y-0 scale-100',
            leaveEnd: 'opacity-0 translate-y-4 scale-95'
        },

        // Special effects
        pop: {
            enter: 'transition-all duration-200',
            enterStart: 'opacity-0 scale-90',
            enterEnd: 'opacity-100 scale-105',
            leave: 'transition-all duration-200',
            leaveStart: 'opacity-100 scale-105',
            leaveEnd: 'opacity-0 scale-90'
        },

        flip: {
            enter: 'transition-all duration-300 ease-out',
            enterStart: 'opacity-0 -rotate-45',
            enterEnd: 'opacity-100 rotate-0',
            leave: 'transition-all duration-300 ease-in',
            leaveStart: 'opacity-100 rotate-0',
            leaveEnd: 'opacity-0 -rotate-45'
        },

        drawer: {
            enter: 'transition-all duration-300 ease-out',
            enterStart: 'opacity-0 max-h-0 overflow-hidden',
            enterEnd: 'opacity-100 max-h-screen',
            leave: 'transition-all duration-300 ease-in',
            leaveStart: 'opacity-100 max-h-screen',
            leaveEnd: 'opacity-0 max-h-0 overflow-hidden'
        },

        collapse: {
            enter: 'transition-all duration-300 ease-out',
            enterStart: 'opacity-0 max-h-0 overflow-hidden',
            enterEnd: 'opacity-100 max-h-96',
            leave: 'transition-all duration-300 ease-in',
            leaveStart: 'opacity-100 max-h-96',
            leaveEnd: 'opacity-0 max-h-0 overflow-hidden'
        },
    };

    const transition = transitions[name] || transitions.fade;
    
    return `{${
        Object.keys(transition)
            .map(prop => {
                const value = transition[prop] || '';
                const escaped = value.replace(/'/g, "\\'");
                return `\n    ${prop}: '${escaped}'`;
            })
            .join(',')
    }\n}`;
}