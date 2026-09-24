// Keep optional context beside the essay on wide screens and expandable below
// its passage on smaller screens. Native details still work without JavaScript.
(() => {
  const notes = [...document.querySelectorAll('.sidenote details')];
  const wide = window.matchMedia('(min-width: 1200px)');

  function revealHashContent() {
    const target = document.getElementById(window.location.hash.slice(1));
    let disclosure = target?.closest('details');
    while (disclosure) {
      disclosure.open = true;
      disclosure = disclosure.parentElement?.closest('details');
    }
  }

  function arrangeNotes() {
    notes.forEach(note => { note.open = wide.matches; });
    revealHashContent();
  }

  document.querySelectorAll('.note-ref').forEach(link => {
    link.addEventListener('click', () => {
      const note = document.getElementById(link.hash.slice(1));
      if (note) note.open = true;
    });
  });
  wide.addEventListener('change', arrangeNotes);
  window.addEventListener('hashchange', revealHashContent);
  arrangeNotes();

  const printableDetails = [...document.querySelectorAll('.sidenote details, .optional-example')];
  let beforePrint;
  window.addEventListener('beforeprint', () => {
    beforePrint = printableDetails.map(detail => detail.open);
    printableDetails.forEach(detail => { detail.open = true; });
  });
  window.addEventListener('afterprint', () => {
    if (beforePrint) printableDetails.forEach((detail, i) => { detail.open = beforePrint[i]; });
  });
})();
