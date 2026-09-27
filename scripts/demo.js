// For Tutorial videos

export const DemoMode = {
    enabled: false,
  
    enable() {
      this.enabled = true;
      document.body.classList.add("demo-mode");
      console.log("[DemoMode] ENABLED");
    },
  
    disable() {
      this.enabled = false;
      document.body.classList.remove("demo-mode");
      console.log("[DemoMode] DISABLED");
    },
  
    toggle() {
      this.enabled ? this.disable() : this.enable();
    }
  };
  
  // Expose to browser console
  
  
  document.addEventListener("click", (e) => {
    if (!DemoMode.enabled) return;
  
    const button = e.target.closest("button");
    if (!button || button.disabled) return;
  
    button.classList.remove("flash");
    void button.offsetWidth;
    button.classList.add("flash");
  
    setTimeout(() => {
      button.classList.remove("flash");
    }, 600);
  });