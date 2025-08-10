        const modal = document.getElementById('myModal');
        const modalHeader = document.getElementById('modalHeader');
        const modalOverlay = document.getElementById('modalOverlay');
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;

        // Open modal
         function openModal() {
            modal.style.display = 'block';
            modalOverlay.style.display = 'block';
        }

        // Close modal
        function closeModal() {
            modal.style.display = 'none';
            modalOverlay.style.display = 'none';
        }

        // Drag start
        modalHeader.addEventListener('mousedown', (e) => {
            initialX = e.clientX - currentX;
            initialY = e.clientY - currentY;
            isDragging = true;
        });

        // Drag end
        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Drag move
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                modal.style.left = currentX + 'px';
                modal.style.top = currentY + 'px';
                modal.style.transform = 'none'; // Override initial centering
            }
        });

        // Initialize position
        currentX = window.innerWidth / 2 - modal.offsetWidth / 2;
        currentY = window.innerHeight / 2 - modal.offsetHeight / 2;
        modal.style.left = currentX + 'px';
        modal.style.top = currentY + 'px';