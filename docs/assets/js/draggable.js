/*=============== DRAGGABLE FLOATING PILLS ===============*/
const pills = document.querySelectorAll('.floating-pill');

pills.forEach(pill => {
  let isDragging = false;
  let startX, startY;

  // Set initial cursor style
  pill.style.cursor = 'grab';

  const startDrag = (e) => {
    isDragging = true;
    pill.style.animation = 'none'; // Stop floating animation
    pill.style.transition = 'none'; // Disable transition for instant movement
    pill.style.cursor = 'grabbing';
    pill.style.zIndex = '1000'; // Bring to front

    // Get initial mouse/touch position
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

    startX = clientX;
    startY = clientY;

    // Prevent default behavior to avoid text selection or scrolling (on touch)
    if (e.type !== 'touchstart') {
      e.preventDefault();
    }

    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
  };

  const drag = (e) => {
    if (!isDragging) return;
    if (e.type === 'touchmove') e.preventDefault(); // Prevent scrolling

    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

    const dx = clientX - startX;
    const dy = clientY - startY;

    // Move the element
    pill.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const endDrag = () => {
    if (!isDragging) return;
    isDragging = false;
    pill.style.cursor = 'grab';
    pill.style.zIndex = '';

    // Animate back to original position
    pill.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    pill.style.transform = 'translate(0, 0)';

    // Remove listeners
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('touchmove', drag);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchend', endDrag);

    // Restart floating animation after the return transition
    setTimeout(() => {
      pill.style.transition = '';
      pill.style.animation = ''; // Reverts to CSS defined animation
    }, 500);
  };

  pill.addEventListener('mousedown', startDrag);
  pill.addEventListener('touchstart', startDrag, { passive: false });
});
