
    // Tab logic
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.tab-panel');
    tabs.forEach((btn) => {
      btn.addEventListener('click', () => {
        tabs.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
      });
    });

    // Role-based optional field toggle
    const roleSelect = document.getElementById('role');
    const agentField = document.querySelector('[data-show-when="role=sales-agent"]');
    const toggleAgentField = () => {
      if (!roleSelect) return;
      const show = roleSelect.value === 'sales-agent';
      agentField.style.display = show ? '' : 'none';
    };
    if (roleSelect && agentField) {
      toggleAgentField();
      roleSelect.addEventListener('change', toggleAgentField);
    }

    // Password confirmation check
    const userForm = document.querySelector('form[action="/register-user"]');
    userForm?.addEventListener('submit', (e) => {
      const pass = document.getElementById('password');
      const confirm = document.getElementById('confirmPassword');
      if (pass.value !== confirm.value) {
        e.preventDefault();
        alert('Passwords do not match.');
        confirm.focus();
      }
    });

    // Furniture dropdown toggle
    const productTypeSelect = document.getElementById('productType');
    const furnitureOptions = document.getElementById('furnitureOptions');
    productTypeSelect.addEventListener('change', () => {
      if (productTypeSelect.value === 'furniture-home' || productTypeSelect.value === 'furniture-office') {
        furnitureOptions.style.display = '';
      } else {
        furnitureOptions.style.display = 'none';
      }
    });

    // Footer year
    document.getElementById('year').textContent = new Date().getFullYear();