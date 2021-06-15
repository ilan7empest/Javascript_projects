(function () {
  const form = document.querySelector('form[name=myForm]');
  const inputs = Array.from(document.querySelectorAll('.field input'));

  const required = ['email', 'password'];

  form.addEventListener('submit', handleSubmit);

  function handleSubmit(e) {
    e.preventDefault();
    const [data, isValid] = validation();
    if (isValid) {
      const user = { ...data };
      console.log(user);
    }
  }
  function validation() {
    let data = {};
    let isValid = true;
    inputs.forEach((input) => {
      let inputName = input.getAttribute('name');
      const errorEl = input.nextElementSibling;

      input.closest('.field').classList.remove('error');
      errorEl.style.display = 'none';
      errorEl.textContent = '';

      if (inputName !== null) {
        data[inputName] = input.value;
        if (input.value.trim() === '' && required.includes(inputName)) {
          input.closest('.field').classList.add('error');
          errorEl.style.display = 'block';
          errorEl.textContent = `${inputName.toUpperCase()} Field is Required`;
          isValid = false;
          return;
        }
        if (inputName === 'email') {
          const emailRegex = /([A-Za-z0-9._-]+@[A-Za-z0-9._-]+\.[A-Za-z]+)\w+/;
          if (!emailRegex.test(input.value)) {
            input.closest('.field').classList.add('error');
            errorEl.style.display = 'block';
            errorEl.textContent = `${inputName.toUpperCase()} not valid`;
            isValid = false;
            return;
          }
        }
        if (inputName === 'password') {
          const passwordRegex = /[A-Za-z\d]+$/;
          if (!passwordRegex.test(input.value)) {
            input.closest('.field').classList.add('error');
            errorEl.style.display = 'block';
            errorEl.textContent = `${inputName.toUpperCase()} Field must contain numbers and letters Only`;
            isValid = false;
            return;
          }
          if (!(input.value.length > 3 && input.value.length < 7)) {
            input.closest('.field').classList.add('error');
            errorEl.style.display = 'block';
            errorEl.textContent = `${inputName.toUpperCase()} Field must contain between 4-6 characters`;
            isValid = false;
            return;
          }
        }
      }
    });
    return [data, isValid];
  }
})();
