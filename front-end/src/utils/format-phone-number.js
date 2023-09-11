export default function formatPhoneNumber (phoneNumberString) {
  let cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ')' + '-' + match[3];
  }
  return null;
}
