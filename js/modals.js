class ModalWindow {

	modal = null;
	modalIndex = null;
	commonOverlay = null;
	currentOverlay = null;
	headerTitle = null;

	constructor({ divId = "modalWindow", html = '', title = '' } = {}) {
		this.commonOverlay = document.body.querySelector("#overlay");
		if (this.commonOverlay === null) {
			this.commonOverlay = document.createElement("div");
			this.commonOverlay.id = "overlay";
			document.body.append(this.commonOverlay);
			setTimeout(() => this.commonOverlay.style.opacity = 0.3, 100);
		}
		this.prepeareModalWindow(divId);
		if (html !== '') {
			this.fillModalContent({ html, title });
		}
	};
	fillModalContent({ html = "", title = "" }) {
		if (html !== "")
			this.modal.querySelector('.modal-container').innerHTML = html;
		if (title !== "")
			this.modal.querySelector('.modal-title').innerText = title;
	};
	prepeareModalWindow(divId = "modalWindow") {
		let modalHeader = document.createElement("div");
		modalHeader.className = "modal__header";
		this.headerTitle = document.createElement("h3");
		this.headerTitle.className = 'modal-title';
		let modalClose = document.createElement("i");
		modalClose.className = "fa fa-window-close modal-close";
		modalHeader.append(document.createElement("i"));
		modalHeader.append(this.headerTitle);
		modalHeader.append(modalClose);

		this.modal = document.createElement("div");
		this.modal.className = "modal";
		this.modal.append(modalHeader);
		this.modal.innerHTML += `
			<div class="modal-container">
				<div>
					<i class="fa fa-cog fa-spin fa-3x fa-fw" ></i>
					<span class="sr-only">Загрузка...</span>
				</div>
			</div>`;

		this.currentOverlay = document.createElement("div");
		this.currentOverlay.className = "modal-overlay modal-close";
		this.currentOverlay.id = divId;
		this.currentOverlay.append(this.modal);

		document.body.append(this.currentOverlay);
		const _self = this;
		this.currentOverlay.addEventListener("click",  (event) => _self.closeModalWindow(event));

		this.popUpModal();
	};
	popUpModal() {
		let allModals = document.body.querySelectorAll(".modal");
		this.modalIndex = allModals.length;

		this.currentOverlay.style.zIndex = 4 + this.modalIndex;
		this.modal.style.opacity = 0;
		this.modal.style.display = 'block';
		setTimeout(() => {
			this.modal.style.opacity = 1
			this.modal.style.transform = 'translateY(-2%)';
		}, 100);

	};
	closeModalWindow(event) {
		if (!event.target.classList.contains("modal-close"))
			return;

		if (this.currentOverlay === event.target && !confirm('Ви впевнені, що бажаєте закрити поточне вікно?'))
			return;

		if (this.modalIndex === 1) {
			this.commonOverlay.style.opacity = 0;
			setTimeout(() => this.commonOverlay.remove(), 300);
		}
		const _self = this;
		this.currentOverlay.removeEventListener("click", (event) => _self.closeModalWindow(event));

		this.modal.style.opacity = 0;
		this.modal.style.transform = 'translateY(2%)';
		setTimeout(() => this.currentOverlay.remove(), 300);
	}
}