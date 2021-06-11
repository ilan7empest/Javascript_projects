const emailsInput = document.querySelector('#textInput');
const emailsOutput = document.querySelector('#emailsOutput');
const message = document.querySelector('.message');
const btn = document.querySelector('button');

const emailRegex = /([A-Za-z0-9._-]+@[A-Za-z0-9._-]+\.[A-Za-z0-9._-]+)/gi;

btn.addEventListener('click', extarctEmails);

function extarctEmails(e) {
  e.preventDefault();
  //   const rawTextArr = emailsInput.value.split(' ');
  //   let emails = [];
  //   rawTextArr.forEach((email) => {
  //     if (emailRegex.test(email) && emails.indexOf(email) == -1) {
  //       emails.push(email);
  //     }
  //   });
  const rawText = emailsInput.value;
  let uniqueEmails = [...new Set(rawText.match(emailRegex))];
  message.textContent = `${uniqueEmails.length} Emails Found`;
  emailsOutput.value = uniqueEmails.join('\n');
}
