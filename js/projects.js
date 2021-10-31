
let actionsButtons = document.body.querySelectorAll('*[data-action]');
actionsButtons.forEach(element => element.addEventListener('click', (event) => {
        mainFunc[camelize(element.dataset.action)].call(mainFunc, event);
        if (element.dataset.action === 'update-projects')
            projectsUpdated = true;
    })
);
