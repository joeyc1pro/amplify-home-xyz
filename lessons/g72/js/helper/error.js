let errorLog = "";

window.addEventListener("error", e => {
  errorLog += e.error.stack + "\n";
});

export function showErrorLog() {
  const promptDom = q('.dialog-overlay');

  const promptContent = promptDom.q('.full-dialog').q('.dialog-body');

  promptContent.q('button.popup-exit-button.right', {
    onclick() {
      document.body.removeChild(promptDom);
    }
  });

  promptContent.q('.dialog-header', { text: "Error Log" });
  promptContent.q('textarea.dialog-textarea', { text: errorLog, cols: 60, rows: 10 });

  document.body.appendChild(promptDom);
};