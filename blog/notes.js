// Keep optional context beside the essay on wide screens and expandable below
// its passage on smaller screens. Native details still work without JavaScript.
(() => {
  const notes = [...document.querySelectorAll('.sidenote details')];
  const wide = window.matchMedia('(min-width: 1200px)');

  function revealHashNote() {
    const target = document.getElementById(window.location.hash.slice(1));
    if (target && notes.includes(target)) target.open = true;
  }

  function arrangeNotes() {
    notes.forEach(note => { note.open = wide.matches; });
    revealHashNote();
  }

  document.querySelectorAll('.note-ref').forEach(link => {
    link.addEventListener('click', () => {
      const note = document.getElementById(link.hash.slice(1));
      if (note) note.open = true;
    });
  });
  wide.addEventListener('change', arrangeNotes);
  window.addEventListener('hashchange', revealHashNote);
  arrangeNotes();

  let beforePrint;
  window.addEventListener('beforeprint', () => {
    beforePrint = notes.map(note => note.open);
    notes.forEach(note => { note.open = true; });
  });
  window.addEventListener('afterprint', () => {
    if (beforePrint) notes.forEach((note, i) => { note.open = beforePrint[i]; });
  });
})();
