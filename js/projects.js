
let actionsButtons = document.body.querySelectorAll('*[data-action]');
actionsButtons.forEach(element => element.addEventListener('click', () => {
        mainFunc[camelize(element.dataset.action)].call(mainFunc);
        if (element.dataset.action === 'update-projects')
            projectsUpdated = true;
    })
);
