import { HtmlFile } from '../db.config';

 export function setFileLocalStorage(file: HtmlFile) {
  localStorage.setItem('lastFileEdited', JSON.stringify(file));
}

export function getFileLocalStorage() {
  const lastFileEditedJSON = localStorage.getItem('lastFileEdited')

  if (lastFileEditedJSON) {
      return JSON.parse(lastFileEditedJSON) as HtmlFile;
  }
  return;
}
