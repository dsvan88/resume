async function useFetchApi({ url = '', type = "json", data = ''}) {
    if (!url || !type) return false
    let options = {};
    if (data !== '') {
        options.body = data;
        options.headers = {
            // 'Content-Type': 'multipart/form-data'
            'Content-Type': 'application/json;charset=utf-8',
        };
        options.mode = 'cors';
        options.method = 'POST';
    }
    let response = await fetch(url, options);
    if (response.ok)
        return await response[type]();
    return false;
}

const mainFunc = {
    projectModal: function (event) {
        const modal = new ModalWindow({ html:`<div class="modal-container">${event.target.innerHTML}</div>`, title:`Project #${event.target.dataset.projectId}`});
    },
    updateProjects: async function () {
        projectsSection = document.body.querySelector('section#projects');
        let projectsSectionHtml = '<h3 class="projects__title section__title">My test projects</h3>';
        for (let x = 1; x < 10; x++) {
            let data = await useFetchApi({ url: `/Examples/Example${x}/description.txt` });
            if (!data) break;
            projectsSectionHtml += `
                <div class="projects__item" data-project-id="${x}">
                    <h3 class="projects__item-title">&lt;/ My test Project #${x} &gt;</h3>
                    <iframe class="projects__iframe" src="./Examples/Example${x}/index.html"></iframe>
                    <div class="projects__item-description">
                        <div class="projects__item-technology">Used technologies:<p><span class="span-square-brackets"><span class="text-accent">${data.technologies.join('</span>, <span class="text-accent">')}</span></span></p></div>
                        <p class="projects__item-explain">${data.description}</p>
                        <div class="projects__item-source"><a href="${data.source}" title="${data.source}" target="_blank"><i class="fa fa-copyright" aria-hidden="true"></i>Copyright</a></div>
                    </div>
                    <div class="projects__search-icon">
                        <i class="fa fa-search" aria-hidden="true"></i>
                    </div>
                </div>`;
        }
        projectsSection.innerHTML = projectsSectionHtml;
        projects = document.body.querySelectorAll('.projects__item');
        projects.forEach(project => project.addEventListener('click', this.projectModal));
    },
    showPhotoGallery: async function () {
        const modal = new ModalWindow();
        if (blobArray.length === 0) {
            for (let x = 1; x < 10; x++) {
                let buffer = await useFetchApi({ url: `/gallery/photo/${x}.jpg`, type: 'arrayBuffer'});
                if (!buffer) break;
                blobArray.push(new Blob([buffer], { type: 'image/jpeg' }));
            }
        }
        const galleryWrapper = document.createElement('div');
        blobArray.map(blob => {
            const imageWrapper = document.createElement('div');
            imageWrapper.className = "gallery__slide";
            const image = document.createElement('img');
            image.src = URL.createObjectURL(blob);
            imageWrapper.append(image);
            galleryWrapper.append(imageWrapper);
        });
        modal.fillModalContent({
            html: `
                <div class="gallery">
                    <i class="fa fa-arrow-circle-o-left arrow-left" aria-hidden="true"></i>
                    ${galleryWrapper.innerHTML}
                    <i class="fa fa-arrow-circle-o-right arrow-right" aria-hidden="true"></i>
                </div>`,
            title: `My photo gallery`
        });
        const sliderDiv = document.body.querySelector('.gallery');
        const slider = new simpleSlider([sliderDiv, 'gallery__slide'])
    },
    sendRequest: async function () {
        const modal = new ModalWindow();
        let form = document.body.querySelector("#contact-form__form");
        let data = new FormData(form);
        data = formDataToJson(data);

        data = await useFetchApi({ url: form.action, method: 'POST', data: data});
        if (!data) {
            modal.fillModalContent({ html: 'Connection error! Please, try again later.', title: 'Error!' });
        }
        else {
            modal.fillModalContent({ html: `<h1>${data.text}</h1>`, title: data.title });
        }
    }
};
function formDataToJson(data) {
    const object = {};
    data.forEach((value, key) => object[key] = value );
    return JSON.stringify(object);
}
function camelize(str) {
	return str
		.split("-") // разбивает 'my-long-word' на массив ['my', 'long', 'word']
		.map((word, index) => (index == 0 ? word : word[0].toUpperCase() + word.slice(1)))
		.join(""); // соединяет ['my', 'Long', 'Word'] в 'myLongWord'
}