import { badWordsCatalog, removeCommonRx, removeMexicanCommonNameRx } from "@/constants/curp";


export const censorBadWords = (firstFourCharCurp: string): string => {
  if (badWordsCatalog.includes(firstFourCharCurp)) {
    return firstFourCharCurp.replace(/(?<=.{1})[AEIOU]/i, 'X');
  }

  return firstFourCharCurp;
};

const getEvaluateFullName = (fullName: string): string => {
  //const nameWithoutSpaces = fullName.replace(/\s/g, "");
  const upperCaseFullName = fullName
    .toUpperCase()
    .replace(/Ñ/g, '_ENIE_')
    .trim();
  const nameWithoutSpacesAndAccents = upperCaseFullName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/_ENIE_/g, 'Ñ');
  const nameWithoutCommon = nameWithoutSpacesAndAccents.replace(
    removeCommonRx,
    ''
  );
  const nameWithoutMexicanCommonName = nameWithoutCommon.replace(
    removeMexicanCommonNameRx,
    ''
  );
  const firstName = nameWithoutMexicanCommonName.split(' ')[0];

  return firstName;
};

export const getFirstLetter = (firstName: string): string => {
  if (firstName === '') return 'X';
  return getEvaluateFullName(firstName)[0] === 'Ñ'
    ? 'X'
    : getEvaluateFullName(firstName)[0];
};

export const getFirstVowel = (firstName: string): string => {
  const vowels = ['A', 'E', 'I', 'O', 'U'];

  const name = getEvaluateFullName(firstName);
  for (const letter of name.slice(1).split('')) {
    if (vowels.includes(letter)) {
      return letter;
    }
  }

  return 'X';
};

const replaceSpecialCharacters = (text: string): string => {
  if (!text) return '';
  return text.replace(/[\-\/\.\,]/, 'X');
};

export const getFirstConsonant = (firstName: string): string => {
  const name = getEvaluateFullName(firstName);
  const nameWithoutVowels = name.slice(1).replace(/[AEIOU]/g, '');
  const firstConsonant = nameWithoutVowels[0];
  if (firstConsonant === 'Ñ') return 'X';
  return firstConsonant ? firstConsonant : 'X';
};

export const getBirthDate = (birthDate: Date = new Date()): string => {
  if (!birthDate) return '999999';
  const year = birthDate.getFullYear().toString().slice(-2); // Tomamos los últimos dos dígitos del año
  const month = (birthDate.getMonth() + 1).toString().padStart(2, '0'); // Los meses son 0-indexed, así que sumamos 1
  const day = birthDate.getDate().toString().padStart(2, '0');

  return year + month + day;
};

export const getSex = (sex: string): string => {
  if (!sex) return 'X';
  if (sex !== 'HOMBRE' && sex !== 'MUJER') return 'X';
  return sex[0];
};

export const getState = (state: string): string => {
  if (state === '') return 'XX';
  if (state === 'SI' || state === 'NA') return 'NE';
  return state;
};

export const evaluateChar4Curp = (
  letter4Curp: string,
  firstName: string
): boolean => {
  return getFirstLetter(firstName) === letter4Curp;
};

export const evaluateChar1and2Curp = (
  firstLastName: string,
  firstTwoChars: string
): boolean => {
  const firstLetter = firstTwoChars[0];
  const secondLetter = firstTwoChars[1];
  return (
    firstLetter === getFirstLetter(firstLastName) &&
    secondLetter === getFirstVowel(firstLastName)
  );
};

export const evaluateBadWords = (firstFourCharCurp: string): boolean => {
  return badWordsCatalog.includes(firstFourCharCurp);
};

export const construcCurp = ({
  name = '',
  firstLastName = '',
  secondLastName = '',
  sex = '',
  birthDate = new Date(),
  state = '',
}: {
  name?: string;
  firstLastName?: string;
  secondLastName?: string;
  sex?: string;
  birthDate?: Date;
  state?: string;
}): string => {
  const birthDateYear = birthDate?.getFullYear() || 1999;
  const char1and2 = replaceSpecialCharacters(
    getFirstLetter(firstLastName) + getFirstVowel(firstLastName)
  );
  const char3 = replaceSpecialCharacters(getFirstLetter(secondLastName));
  const char4 = replaceSpecialCharacters(getFirstLetter(name));
  const birth = getBirthDate(birthDate);
  const gender = getSex(sex);
  const birthState = getState(state);
  const consonant1 = replaceSpecialCharacters(getFirstConsonant(firstLastName));
  const consonant2 = replaceSpecialCharacters(
    getFirstConsonant(secondLastName)
  );
  const consonant3 = replaceSpecialCharacters(getFirstConsonant(name));
  let curp =
    char1and2 +
    char3 +
    char4 +
    birth +
    gender +
    birthState +
    consonant1 +
    consonant2 +
    consonant3;

  curp = censorBadWords(curp.slice(0, 4)) + curp.slice(4);

  curp += birthDateYear > 1999 ? 'X9' : '99';

  return curp;
};
